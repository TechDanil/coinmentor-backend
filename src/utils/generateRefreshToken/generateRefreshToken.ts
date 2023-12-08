import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_EXPIRATION } from '../../constants/index.constants';

export const generateRefreshToken = (): string => {
    return jwt.sign({}, process.env.JWT_SECRET as string, { expiresIn: REFRESH_TOKEN_EXPIRATION });
}