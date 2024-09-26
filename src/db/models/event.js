import { Schema, model } from 'mongoose';

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    participantsList: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const EventsCollection = model('Event', eventSchema);
