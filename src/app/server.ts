import express from "express";
import dotenv from "dotenv";
import medicoesRoutes from '../routes/Medicoes';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Node + TypeScript + Docker ativo!");
});

app.use('/medicoes', medicoesRoutes);

export default app;
