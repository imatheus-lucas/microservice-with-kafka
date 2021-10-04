import express from "express";
import { Kafka, CompressionTypes, logLevel } from "kafkajs";

const app = express();

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 100,
    retries: 10,
  },
});

const producer = kafka.producer();

app.use((req, res, next) => {
  req.producer = producer;
  return next();
});
app.use(express.json());
app.post("/sendMail", async (req, res) => {
  const { to, from, subject, text } = req.body;
  try {
    await req.producer.send({
      topic: "topic-test",
      compression: CompressionTypes.GZIP,
      messages: [
        {
          value: JSON.stringify({
            to,
            from,
            subject,
            text,
          }),
        },
      ],
    });
    res.json({ ok: true });
  } catch (err) {
    res.json({ ok: false });
  }
});

async function run() {
  await producer.connect();

  app.listen(3333, () => {
    console.log("Express server running on port 3333");
  });
}

run().catch(console.error);
