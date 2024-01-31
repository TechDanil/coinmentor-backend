import express from 'express'
import { body } from 'express-validator'
import AuthController from '../controllers/auth.controller'

const authRouter = express.Router()

authRouter.get('/auth/refresh', AuthController.refresh)
authRouter.post(
	'/auth/register',
	body('username').isLength({ min: 5 }),
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	AuthController.signup
)

authRouter.post('/auth/login', AuthController.login)
authRouter.post('/auth/logout', AuthController.logout)
authRouter.post('/auth/forgot-password', AuthController.recover)

export default authRouter
