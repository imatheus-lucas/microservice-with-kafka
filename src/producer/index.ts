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
app.get("/", async (req, res) => {
  await req.producer.send({
    topic: "topic-test",
    messages: [{ value: "Hello Kafka!" }],
  });
  res.json("Hello World!");
});

async function run() {
  await producer.connect();

  app.listen(3333, () => {
    console.log("Express server running on port 3333");
  });
}

run().catch(console.error);
