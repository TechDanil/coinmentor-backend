import express from 'express';
import AuthController from '../controllers/AuthController';
import { authenticateToken } from '../middleware/authenticateToken';

const authRouter = express.Router();

authRouter.get('/auth/verify', authenticateToken, AuthController.verify);
authRouter.post('/auth/register', AuthController.register);
authRouter.post('/auth/login', authenticateToken, AuthController.login);
authRouter.post('/auth/refresh', AuthController.refresh);

export default authRouter;