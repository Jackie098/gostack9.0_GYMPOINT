import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import SessionsController from './app/controllers/SessionController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ welcome: 'Redirecting you to home' }));

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
routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments/:studentId/:planId', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

export default routes;
