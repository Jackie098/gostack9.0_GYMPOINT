import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import SessionsController from './app/controllers/SessionController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ welcome: 'Hello motherfucks' }));

/**
 * Create new adm and session and it don't need auth
 */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

/**
 * Routes that need autentication
 */
routes.use(authMiddleware);

/**
 * About Adm's
 */
routes.put('/users', UserController.update);

/**
 * About Students
 */
routes.post('/students', StudentController.store);

/**
 * About Plans
 */
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

/**
 * About Enrollment
 */
routes.post('/enrollment/:studentId/:planId', EnrollmentController.store);

export default routes;
