import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRATION } from '../../constants/index.constants';

export const generateAccessToken  = (userId: number): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: ACCESS_TOKEN_EXPIRATION });
}