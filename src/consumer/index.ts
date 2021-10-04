import { Kafka, logLevel } from "kafkajs";
import { transport } from "./config/mail";

const kafka = new Kafka({
  clientId: "my-consumer",
  brokers: ["localhost:9092"],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 100,
    retries: 10,
  },
});

async function main() {
  const consumer = kafka.consumer({ groupId: "test-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "topic-test", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { to, from, subject, text } = JSON.parse(message.value.toString());

      await transport.sendMail({
        from,
        to,
        subject,
        text,
      });
    },
  });
}
main();
