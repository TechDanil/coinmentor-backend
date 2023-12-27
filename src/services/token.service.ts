import jwt, { JwtPayload } from 'jsonwebtoken'
import {
	ACCESS_TOKEN_LIFE,
	REFRESH_TOKEN_LIFE,
} from '../constants/index.constants'
import { Token } from '../models/Token'
import { User } from '../models/User'

class TokenService {
	generateTokens = (payload: JwtPayload) => {
		const accessToken = jwt.sign(
			payload,
			process.env.JWT_ACCESS_SECRET as string,
			{ expiresIn: ACCESS_TOKEN_LIFE }
		)
		const refreshToken = jwt.sign(
			payload,
			process.env.JWT_REFRESH_SECRET as string,
			{ expiresIn: REFRESH_TOKEN_LIFE }
		)

		return {
			accessToken,
			refreshToken,
		}
	}

	validateAccessToken = (token: string) => {
		try {
			const userData = jwt.verify(
				token,
				process.env.JWT_ACCESS_SECRET as string
			) as User
			return userData
		} catch (error) {
			return null
		}
	}

	validateRefreshToken = (token: string) => {
		try {
			const userData = jwt.verify(
				token,
				process.env.JWT_REFRESH_SECRET as string
			) as User
			return userData
		} catch (error) {
			return null
		}
	}

	removeToken = async (refreshToken: string) => {
		const tokenData = await Token.delete({ refreshToken })
		return tokenData
	}

	findToken = async (refreshToken: string) => {
		const tokenData = await Token.findOne({ where: { refreshToken } })
		return tokenData
	}

	saveToken = async (userId: number, refreshToken: string) => {
		const tokenData = await Token.findOne({ where: { userId } })

		if (tokenData) {
			tokenData.refreshToken = refreshToken
			await tokenData.save()
			return tokenData
		}

		const token = await Token.create({ userId, refreshToken })
		await token.save()
		return token
	}
}

export default new TokenService()
