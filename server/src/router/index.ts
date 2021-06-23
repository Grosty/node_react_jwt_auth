import { Router } from 'express';
import UserController from '@src/controllers/user-controller';

const router = new (Router as any)();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers);

export default router;
