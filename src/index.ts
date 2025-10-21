import dotenv from "dotenv";
import { startConsumer } from "./infra/queue/ConsumerLeitura";
import { Connection } from "./infra/Connection";
import app from "./app/server";

dotenv.config();

const port = process.env.PORT || 4000;

const conectar = async () => {
  await Connection.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');        
    startConsumer();  
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });
};

const startApp = async () => {  
  await conectar(); 
  app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
  });
};
startApp();