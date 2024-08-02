import Event, { IEvent } from '@models/Event';
import { StandardError } from '@shared/errors/AppError';

interface IReq {
    dayOfWeek: string;
    description: string;
}

class ListEventService {
    public async execute({ dayOfWeek, description }: IReq): Promise<IEvent[]> {
        const events = await Event.find({
            dayOfWeek: dayOfWeek,
            description: description,
        });

        const eventsCount = events.length;

        if (eventsCount === 0) {
            throw new StandardError('Not found', 'Not found', 404);
        }

        return events;
    }
}

export default ListEventService;
