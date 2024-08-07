import { jest } from '@jest/globals';
import { ObjectId } from 'mongodb';
import DeleteOneEventService from '../../src/modules/events/services/DeleteOneEventService';
import Event from '../../src/models/Event';
import { StandardError, ValidationError } from '../../src/shared/errors/AppError';

jest.mock('../../src/models/Event', () => ({
    findOne: jest.fn(),
    deleteOne: jest.fn(),
}));

type DeleteResult = {
    acknowledged: boolean;
    deletedCount: number;
};

describe('DeleteOneEventService', () => {
    let deleteOneEventService: DeleteOneEventService;
    let mockFindOne: jest.MockedFunction<typeof Event.findOne>;
    let mockDeleteOne: jest.MockedFunction<typeof Event.deleteOne>;

    beforeEach(() => {
        deleteOneEventService = new DeleteOneEventService();
        mockFindOne = Event.findOne as jest.MockedFunction<typeof Event.findOne>;
        mockDeleteOne = Event.deleteOne as jest.MockedFunction<typeof Event.deleteOne>;
    });

    it('should delete the event if a valid ID is provided and the event exists', async () => {
        const validId = '60b8d295f1d4b2a5d1c2f123';
        const mockEvent = {
            _id: validId,
            description: 'Test Event',
            dayOfWeek: 'Monday',
            userId: 'user-id',
        };

        mockFindOne.mockResolvedValue(mockEvent);
        const mockDeleteResult: DeleteResult = { acknowledged: true, deletedCount: 1 };
        mockDeleteOne.mockResolvedValue(mockDeleteResult);

        await deleteOneEventService.execute(validId);

        expect(ObjectId.isValid(validId)).toBe(true);
        expect(mockFindOne).toHaveBeenCalledWith({ _id: validId });
        expect(mockDeleteOne).toHaveBeenCalledWith({ _id: validId });
    });

    it('should throw a ValidationError if the provided ID is not valid', async () => {
        const invalidId = 'invalid-id';

        await expect(deleteOneEventService.execute(invalidId)).rejects.toThrow(ValidationError);
    });

    it('should throw a StandardError if the event does not exist', async () => {
        const validId = '60b8d295f1d4b2a5d1c2f123';

        mockFindOne.mockResolvedValue(null);

        await expect(deleteOneEventService.execute(validId)).rejects.toThrow(StandardError);

        expect(ObjectId.isValid(validId)).toBe(true);
        expect(mockFindOne).toHaveBeenCalledWith({ _id: validId });
    });
});
