import Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(35)
    .required()
    .messages({
      'string.min': `"title" must have at least ${3} characters`,
      'string.max': `"title" must have at most ${35} characters`,
      'any.required': `"title" is a required field`,
    }),
  description: Joi.string().required().messages({
    'string.empty': `"description" cannot be empty`,
    'any.required': `"description" is a required field`,
  }),
  date: Joi.string().required().messages({
    'any.required': `"date" is a required field`,
  }),
  organizer: Joi.string().required().messages({
    'any.required': `"organizer" is a required field`,
  }),
});
