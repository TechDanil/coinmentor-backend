import express from 'express'
import { body } from 'express-validator'
import AuthController from '../controllers/auth.controller'

const authRouter = express.Router()

authRouter.post(
	'/auth/register',
	body('username').isLength({ min: 5 }),
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	AuthController.signup
)

authRouter.post('/auth/login', AuthController.login)
authRouter.post('/auth/logout', AuthController.logout)
authRouter.get('/auth/refresh', AuthController.refresh)

export default authRouter
