import { Router } from 'express';
import UsersControler from '../controllers/UsersController';
import validator from '@shared/http/middlewares/validator';

const usersRoutes = Router();
const usersControler = new UsersControler();

usersRoutes.post('/sign-up', usersControler.create);
usersRoutes.post('/sign-in', validator('loginSchema'), usersControler.login);

export default usersRoutes;
