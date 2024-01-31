import { REFRESH_TOKEN_LIFE } from 'constants/index.constants'
import jwt from 'jsonwebtoken'

export const generateRefreshToken = (): string => {
	return jwt.sign({}, process.env.JWT_SECRET as string, {
		expiresIn: REFRESH_TOKEN_LIFE,
	})
}
