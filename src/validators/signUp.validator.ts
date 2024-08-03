import Joi from 'joi';

const signUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.date().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().min(5).required(),
});

export default signUpSchema;
