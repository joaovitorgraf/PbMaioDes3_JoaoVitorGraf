import { jest } from '@jest/globals';
import DeleteEventService from '../../src/modules/events/services/DeleteEventService';
import Event, { IEvent } from '../../src/models/Event';
import { StandardError } from '../../src/shared/errors/AppError';

jest.mock('../../src/models/Event', () => ({
    find: jest.fn(),
    deleteMany: jest.fn(),
}));

describe('DeleteEventService', () => {
    let deleteEventService: DeleteEventService;
    let mockFind: jest.MockedFunction<typeof Event.find>;
    let mockDeleteMany: jest.MockedFunction<typeof Event.deleteMany>;

    beforeEach(() => {
        deleteEventService = new DeleteEventService();
        mockFind = Event.find as jest.MockedFunction<typeof Event.find>;
        mockDeleteMany = Event.deleteMany as jest.MockedFunction<typeof Event.deleteMany>;
    });

    it('should delete events and return them if events exist on the given day of the week', async () => {
        const mockEvents = [
            { id: '1', description: 'Event 1', dayOfWeek: 'Monday', userId: 'user-id' },
            { id: '2', description: 'Event 2', dayOfWeek: 'Monday', userId: 'user-id' },
        ] as IEvent[];

        mockFind.mockResolvedValue(mockEvents);
        mockDeleteMany.mockResolvedValue({ deletedCount: mockEvents.length } as any);

        const events = await deleteEventService.execute('Monday');

        expect(mockFind).toHaveBeenCalledWith({ dayOfWeek: 'Monday' });
        expect(mockDeleteMany).toHaveBeenCalledWith({ dayOfWeek: 'Monday' });
        expect(events).toEqual(mockEvents);
    });

    it('should throw an error if no events are found on the given day of the week', async () => {
        mockFind.mockResolvedValue([]);

        await expect(deleteEventService.execute('Monday')).rejects.toThrow(StandardError);
    });
});
