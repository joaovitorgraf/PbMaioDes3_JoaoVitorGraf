import Event, { IEvent } from '@models/Event';
import { StandardError, ValidationError } from '@shared/errors/AppError';
import { ObjectId } from 'mongodb';

class ListOneEventService {
    public async execute(id: string): Promise<IEvent> {
        const verifyId = await ObjectId.isValid(id);

        if (verifyId === false) {
            throw new ValidationError('Validation Error', 'id', 'id is not valid', 400);
        }

        const events = await Event.findById(id);

        if (!events) {
            throw new StandardError('Not found', 'Not found', 404);
        }

        return events;
    }
}

export default ListOneEventService;
