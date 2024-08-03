import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import EventControler from '../controllers/EventController';
import validator from '@shared/http/middlewares/validator';

const eventsRoutes = Router({ mergeParams: true });
const eventControler = new EventControler();

eventsRoutes.get('/?', isAuthenticated, eventControler.list);
eventsRoutes.get('/:id', isAuthenticated, eventControler.listOne);
eventsRoutes.post('/', isAuthenticated, validator('createEventSchema'), eventControler.create);
eventsRoutes.delete('/?', isAuthenticated, eventControler.delete);
eventsRoutes.delete('/:id', isAuthenticated, eventControler.deleteOne);

export default eventsRoutes;
