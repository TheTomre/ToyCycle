import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { adminEmails } from "../config";

export const requireJwtAdmin: RequestHandler = (req, res, next) => {
  if (req.jwt && adminEmails.includes(req.jwt.email)) next();
  else
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized",
      errorMessage: "You must be logged in to access this resource."
    });
};
