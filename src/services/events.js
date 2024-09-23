import { EventsCollection } from '../db/models/event.js';
import { UsersCollection } from '../db/models/user.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllEvents = async ({ page = 1, perPage = 8 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const eventsQuery = EventsCollection.find();
  const eventsCount = await EventsCollection.find()
    .merge(eventsQuery)
    .countDocuments();
  const events = await eventsQuery.skip(skip).limit(limit).exec();
  const paginationData = calculatePaginationData(eventsCount, perPage, page);
  return {
    data: events,
    ...paginationData,
  };
};

export const getEventById = async (id) => {
  const event = await EventsCollection.findById({ _id: id });

  return event;
};

export const createEvent = async (body) => {
  const event = await EventsCollection.create({ ...body });
  return event;
};

export const addParticipantToEvent = async (eventId, user) => {
  console.log(user);

  const userEmail = user.email;
  let userInDB = await UsersCollection.findOne({ email: userEmail });
  if (!userInDB) {
    userInDB = await UsersCollection.create(user);
  }
  const event = await EventsCollection.findOneAndUpdate(
    { _id: eventId },
    {
      $addToSet: {
        participantsList: {
          userId: userInDB._id,
          userName: userInDB.name,
          userEmail: userInDB.email,
        },
      },
    },
    {
      new: true,
      includeResultMetadata: false,
    },
  );
  return event;
};
