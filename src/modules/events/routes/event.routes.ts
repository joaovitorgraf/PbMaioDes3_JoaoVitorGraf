import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import EventControler from '../controllers/EventController';

const eventsRoutes = Router({ mergeParams: true });
const eventControler = new EventControler();

eventsRoutes.get('/?', isAuthenticated, eventControler.list);
eventsRoutes.post('/', isAuthenticated, eventControler.create);
eventsRoutes.delete('/?', isAuthenticated, eventControler.delete);

export default eventsRoutes;
