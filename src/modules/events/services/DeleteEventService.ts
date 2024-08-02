import Event, { IEvent } from '@models/Event';
import { StandardError } from '@shared/errors/AppError';

class DeleteEventService {
    public async execute(dayOfWeek: string): Promise<IEvent[]> {
        const findEvents = await Event.find({ dayOfWeek: dayOfWeek });

        const countFindEvents = findEvents.length;

        if (countFindEvents === 0) {
            throw new StandardError(`Event ${dayOfWeek} Not found`, 'Not found', 404);
        }

        await Event.deleteMany({ dayOfWeek: dayOfWeek });

        return findEvents;
    }
}

export default DeleteEventService;
