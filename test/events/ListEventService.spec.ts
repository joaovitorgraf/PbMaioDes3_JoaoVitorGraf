import { jest } from '@jest/globals';
import ListEventService from '../../src/modules/events/services/ListEventService';
import Event, { IEvent } from '../../src/models/Event';
import { StandardError } from '../../src/shared/errors/AppError';

jest.mock('../../src/models/Event', () => ({
    find: jest.fn(),
}));

describe('ListEventService', () => {
    let listEventService: ListEventService;
    let mockFind: jest.MockedFunction<typeof Event.find>;

    beforeEach(() => {
        listEventService = new ListEventService();
        mockFind = Event.find as jest.MockedFunction<typeof Event.find>;
    });

    it('should return events if they exist for the given dayOfWeek and description', async () => {
        const validRequest = { dayOfWeek: 'Monday', description: 'Test Event' };
        const mockEvents: Partial<IEvent>[] = [
            { _id: '1', dayOfWeek: 'Monday', description: 'Test Event', userId: 'user1' },
            { _id: '2', dayOfWeek: 'Monday', description: 'Test Event', userId: 'user2' },
        ];

        mockFind.mockResolvedValue(mockEvents);

        const result = await listEventService.execute(validRequest);

        expect(mockFind).toHaveBeenCalledWith(validRequest);
        expect(result).toEqual(mockEvents);
    });

    it('should throw a StandardError if no events are found', async () => {
        const validRequest = { dayOfWeek: 'Monday', description: 'Non-existent Event' };

        mockFind.mockResolvedValue([]);

        const result = await listEventService.execute(validRequest);

        expect(result).rejects.toThrow(StandardError);
        expect(mockFind).toHaveBeenCalledWith(validRequest);
    });
});
