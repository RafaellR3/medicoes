import client from "amqplib";
import dotenv from "dotenv";
import { Connection } from "../Connection";
import { MedicaoLeitura } from "../../dominio/MedicaoLeitura";
import { ConsumidorRepositorio } from "../../repositorio/ConsumidorRepositorio";
import { MedicaoRepositorio } from "../../repositorio/MedicaoRepositorio";

dotenv.config();

const consumidorRepo = new ConsumidorRepositorio();
const medicaoRepo = new MedicaoRepositorio();
const medicaoLeitura = new MedicaoLeitura(consumidorRepo, medicaoRepo);

export async function startConsumer() {
    if (!Connection.isInitialized) {
    await Connection.initialize();
  }
  const connection = await client.connect(process.env.RABBITMQ_URL || "amqp://localhost");  
  const channel = await connection.createChannel();

  const queueName = process.env.QUEUE_NAME || "leituras";

  await channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, async (message) => {
    if (!message) return;
    try {
      const leitura = JSON.parse(message.content.toString());
      await medicaoLeitura.processarLeitura(leitura);
      channel.ack(message); 
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
    }
  });

  console.log("Consumidor rodando...");
}
