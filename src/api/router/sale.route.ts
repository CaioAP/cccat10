import express from 'express';
import SaleController from '../controllers/sale.controller';

const router = express.Router();
router.post('/', SaleController.create);

export default router;
