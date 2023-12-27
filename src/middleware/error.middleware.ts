import { NextFunction, Request, Response } from 'express';
import ApiException from '../exceptions/api.exceptions';

export const errorMiddleware = (err: ApiException, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof ApiException) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({ message: 'unexpected error' });
}