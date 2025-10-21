import { TipoLeitura } from "../../dominio/Medicao";

export interface Leitura {
  unidadeConsumidora: string,
  timestamp: Date,
  leitura: number,
  tipo: TipoLeitura
}