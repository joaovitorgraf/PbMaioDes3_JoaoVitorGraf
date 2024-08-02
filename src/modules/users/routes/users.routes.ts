import { Router } from 'express';
import UsersControler from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRoutes = Router();
const usersControler = new UsersControler();

usersRoutes.post('/sign-up', usersControler.create);
usersRoutes.post('/sign-in', usersControler.login);

export default usersRoutes;
