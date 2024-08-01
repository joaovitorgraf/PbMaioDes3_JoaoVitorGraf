import { Router } from 'express';
import UsersControler from '../controllers/UsersController';

const usersRoutes = Router();
const usersControler = new UsersControler();

usersRoutes.post('/sign-up', usersControler.create);

export default usersRoutes;
