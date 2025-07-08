import express from 'express';
import { listUsers, addUser } from '../controllers/users-controller.mjs';


const routes = express.Router();

routes.route('/').get(listUsers).post(addUser);

export default routes;