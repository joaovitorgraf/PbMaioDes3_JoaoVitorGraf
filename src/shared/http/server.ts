import 'dotenv/config';
import 'express-async-errors';
import createHttpError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { StandardError, ValidationError } from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((req, res, next) => {
    next(createHttpError(404));
});

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof StandardError) {
        return response.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
            error: error.error,
        });
    }

    if (error instanceof ValidationError) {
        return response.status(error.statusCode).json({
            type: error.type,
            errors: [
                {
                    resource: error.resource,
                    message: error.message,
                },
            ],
        });
    }

    if (error.status === 422 && error.message) {
        return response.status(422).json({
            type: 'Validation Error',
            errors: [
                {
                    resource: 'Unprocessable Entity',
                    message: error.message,
                },
            ],
        });
    }

    return response.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Something went wrong',
    });
});

app.listen(process.env.PORT, () => {
    console.log('serveon');
});
