import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addParticipantEventController,
  createEventController,
  getEventByIdController,
  getEventsController,
} from '../controllers/events.js';
import { validateBody } from '../utils/validateBody.js';
import { createEventSchema } from '../validation/event.js';
import { createUserSchema } from '../validation/user.js';

const eventsRouter = Router();

eventsRouter.get('/', ctrlWrapper(getEventsController));

eventsRouter.get('/:eventId', ctrlWrapper(getEventByIdController));

eventsRouter.post(
  '/',
  validateBody(createEventSchema),
  ctrlWrapper(createEventController),
);

eventsRouter.patch(
  '/:eventId',
  validateBody(createUserSchema),
  ctrlWrapper(addParticipantEventController),
);

export default eventsRouter;
