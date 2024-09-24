import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },
    eventSource: {
      type: String,
      enum: ['social media', 'friends', 'found myself'],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('User', userSchema);
