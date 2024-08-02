import Event, { IEvent } from '@models/Event';
import User from '@models/User';
import { StandardError } from '@shared/errors/AppError';

interface IReq {
    description: string;
    dayOfWeek: string;
    userId: string;
}

class CreateEventService {
    public async execute({ description, dayOfWeek, userId }: IReq): Promise<IEvent> {
        const checkUser = await User.findById({ _id: userId });

        if (!checkUser) {
            throw new StandardError('User Not Found', 'Not Found', 404);
        }

        const event = new Event({
            description,
            dayOfWeek,
            userId,
        });

        await event.save();

        return event;
    }
}

export default CreateEventService;
