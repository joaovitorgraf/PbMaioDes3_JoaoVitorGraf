import AppError from '@shared/errors/AppError';
import User, { IUser } from '@models/User';
import bcryptjs from 'bcryptjs';

interface IReq {
    email: string;
    password: string;
}

interface IRes {
    firstName: string;
    lastName: string;
    email: string;
}

class LoginUserService {
    public async execute({ email, password }: IReq): Promise<IRes> {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError('Incorrect email/password combination.');
        }

        const passwordConfirmed = await bcryptjs.compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.');
        }

        return { firstName: user.firstName, lastName: user.lastName, email: user.email };
    }
}

export default LoginUserService;
