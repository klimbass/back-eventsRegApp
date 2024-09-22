import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(35)
    .required()
    .messages({
      'string.min': `"title" must have at least ${3} characters`,
      'string.max': `"title" must have at most ${35} characters`,
      'any.required': `"title" is a required field`,
    }),
  email: Joi.string().required().messages({
    'string.empty': `"description" cannot be empty`,
    'any.required': `"description" is a required field`,
  }),
  dateOfBirth: Joi.string().required().messages({
    'any.required': `"date" is a required field`,
  }),
  eventSource: Joi.string().required().messages({
    'any.required': `"eventSource" is a required field`,
  }),
});
