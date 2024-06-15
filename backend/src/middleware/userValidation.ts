import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { STATUS_MESSAGE } from "../consts/statusCodes";

const validateUserSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: STATUS_MESSAGE.FAIL,
      message: errors.array()
    });
  }
  return next();
};

export const validateUserMeRequest = [
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("First name must be a string"),
  body("lastName")
    .isString()
    .notEmpty()
    .withMessage("Last name must be a string"),
  body("bio").isString(),
  body("avatar").isString(),
  body("lastActive").isString(),
  body("tokenBalance").isNumeric(),
  body("city").isString().notEmpty().withMessage("City name must be a string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country name must be a string"),
  body("city").isString().notEmpty().withMessage("City name must be a string"),
  body("zipcode").isString().notEmpty().withMessage("Zipcode is required"),
  body("street1").isString().notEmpty().withMessage("Street is required"),
  body("street2").isString(),
  validateUserSchema
];
