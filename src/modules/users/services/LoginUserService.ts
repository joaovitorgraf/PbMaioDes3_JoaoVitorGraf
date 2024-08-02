import { ValidationError } from '@shared/errors/AppError';
import User from '@models/User';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import authConfig from '@config/auth';
interface IReq {
    email: string;
    password: string;
}

interface IRes {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

class LoginUserService {
    public async execute({ email, password }: IReq): Promise<IRes> {
        const user = await User.findOne({ email });

        if (!user) {
            throw new ValidationError('Validation Error', 'email', 'invalid email');
        }

        const passwordConfirmed = await bcryptjs.compare(password, user.password);

        if (!passwordConfirmed) {
            throw new ValidationError('Validation Error', 'email', 'invalid email');
        }

        const token = jsonwebtoken.sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: token,
        };
    }
}

export default LoginUserService;
