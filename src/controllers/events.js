import {
  addParticipantToEvent,
  createEvent,
  getAllEvents,
  getEventById,
} from '../services/events.js';
import { parsePaginationParam } from '../utils/parsePaginationParam.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getEventsController = async (req, res) => {
  const { page, perPage } = parsePaginationParam(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);

  const events = await getAllEvents({ page, perPage, sortOrder, sortBy });
  res.status(200).json({
    status: 200,
    message: 'Successfully found events!',
    data: events,
  });
};

export const getEventByIdController = async (req, res) => {
  const { eventId } = req.params;
  const event = await getEventById(eventId);

  res.status(200).json({
    status: 200,
    message: 'Successfully find an event by ID',
    data: event,
  });
};

export const createEventController = async (req, res) => {
  const event = createEvent(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a event',
    data: event,
  });
};

export const addParticipantEventController = async (req, res) => {
  const { eventId } = req.params;
  const user = req.body;

  const event = await addParticipantToEvent(eventId, user);
  res.status(200).json({
    status: 200,
    message: 'Successfully add a participant to an event',
    data: event,
  });
};
