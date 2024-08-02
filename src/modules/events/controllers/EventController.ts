import { Request, Response } from 'express';
import CreateEventService from '../services/CreateEventService';

export default class EventControler {
    public async create(req: Request, res: Response): Promise<Response> {
        const { description, dayOfWeek } = req.body;
        const { userId } = req.params;

        const createEvent = new CreateEventService();

        await createEvent.execute({
            description,
            dayOfWeek,
            userId,
        });

        return res.status(200).json({ message: 'Successful operation' });
    }
}
