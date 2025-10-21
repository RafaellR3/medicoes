import { Consumidor } from "../../dominio/Consumidor";
import { ConsumidorEntity } from "./ConsumidorEntity";

export function toDomain(entity: ConsumidorEntity): Consumidor {
  return {
    id: entity.id,
    uC: entity.uC,
    ultimaLeitura: entity.ultimaLeitura,
  };
}

export function toEntity(domain: Omit<Consumidor, "id">): ConsumidorEntity {
  const entity = new ConsumidorEntity();
  entity.uC = domain.uC;
  entity.ultimaLeitura = domain.ultimaLeitura;
  return entity;
}
