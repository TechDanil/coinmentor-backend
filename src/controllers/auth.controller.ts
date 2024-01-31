import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { REFRESH_TOKEN_MAX_AGE } from '../constants/index.constants'
import ApiException from '../exceptions/api.exceptions'
import authService from '../services/auth.service'

class AuthController {
	signup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return next(ApiException.BadRequest('validation error', errors.array()))
			}

			const { username, email, password } = req.body

			const userData = await authService.register({ username, email, password })
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body

			const userData = await authService.login({ email, password })
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies
			const token = await authService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (error) {
			next(error)
		}
	}

	refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies
			const userData = await authService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	recover = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email } = req.body

			await authService.recoverPassword(email)

			console.log('recover in controller has worked!')

			return res.json({
				message: 'Password reset instructions sent to your email.',
			})
		} catch (error) {
			next(error)
		}
	}
}

export default new AuthController()
