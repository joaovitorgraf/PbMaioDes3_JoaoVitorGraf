import { jest } from '@jest/globals';
import CreateEventService from '../../src/modules/events/services/CreateEventService';
import Event, { IEvent } from '../../src/models/Event';
import User from '../../src/models/User';
import { StandardError } from '../../src/shared/errors/AppError';

// Define o tipo esperado para o retorno de User.findById
interface IUser {
    _id: string;
}

jest.mock('../../src/models/User', () => ({
    findById: jest.fn(),
}));

// Mock do método save para o Event
const mockSave = jest.fn();
const mockEvent: Partial<IEvent> = {
    _id: '1',
    description: 'Test Event',
    dayOfWeek: 'Monday',
    userId: 'user-id',
};

// Mock da classe Event
jest.mock('../../src/models/Event', () => {
    return {
        default: jest.fn().mockImplementation(function (
            this: any,
            { description, dayOfWeek, userId }: any,
        ) {
            this.description = description;
            this.dayOfWeek = dayOfWeek;
            this.userId = userId;
            this.save = mockSave;
        }),
        findById: jest.fn(),
    };
});

describe('CreateEventService', () => {
    let createEventService: CreateEventService;

    beforeEach(() => {
        createEventService = new CreateEventService();
    });

    it('should create an event if the user exists', async () => {
        const validUser: IUser = { _id: 'user-id' }; // Mock do usuário válido

        // Mock do método findById do User para retornar um usuário válido
        (User.findById as jest.Mock).mockResolvedValue(validUser as never);

        // Configura o mockSave para retornar o evento mockado
        mockSave.mockResolvedValue(mockEvent as never);

        const event = await createEventService.execute({
            description: 'Test Event',
            dayOfWeek: 'Monday',
            userId: 'user-id',
        });

        expect(User.findById).toHaveBeenCalledWith({ _id: 'user-id' });
        expect(Event).toHaveBeenCalledWith({
            description: 'Test Event',
            dayOfWeek: 'Monday',
            userId: 'user-id',
        });
        expect(mockSave).toHaveBeenCalled();
        expect(event).toEqual(mockEvent);
    });

    it('should throw an error if the user does not exist', async () => {
        // Mock do método findById do User para retornar null (usuário não encontrado)
        (User.findById as jest.Mock).mockResolvedValue(null as never);

        await expect(
            createEventService.execute({
                description: 'Test Event',
                dayOfWeek: 'Monday',
                userId: 'invalid-user-id',
            }),
        ).rejects.toThrow(StandardError);
    });
});
