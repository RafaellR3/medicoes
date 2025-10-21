import { Repository,Between  } from "typeorm";
import { Connection } from "../infra/Connection";
import { MedicaoEntity } from "../entidades/medicao/MedicaoEntity";
import { Medicao,TipoLeitura } from "../dominio/Medicao";
import { toDomain, toEntity } from "../entidades/medicao/MedicaoMapper";
import { ConsumidorRepositorio } from "./ConsumidorRepositorio";

export class MedicaoRepositorio {
  private repo: Repository<MedicaoEntity>;

  constructor() {
    this.repo = Connection.getRepository(MedicaoEntity);
  }

  async save(medicao: Omit<Medicao, "id">): Promise<Medicao> {
    const entity = toEntity(medicao);
    const saved = await this.repo.save(entity);
    return toDomain(saved);
  }

  async findAll(): Promise<Medicao[]> {
    const entities = await this.repo.find();
    return entities.map(toDomain);
  }

  async findById(id: number): Promise<Medicao | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? toDomain(entity) : null;
  }

  async findJaExiste(idconsumidor: number, timestamp: Date, tipo: TipoLeitura): Promise<boolean> {
    return await this.repo.exists({
      where: {
        idconsumidor: idconsumidor,
        timestamp: timestamp,
        tipo: tipo
      },
    });
  } 
  
  async findByUc(uC: string, inicio: Date, fim: Date): Promise<Medicao[]> {
    const consumidorRepo = new ConsumidorRepositorio();
    const consumidor = await consumidorRepo.findByUC(uC); 
    if(!consumidor){
      return [];
    }
    const idconsumidor = consumidor.id;
    
    return await this.repo.find({
      where: {
        idconsumidor: idconsumidor,
        timestamp: Between(inicio, fim)
      }
    });
  }

  async findDelta(uC: string, inicio: Date, fim: Date): Promise<number> {    
    const consumidorRepo = new ConsumidorRepositorio();
    const consumidor = await consumidorRepo.findByUC(uC);
    if (!consumidor) {
      return 0;
    }

    const idconsumidor = consumidor.id;

    const primeira = await this.repo.findOne({
      where: {
        idconsumidor,
        timestamp: Between(inicio, fim),
      },
      order: { timestamp: 'ASC' },
    });

    const ultima = await this.repo.findOne({
      where: {
        idconsumidor,
        timestamp: Between(inicio, fim),
      },
      order: { timestamp: 'DESC' },
    });
    if (!primeira || !ultima) {
      return 0; // Sem medições no período
    }

    const delta = ultima.leitura - primeira.leitura;
    return delta;
  }
}
