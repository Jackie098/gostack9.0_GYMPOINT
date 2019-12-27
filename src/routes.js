import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionsController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ welcome: 'Hello motherfucks' }));

// CRIAR NOVO ADM E SESSÃO
routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

// ROTAS QUE PRECISAM DE AUTENTICAÇÃO
routes.use(authMiddleware);

// SOBRE ADM's
routes.put('/users', UserController.update);

// SOBRE STUDENTS
routes.post('/students', StudentController.store);

export default routes;
