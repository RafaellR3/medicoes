import { Request, Response } from 'express';
import { MedicaoRepositorio } from '../repositorio/MedicaoRepositorio';
import { ConsumidorRepositorio } from '../repositorio/ConsumidorRepositorio';

export class MedicaoController {
  private repoMedicao = new MedicaoRepositorio();
  private repoConsumidor = new ConsumidorRepositorio();

  async getAll(req: Request, res: Response) {
    try {
      const dados = await this.repoMedicao.findAll();
      res.json(dados);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar medições', error });
    }
  }

  async getByUC(req: Request, res: Response) {
   
    const uc = req.params.uc;
    const dataini = new Date(req.query.dataini as string);
    const datafim = new Date(req.query.datafim as string);

 console.log(uc, dataini, datafim);
    try {
      const dados = await this.repoMedicao.findByUc(uc, dataini, datafim);
      res.json(dados);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar por UC', error });
    }
  }

  async getTotal(req: Request, res: Response) {
    const uc = req.params.uc;
    const dataini = new Date(req.query.dataini as string);
    const datafim = new Date(req.query.datafim as string);

    try {
      const dados = await this.repoMedicao.findDelta(uc, dataini, datafim);
      res.json(dados);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar por UC', error });
    }
  }
}
