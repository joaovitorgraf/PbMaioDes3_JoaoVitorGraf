import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { StandardError, ValidationError } from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
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

    console.error(error);

    return response.status(500).json({
        statusCode: 500,
        erro: 'Internal Server Error',
        message: 'Something went wrong',
    });
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port 3000! 🏆');
});
