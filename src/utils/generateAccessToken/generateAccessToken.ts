import { ACCESS_TOKEN_LIFE } from 'constants/index.constants'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId: number): string => {
	return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
		expiresIn: ACCESS_TOKEN_LIFE,
	})
}
