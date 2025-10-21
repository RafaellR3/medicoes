import { ConsumidorRepositorio } from "../repositorio/ConsumidorRepositorio";
import { MedicaoRepositorio } from "../repositorio/MedicaoRepositorio";
import { Leitura } from "../infra/queue/Leitura";
import { Consumidor } from "./Consumidor";

export class MedicaoLeitura {
  constructor(
    private consumidorRepo: ConsumidorRepositorio,
    private medicaoRepo: MedicaoRepositorio
  ) {}

  async processarLeitura(leitura: Leitura) {    
    const consumidor = await this.buscaConsumidor(leitura);

    var validacao = await this.validacaoMedicao(leitura, consumidor);

    if (validacao !== null) {
      console.log("Erro:", validacao);
      return;
    }   
    await this.salvaMedicaoEAtualizaConsumidor(leitura, consumidor);
    
    console.log(`Leitura processada: UC=${leitura.unidadeConsumidora}, valor=${leitura.leitura}`);
  }

  async buscaConsumidor(leitura: Leitura) {
    
    var consumidor = await this.consumidorRepo.findByUC(leitura.unidadeConsumidora);
    if (!consumidor) {
      consumidor = await this.consumidorRepo.save({
        uC: leitura.unidadeConsumidora,
        ultimaLeitura: null
      });
    };
    return consumidor;
  }

  async validacaoMedicao(leitura: Leitura, consumidor: Consumidor): Promise<string|null> {
    var leituraJaExiste = this.medicaoRepo.findJaExiste(consumidor.id, leitura.timestamp, leitura.tipo);
    if (await leituraJaExiste){
      return`Leitura já existe para UC=${leitura.unidadeConsumidora}, timestamp=${leitura.timestamp}, tipo=${leitura.tipo}.`;
    }

    const ultimaLeitura = consumidor.ultimaLeitura ? await this.medicaoRepo.findById(consumidor.ultimaLeitura) : null;
    if (ultimaLeitura && leitura.leitura - ultimaLeitura.leitura> 10000) {

      return'A diferença de valor entre duas leituras consecutivas não pode exceder 10.000 kWh';
    }

    const leituraTimestamp = new Date(leitura.timestamp);
    const ultimaLeituraTimestamp = ultimaLeitura ? new Date(ultimaLeitura.timestamp) : null;

    if (ultimaLeituraTimestamp && leituraTimestamp <= ultimaLeituraTimestamp) {
      return'Erro: A nova leitura não pode ter uma data inferior à última leitura registrada para o consumidor.';
    }
    return null;
  } 

  async salvaMedicaoEAtualizaConsumidor(leitura: Leitura, consumidor: Consumidor) {
    var medicao = await this.medicaoRepo.save({ 
          idconsumidor: consumidor.id, 
          timestamp: leitura.timestamp, 
          leitura: leitura.leitura, 
          tipo: leitura.tipo 
        });

    if (consumidor) {
      consumidor.ultimaLeitura = medicao.id;
      await this.consumidorRepo.update({
        id: consumidor.id,
        uC: consumidor.uC,
        ultimaLeitura: consumidor.ultimaLeitura
      });
    };
  }
}  
