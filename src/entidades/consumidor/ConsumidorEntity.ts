
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "consumidor" })
export class ConsumidorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uC!: string;

  @Column({
    type: "int",
    nullable: true})  
  ultimaLeitura!: number|null;
};