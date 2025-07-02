import { Router } from 'express';
import { addTransaction, listAllTransactions } from '../controllers/transaction-controller.mjs';

const routes = Router();

routes.route('/transactions').post(addTransaction).get(listAllTransactions);

export default routes;