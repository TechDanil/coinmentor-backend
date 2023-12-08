import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/verifyToken/verifyToken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(401).json({ message: 'Invalid access token' });
    }
}