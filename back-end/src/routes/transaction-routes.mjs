import { Router } from 'express';
import { protect, authorize } from '../controllers/auth-controller.mjs';
import { addTransaction, getWalletInfo, listAllTransactions, mineTransactions  } from '../controllers/transaction-controller.mjs';

const routes = Router();

routes.route('/transactions').post(protect, authorize('admin','user'), addTransaction).get(protect, authorize('admin','user'), listAllTransactions);

routes.route('/transactions/mine').get(protect, mineTransactions);

routes.route('/info').get(protect, getWalletInfo);

export default routes;