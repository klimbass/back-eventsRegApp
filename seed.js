import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
const { ObjectId } = mongoose.Types;
import { EventsCollection } from './src/db/models/event.js';
import { env } from './src/utils/env.js';

const user = env('MONGODB_USER');
const pwd = env('MONGODB_PASSWORD');
const url = env('MONGODB_URL');
mongoose
  .connect(
    `mongodb+srv://${user}:${pwd}@${url}/?retryWrites=true&w=majority&appName=mongodb`,
  )
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const generateParticipants = (num) => {
  const participants = [];
  for (let i = 0; i < num; i++) {
    participants.push({
      userId: new ObjectId(),
      userName: faker.name.firstName() + ' ' + faker.name.lastName(),
      userEmail: faker.internet.email(),
    });
  }
  return participants;
};

const generateEvents = (num) => {
  const events = [];
  for (let i = 0; i < num; i++) {
    events.push({
      title: faker.company.catchPhrase(),
      description: faker.lorem.sentences(2),
      date: faker.date.future().toISOString().split('T')[0],
      organizer: faker.company.name(),
      participantsList: generateParticipants(Math.floor(Math.random() * 5) + 1),
    });
  }
  return events;
};

const seedDB = async () => {
  //   await EventsCollection.deleteMany({});
  const events = generateEvents(50);
  await EventsCollection.insertMany(events);
  console.log('Database seeded with events');
};
seedDB()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  });
