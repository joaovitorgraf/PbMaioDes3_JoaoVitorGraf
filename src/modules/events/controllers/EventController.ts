import { Request, Response } from 'express';
import CreateEventService from '../services/CreateEventService';
import ListEventService from '../services/ListEventService';
import { StandardError, ValidationError } from '@shared/errors/AppError';
import DeleteEventService from '../services/DeleteEventService';

const baseDayOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday ',
    'friday ',
    'saturday',
];
export default class EventControler {
    public async list(req: Request, res: Response): Promise<Response> {
        const { dayOfWeek, description } = req.query;

        if (typeof dayOfWeek !== 'string' || typeof description !== 'string') {
            throw new StandardError('Invalid query parameters', 'Bad Request', 400);
        }

        const validationDayOfWeek = baseDayOfWeek.includes(dayOfWeek);

        if (validationDayOfWeek === false) {
            throw new ValidationError(
                'Validation Error',
                'dayOfWeek',
                'Last day of the week is not valid',
            );
        }

        const listEvent = new ListEventService();

        const events = await listEvent.execute({
            dayOfWeek,
            description,
        });

        return res.status(200).json(events);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { description, dayOfWeek } = req.body;
        const { userId } = req.params;

        const validationDayOfWeek = baseDayOfWeek.includes(dayOfWeek);

        if (validationDayOfWeek === false) {
            throw new ValidationError(
                'Validation Error',
                'dayOfWeek',
                'Last day of the week is not valid',
            );
        }

        const createEvent = new CreateEventService();

        const event = await createEvent.execute({
            description,
            dayOfWeek,
            userId,
        });

        return res.status(200).json({
            _id: event.id,
            description: event.description,
            dayOfWeek: event.dayOfWeek,
            userId: event.userId,
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { dayOfWeek } = req.query;

        if (typeof dayOfWeek !== 'string') {
            throw new StandardError('Invalid query parameters', 'Bad Request', 400);
        }

        const validationDayOfWeek = baseDayOfWeek.includes(dayOfWeek);

        if (validationDayOfWeek === false) {
            throw new ValidationError(
                'Validation Error',
                'dayOfWeek',
                'Last day of the week is not valid',
            );
        }

        const deleteEvent = new DeleteEventService();

        const eventsDelete = await deleteEvent.execute(dayOfWeek);

        return res.status(200).json([eventsDelete]);
    }
}
