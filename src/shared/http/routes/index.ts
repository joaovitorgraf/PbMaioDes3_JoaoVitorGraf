import { Router } from 'express';
import usersRoutes from '@modules/users/routes/users.routes';
import eventsRoutes from '@modules/events/routes/event.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/events', eventsRoutes);

export default routes;
