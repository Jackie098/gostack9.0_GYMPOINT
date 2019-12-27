import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ welcome: 'Hello motherfucks' }));

// CRIAR NOVO ADM E SESSÃO
routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

export default routes;
