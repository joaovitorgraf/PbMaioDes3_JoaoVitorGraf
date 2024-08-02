import { StandardError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken, { Secret } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeaer = req.headers.authorization;

    if (!authHeaer) {
        throw new StandardError('Not Authenticated', 'Unauthorized', 401);
    }

    const [, token] = authHeaer.split(' ');

    try {
        const decoded = jsonwebtoken.verify(token, authConfig.jwt.secret as Secret);

        const { sub } = decoded as ITokenPayload;

        req.params.userId = sub;

        return next();
    } catch {
        throw new StandardError('Not Authenticated', 'Unauthorized', 401);
    }
}
