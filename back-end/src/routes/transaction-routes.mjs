import { Router } from 'express';
import { addTransaction, getWalletInfo, listAllTransactions, mineTransactions  } from '../controllers/transaction-controller.mjs';

const routes = Router();

routes.route('/transactions').post(addTransaction).get(listAllTransactions);

routes.route('/transactions/mine').get(mineTransactions);

routes.route('/info').get(getWalletInfo);

export default routes;