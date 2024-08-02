import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import LoginUserService from '../services/LoginUserService';

export default class UsersControler {
    public async create(req: Request, res: Response): Promise<Response> {
        const { firstName, lastName, birthDate, city, country, email, password, confirmPassword } =
            req.body;

        const createUser = new CreateUserService();

        if (confirmPassword !== password) {
            throw new AppError('password other than confirmPassword');
        }

        await createUser.execute({
            firstName,
            lastName,
            birthDate,
            city,
            country,
            email,
            password,
        });

        return res.status(201).json({ message: 'User created' });
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const loginUserService = new LoginUserService();
        const user = await loginUserService.execute({ email, password });

        return res.status(200).json(user);
    }
}
