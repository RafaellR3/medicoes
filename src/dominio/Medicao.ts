export type TipoLeitura = 'ENERGIA_ATIVA'| 'TENSAO_A'| 'CORRENTE_A';

  export interface Medicao {
  id: number,  
  idconsumidor: number,
  timestamp: Date,
  leitura: number,
  tipo: TipoLeitura
}
