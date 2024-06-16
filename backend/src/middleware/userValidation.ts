import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { STATUS_MESSAGE } from "../consts/statusCodes";
import logger from "../logger/logger";

const validateUserSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(errors.array());

    return res.status(400).json({
      status: STATUS_MESSAGE.FAIL,
      message: "Invalid request data "
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
  // body("avatar").isString().default(""),
  // body("lastActive").isString().default(new Date().toISOString()),
  // body("tokenBalance").isNumeric().default(0),
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

// export const validateUserSchema = Joi.object({
//   bio: Joi.string().min(1).max(120).optional(),
//   firstName: Joi.string().min(1).max(120).required(),
//   lastName: Joi.string().min(1).max(120).required(),
//   avatar: Joi.string().optional(),
//   lastActive: Joi.string(),
//   tokenBalance: Joi.number().positive(),
//   address: Joi.object({
//     city: Joi.string().min(1).max(120).required(),
//     country: Joi.string().min(1).max(120).required(),
//     street1: Joi.string().min(1).max(120).required(),
//     street2: Joi.string().optional(),
//     zipcode: Joi.string().min(1).max(50).required()
//   })
// });

// export const handleValidationError = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const errors = validateUserSchema.validate(req.body);

//   if (!errors.error) {
//     return res.status(400).json({
//       status: STATUS_MESSAGE.FAIL,
//       message: errors.error
//     });
//   }
//   return next();
// };
