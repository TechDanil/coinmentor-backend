import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/verifyToken/verifyToken';
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = (req: CustomRequest , res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token);
   
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = verifyToken(token) as JwtPayload;
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(401).json({ message: 'Invalid access token', error });
    }
}