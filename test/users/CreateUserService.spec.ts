import { jest } from '@jest/globals';
import CreateUserService from '../../src/modules/users/services/CreateUserService';
import User from '../../src/models/User';
import bcryptjs from 'bcryptjs';
import { StandardError } from '../../src/shared/errors/AppError';

describe('CreateUserService', () => {
    let createUserService: CreateUserService;

    beforeEach(() => {
        createUserService = new CreateUserService();
    });

    it('should create a new user', async () => {
        const mockUser = {
            firstName: 'João',
            lastName: 'Graf',
            birthDate: '2002-06-22',
            city: 'Mafra',
            country: 'Brasil',
            email: 'joaograf@exemplo.com',
            password: '12345',
        };

        jest.spyOn(User, 'findOne').mockResolvedValue(null);
        jest.spyOn(bcryptjs, 'hashSync').mockReturnValue('hashedPassword');
        jest.spyOn(User.prototype, 'save').mockImplementationOnce(async function () {
            return User;
        });

        const user = await createUserService.execute(mockUser);

        expect(user).toHaveProperty('firstName', 'João');
        expect(user).toHaveProperty('lastName', 'Graf');
        expect(user).toHaveProperty('birthDate', '2002-06-22');
        expect(user).toHaveProperty('city', 'Mafra');
        expect(user).toHaveProperty('country', 'Brasil');
        expect(user).toHaveProperty('email', 'joaograf@exemplo.com');
        expect(user).toHaveProperty('password', 'hashedPassword');
    });

    it('should not create a user if email already exists', async () => {
        const mockUser = {
            firstName: 'João',
            lastName: 'Graf',
            birthDate: '2002-06-22',
            city: 'Mafra',
            country: 'Brasil',
            email: 'joaograf@exemplo.com',
            password: '12345',
        };

        jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

        await expect(createUserService.execute(mockUser)).rejects.toBeInstanceOf(StandardError);
    });
});
