import { Request, Response } from 'express';
import CreateEventService from '../services/CreateEventService';
import ListEventService from '../services/ListEventService';
import { StandardError } from '@shared/errors/AppError';

export default class EventControler {
    public async list(req: Request, res: Response): Promise<Response> {
        const listEvent = new ListEventService();

        const events = await listEvent.execute();

        return res.status(200).json([events]);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { description, dayOfWeek } = req.body;
        const { userId } = req.params;

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
}
