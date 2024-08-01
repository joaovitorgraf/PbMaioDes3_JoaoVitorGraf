import express, { Request, Response } from 'express';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json())

app.use(routes)

app.use(
    (error: Error, request: Request, response: Response) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }

      console.log(error);

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );

app.listen(3000, () => {
    console.log('Server started on port 3333! 🏆');
})
