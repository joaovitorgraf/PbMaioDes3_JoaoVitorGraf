import { Router } from 'express';
import UsersControler from '../controllers/UsersController';
import validator from '@shared/http/middlewares/validator';

const usersRoutes = Router();
const usersControler = new UsersControler();

usersRoutes.post('/sign-up', validator('signUpSchema'), usersControler.create);
usersRoutes.post('/sign-in', validator('signInSchema'), usersControler.login);

export default usersRoutes;
