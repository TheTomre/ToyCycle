import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const requireJwtUser: RequestHandler = (req, res, next) => {
  if (req.jwt) next();
  else
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized",
      errorMessage: "You must be logged in to access this resource."
    });
};
