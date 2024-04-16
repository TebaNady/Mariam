import Joi from "joi";

const signUpValidationSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .required(),
  id: Joi.string().min(14).max(14).required(),
  year: Joi.string().required(),
  university: Joi.string().required(),
  faculty: Joi.string().required()
});

const signInSchem = Joi.object({
  id: Joi.string().min(14).max(14).required(),
  password: Joi.string()
    .min(8)
    .required(),
});

export { signUpValidationSchema, signInSchem };
