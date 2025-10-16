import { Router } from 'express';
import eventsRouter from './events.js';
import usersRouter from './users.js';

const router = Router();

router.use('/events', eventsRouter);
router.use('/users', usersRouter);

export default router;
