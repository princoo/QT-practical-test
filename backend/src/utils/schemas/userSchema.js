import Joi from "joi";
import errorMessage from "../errorMessage.util.js";
import { USER_ROLE, USER_STATUS } from "../emuns/userEnum.js";

const roles = Object.values(USER_ROLE);
const statuses = Object.values(USER_STATUS);

export const createUserSchema = Joi.object().keys({
  email: Joi.string().email().required().messages(errorMessage("email")),
  role: Joi.string()
    .valid(...roles)
    .required()
    .messages(errorMessage("role")),
  status: Joi.string()
    .valid(...statuses)
    .required()
    .messages(errorMessage("status")),
});
