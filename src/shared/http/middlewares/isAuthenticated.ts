import { StandardError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken, { Secret } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeaer = req.headers.authorization;

    if (!authHeaer) {
        throw new StandardError('JWT Token is missing.');
    }

    const [, token] = authHeaer.split(' ');

    try {
        jsonwebtoken.verify(token, authConfig.jwt.secret as Secret);

        return next();
    } catch {
        throw new StandardError('Invalid JWT Token.');
    }
}
