import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import SessionsController from './app/controllers/SessionController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import AnswerController from './app/controllers/AnswerController';
import HelpOrdersController from './app/controllers/HelpOrdersController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ welcome: 'Redirecting you to home' }));

/**
 * Create new adm and session and it don't need auth
 */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

/**
 * For students to check-in
 */
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/allcheckins/', CheckinController.index);

/**
 * FOr students to ask for help
 */
routes.get('/students/:id/help-orders', HelpOrdersController.index);
routes.post('/students/:id/help-orders', HelpOrdersController.store);

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
routes.put('/enrollments/:enrollId', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

/**
 * About Answers
 */
routes.get('/answers', AnswerController.index);

export default routes;
