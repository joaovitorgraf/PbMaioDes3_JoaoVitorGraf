import AppError from '@shared/errors/AppError';
import User, { IUser } from '@models/User';
import bcryptjs from 'bcryptjs';

interface IReq {
    firstName: string;
    lastName: string;
    birthDate: string;
    city: string;
    country: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({
        firstName,
        lastName,
        birthDate,
        city,
        country,
        email,
        password,
    }: IReq): Promise<IUser> {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await bcryptjs.hashSync(password, 8);

        const user = new User({
            firstName,
            lastName,
            birthDate,
            city,
            country,
            email,
            password: hashedPassword,
        });

        await user.save();

        return user;
    }
}

export default CreateUserService;
