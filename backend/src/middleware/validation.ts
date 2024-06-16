import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { STATUS_MESSAGE } from "../consts/statusCodes";

const validateSchema = async (
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
  validateSchema
];

export const validateToyMeRequest = [
  body("brand").isString().notEmpty().withMessage("Brand must be a string"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description must be a string"),
  body("fullDescription").isString().notEmpty(),
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Description must be a string"),
  body("origin").isString().notEmpty().withMessage("origin be a string"),
  body("condition")
    .isString()
    .notEmpty()
    .withMessage("Condition must be a string"),
  body("tokenValue")
    .isNumeric()
    .isInt({ min: 0 })
    .withMessage("Token value must be a positive number"),
  body("price")
    .isNumeric()
    .isInt({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("quantity")
    .isNumeric()
    .isInt({ min: 1 })
    .withMessage("quantity must be a positive number"),
  body("ageCategory")
    .isArray()
    .withMessage("Age category must be an array")
    .notEmpty()
    .withMessage("Age category must not be empty"),
  body("category")
    .isArray()
    .withMessage("Category must be an array")
    .notEmpty()
    .withMessage("Category must not be empty"),
  validateSchema
];
