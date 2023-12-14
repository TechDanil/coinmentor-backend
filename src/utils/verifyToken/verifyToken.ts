import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY as string);
    } catch (error) {
        throw new Error('Invalid token');
    }
}