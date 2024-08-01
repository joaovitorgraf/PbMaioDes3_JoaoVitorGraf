import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
            error: error.error,
        });
    }

    console.error(error);

    return response.status(500).json({
        statusCode: 500,
        erro: 'Internal Server Error',
        message: 'Something went wrong',
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000! 🏆');
});
