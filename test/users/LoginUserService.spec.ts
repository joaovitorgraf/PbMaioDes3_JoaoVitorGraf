import { jest } from '@jest/globals';
import LoginUserService from '../../src/modules/users/services/LoginUserService';
import User from '../../src/models/User';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { ValidationError } from '../../src/shared/errors/AppError';

describe('LoginUserService', () => {
    let loginUserService: LoginUserService;

    beforeEach(() => {
        loginUserService = new LoginUserService();
    });

    it('should log in a user with valid credentials', async () => {
        const mockUser = {
            id: 'user-id',
            firstName: 'João',
            lastName: 'Graf',
            email: 'joaograf@exemplo.com',
            password: 'hashedPassword',
        };

        const mockToken = 'mockToken';

        jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
        jest.spyOn(bcryptjs, 'compare').mockImplementation(async () => true);
        jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => mockToken);

        const response = await loginUserService.execute({
            email: 'joaograf@exemplo.com',
            password: 'password123',
        });

        expect(response).toHaveProperty('firstName', 'João');
        expect(response).toHaveProperty('lastName', 'Graf');
        expect(response).toHaveProperty('email', 'joaograf@exemplo.com');
        expect(response).toHaveProperty('token', mockToken);
    });

    it('should not log in a user with invalid email', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        await expect(
            loginUserService.execute({
                email: 'joaograf-invalid@exemplo.com',
                password: 'password123',
            }),
        ).rejects.toBeInstanceOf(ValidationError);
    });

    it('should not log in a user with invalid password', async () => {
        const mockUser = {
            id: 'user-id',
            firstName: 'João',
            lastName: 'Graf',
            email: 'joaograf@exemplo.com',
            password: 'hashedPassword',
        };

        jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
        jest.spyOn(bcryptjs, 'compare').mockImplementation(async () => false);

        await expect(
            loginUserService.execute({
                email: 'joaograf@exemplo.com',
                password: 'invalidPassword',
            }),
        ).rejects.toBeInstanceOf(ValidationError);
    });
});
