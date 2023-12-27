import bcrypt from 'bcrypt'
import { User } from '../models/User'
import { ILogin, IRegister } from '../shared/interfaces/auth.interface'

import { PASSWORD_SALT_LENGTH } from '../constants/index.constants'
import AuthDto from '../dtos/auth.dto'
import ApiException from '../exceptions/api.exceptions'
import tokenService from './token.service'

class AuthService {
	register = async ({ username, email, password }: IRegister) => {
		const candidate = await User.findOne({ where: { email } })

		if (candidate) {
			throw ApiException.BadRequest('User exisits with such email')
		}

		const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_LENGTH)

		console.log(hashedPassword)

		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		})

		await user.save()

		const userDto = new AuthDto(user)

		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	login = async ({ email, password }: ILogin) => {
		const user = await User.findOne({ where: { email } })

		if (!user) {
			throw ApiException.BadRequest('the user has not been found!')
		}

		const isPasswordEquals = await bcrypt.compare(password, user.password)

		if (!isPasswordEquals) {
			throw ApiException.BadRequest('Wrong password!')
		}

		const userDto = new AuthDto(user)

		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	logout = async (refreshToken: string) => {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	refresh = async (refreshToken: string) => {
		if (!refreshToken) {
			throw ApiException.UnauthorizedError()
		}

		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await tokenService.findToken(refreshToken)

		if (!userData || !tokenFromDb) {
			throw ApiException.UnauthorizedError()
		}

		const user = await User.findOne({ where: { id: userData.id } })

		const userDto = new AuthDto(user as User)

		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}
}

export default new AuthService()
