import Joi from "joi";

const getContactValidation = Joi.number().positive().required();

const createContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().email().max(200).optional(),
  phone: Joi.string().max(20).optional(),
});

const updateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().email().max(200).optional(),
  phone: Joi.string().max(20).optional(),
});

const searchContactValidation = Joi.object({
  page: Joi.number().positive().min(1).default(1),
  size: Joi.number().positive().max(100).default(10),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export {
  getContactValidation,
  createContactValidation,
  updateContactValidation,
  searchContactValidation,
};
