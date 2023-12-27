import { NextFunction, Request, Response } from 'express'
import { User } from 'models/User'
import ApiException from '../exceptions/api.exceptions'
import tokenService from '../services/token.service'

declare module 'express' {
	interface Request {
		user?: any
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorizationHeader = req.headers.authorization

		console.log(authorizationHeader)

		if (!authorizationHeader) {
			return next(ApiException.UnauthorizedError())
		}

		const accessToken = authorizationHeader.split(' ')[1]

		console.log(accessToken)

		if (!accessToken) {
			return next(ApiException.UnauthorizedError())
		}

		const userData = tokenService.validateAccessToken(accessToken)

		if (!userData) {
			return next(ApiException.UnauthorizedError())
		}

		req.user = userData as User

		next()
	} catch (e) {
		return next(ApiException.UnauthorizedError())
	}
}
