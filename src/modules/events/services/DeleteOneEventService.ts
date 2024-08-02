import Event, { IEvent } from '@models/Event';
import { StandardError, ValidationError } from '@shared/errors/AppError';
import { ObjectId } from 'mongodb';

class DeleteOneEventService {
    public async execute(id: string): Promise<void> {
        const verifyId = await ObjectId.isValid(id);

        if (verifyId === false) {
            throw new ValidationError('Validation Error', 'id', 'id is not valid', 400);
        }

        const findEvent = await Event.findOne({ _id: id });

        if (!findEvent) {
            throw new StandardError('Not found', 'Not found', 404);
        }

        await Event.deleteOne({ _id: id });
    }
}

export default DeleteOneEventService;
