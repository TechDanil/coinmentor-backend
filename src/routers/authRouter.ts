import express from 'express';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.post('/auth/register', AuthController.register);

export default authRouter;