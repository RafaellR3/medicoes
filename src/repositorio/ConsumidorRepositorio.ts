import { Connection } from "../infra/Connection";
import { ConsumidorEntity } from "../entidades/consumidor/ConsumidorEntity";
import { Consumidor } from "../dominio/Consumidor";
import { toDomain, toEntity } from "../entidades/consumidor/ConsumidorMapper";
import { Repository } from "typeorm";

export class ConsumidorRepositorio {
  private repo: Repository<ConsumidorEntity>;

  constructor() {
    this.repo = Connection.getRepository(ConsumidorEntity);
  }

  async save(consumidor: Omit<Consumidor, "id">): Promise<Consumidor> {
    const entity = toEntity(consumidor);
    const saved = await this.repo.save(entity);
    return toDomain(saved);
  }  
  
  async update(consumidor: Consumidor): Promise<Consumidor> {
    const entity = toEntity(consumidor);
    const saved = await this.repo.update(consumidor.id, entity).then(() => this.repo.findOneBy({ id: consumidor.id })) as ConsumidorEntity;
    return toDomain(saved);
  }

  async findById(id: number): Promise<Consumidor | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? toDomain(entity) : null;
  }

  async findAll(): Promise<Consumidor[]> {
    const entities = await this.repo.find();
    return entities.map(toDomain);
  }
  
  async findByUC(uC: string): Promise<Consumidor | null> {
    const entity = await this.repo.findOne({ where: { uC } });
    if (!entity) {
      return console.log(`Consumidor com UC=${uC} não encontrado.`), null;
    }
    return entity ? toDomain(entity) : null;
  }
}
