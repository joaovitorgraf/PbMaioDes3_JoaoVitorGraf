import { Router } from 'express';
import UsersControler from '../controllers/UsersController';
import UserProfilePictureController from '../controllers/UserProfilePictureController';
import validator from '@shared/http/middlewares/validator';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRoutes = Router();
const usersControler = new UsersControler();
const userProfilePicture = new UserProfilePictureController();

usersRoutes.post('/sign-up', validator('signUpSchema'), usersControler.create);
usersRoutes.post('/sign-in', validator('signInSchema'), usersControler.login);
usersRoutes.get('/generate-upload-url', isAuthenticated, userProfilePicture.generateUploadURL);

export default usersRoutes;
