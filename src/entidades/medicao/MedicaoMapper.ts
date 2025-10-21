// src/mappers/MedicaoMapper.ts
import { Medicao } from "../../dominio/Medicao";
import { MedicaoEntity } from "./MedicaoEntity";

// Entidade → Domínio
export function toDomain(entity: MedicaoEntity): Medicao {
  return {
    id: entity.id,
    idconsumidor: entity.idconsumidor,
    tipo: entity.tipo,
    leitura: Number(entity.leitura),
    timestamp: entity.timestamp,
  };
}

// Domínio → Entidade (para salvar no banco)
export function toEntity(domain: Omit<Medicao, "id">): MedicaoEntity {
  const entity = new MedicaoEntity();
  entity.idconsumidor = domain.idconsumidor;
  entity.tipo = domain.tipo;
  entity.leitura = domain.leitura;
  entity.timestamp = domain.timestamp;
  return entity;
}
