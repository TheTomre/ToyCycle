import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { STATUS_MESSAGE } from "../consts/statusCodes";

export const validateUserSchema = Joi.object({
  bio: Joi.string().min(1).max(120).optional(),
  firstName: Joi.string().min(1).max(120).required(),
  lastName: Joi.string().min(1).max(120).required(),
  avatar: Joi.string().optional(),
  lastActive: Joi.string(),
  tokenBalance: Joi.number().positive(),
  address: Joi.object({
    city: Joi.string().min(1).max(120).required(),
    country: Joi.string().min(1).max(120).required(),
    street1: Joi.string().min(1).max(120).required(),
    street2: Joi.string().optional(),
    zipcode: Joi.string().min(1).max(50).required()
  })
});

export const handleValidationError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validateUserSchema.validate(req.body);

  if (!errors.error) {
    return res.status(400).json({
      status: STATUS_MESSAGE.FAIL,
      message: errors.error
    });
  }
  return next();
};
