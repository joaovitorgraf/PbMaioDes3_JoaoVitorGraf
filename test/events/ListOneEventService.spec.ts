import { jest } from '@jest/globals';
import ListOneEventService from '../../src/modules/events/services/ListOneEventService';
import Event, { IEvent } from '../../src/models/Event';
import { StandardError, ValidationError } from '../../src/shared/errors/AppError';
import { ObjectId } from 'mongodb';

// Mock do modelo Event
jest.mock('../../src/models/Event', () => ({
    findById: jest.fn(),
}));

describe('ListOneEventService', () => {
    let listOneEventService: ListOneEventService;
    let mockFindById: jest.MockedFunction<typeof Event.findById>;

    beforeEach(() => {
        listOneEventService = new ListOneEventService();
        mockFindById = Event.findById as jest.MockedFunction<typeof Event.findById>;
    });

    it('should return the event if a valid ID is provided and the event exists', async () => {
        const validId = '60b8d295f1d4b2a5d1c2f123';
        const mockEvent: Partial<IEvent> = {
            _id: validId,
            description: 'Test Event',
            dayOfWeek: 'Monday',
            userId: 'user1',
        };

        mockFindById.mockResolvedValue(mockEvent as IEvent);

        const result = await listOneEventService.execute(validId);

        expect(ObjectId.isValid(validId)).toBe(true);
        expect(mockFindById).toHaveBeenCalledWith(validId);
        expect(result).toEqual(mockEvent);
    });

    it('should throw a ValidationError if the provided ID is not valid', async () => {
        const invalidId = 'invalid-id';

        await expect(listOneEventService.execute(invalidId)).rejects.toThrow(ValidationError);
    });

    it('should throw a StandardError if the event does not exist', async () => {
        const validId = '60b8d295f1d4b2a5d1c2f123';

        mockFindById.mockResolvedValue(null);

        await expect(listOneEventService.execute(validId)).rejects.toThrow(StandardError);

        expect(ObjectId.isValid(validId)).toBe(true);
        expect(mockFindById).toHaveBeenCalledWith(validId);
    });
});
