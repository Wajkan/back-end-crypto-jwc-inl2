import express from 'express';
import { loginUser } from '../controllers/auth-controller.mjs';

const routes = express.Router();

routes.route('/').post(loginUser);

export default routes