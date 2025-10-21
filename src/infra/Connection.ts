import "reflect-metadata";
import { DataSource } from "typeorm";
import { ConsumidorEntity } from "../entidades/consumidor/ConsumidorEntity";
import { MedicaoEntity } from "../entidades/medicao/MedicaoEntity";

export const Connection = new DataSource({
  type: "mysql",
  host: "medicoes-db-medicoes.g.aivencloud.com",
  port: 28790,
  username: "avnadmin",
  password: "AVNS_7I4eKtKdf8-iQev1Dt9",
  database: "defaultdb",
  entities: [ConsumidorEntity, MedicaoEntity],
  synchronize: true, // só para desenvolvimento
  logging: false
});
