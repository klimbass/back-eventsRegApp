import { EventsCollection } from '../db/models/event.js';
import { UsersCollection } from '../db/models/user.js';

export const getAllEvents = async () => {
  const events = await EventsCollection.find();
  return events;
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
    { $addToSet: { participantList: userInDB._id } },
    {
      new: true,
      includeResultMetadata: false,
    },
  );
  return event;
};
