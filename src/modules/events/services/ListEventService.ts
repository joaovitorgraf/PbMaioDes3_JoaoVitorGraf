import Event, { IEvent } from '@models/Event';
import { StandardError } from '@shared/errors/AppError';

class ListEventService {
    public async execute(): Promise<IEvent[]> {
        const events = await Event.find({});

        const eventsCount = events.length;

        if (eventsCount === 0) {
            throw new StandardError('Not found', 'Not found', 404);
        }

        return events;
    }
}

export default ListEventService;
