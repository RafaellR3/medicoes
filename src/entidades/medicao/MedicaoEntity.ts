import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TipoLeitura } from "../../dominio/Medicao";

@Entity({ name: "medicao" })
export class MedicaoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  idconsumidor!: number;

  @Column({ type: "enum", enum: ['ENERGIA_ATIVA', 'TENSAO_A', 'CORRENTE_A'] })
  tipo!: TipoLeitura;

  @Column("decimal", { precision: 10, scale: 2 })
  leitura!: number;

  @Column({ type: "datetime" })
  timestamp!: Date;
}
