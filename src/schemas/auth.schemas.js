import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

export const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(3).required()
})