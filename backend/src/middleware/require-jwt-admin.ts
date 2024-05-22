import { ADMIN_EMAIL } from "../config";
import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const requireJwtAdmin: RequestHandler = (req, res, next) => {
  if (req.jwt && ADMIN_EMAIL.includes(req.jwt.email)) next();
  else
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized",
      errorMessage: "You must be logged in to access this resource."
    });
};
