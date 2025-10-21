import { Router } from 'express';
import { MedicaoController } from '../controllers/MedicaoController';

const router = Router();
const controller = new MedicaoController();

router.get('/uc', (req, res) => controller.getAll(req, res));
router.get('/uc/:uc', (req, res) => controller.getByUC(req, res));
router.get('/uc/total/:uc', (req, res) => controller.getTotal(req, res));

export default router;
