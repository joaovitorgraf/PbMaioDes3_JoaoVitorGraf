import Joi from 'joi';

const createEventSchema = Joi.object({
    description: Joi.string().required(),
    dayOfWeek: Joi.string().required(),
});

export default createEventSchema;
