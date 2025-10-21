import "reflect-metadata";
import { DataSource } from "typeorm";
import { ConsumidorEntity } from "../entidades/consumidor/ConsumidorEntity";
import { MedicaoEntity } from "../entidades/medicao/MedicaoEntity";
import dotenv from 'dotenv';
dotenv.config();

export const Connection = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ConsumidorEntity, MedicaoEntity],
  synchronize: true, 
  logging: false
});
