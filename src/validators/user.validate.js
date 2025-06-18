import joi from 'joi';

export const createUserSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
    status: joi.string().valid('active', 'inactive').default('active'),
});