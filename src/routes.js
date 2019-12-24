import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ welcome: 'Hello motherfucks' }));

Router.post('/users', UserController.store);

export default routes;
