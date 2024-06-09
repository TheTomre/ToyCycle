import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";

import User from "../models/userModel";
import { STATUS, STATUS_MESSAGE } from "../consts/statusCodes";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env["AUTH0_AUDIENCE"] || "",
  issuerBaseURL: process.env["AUTH0_ISSUER_BASE_URL"] || "",
  tokenSigningAlg: "RS256"
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer")) {
    return res.status(STATUS.UNAUTHORIZED).json({
      status: STATUS_MESSAGE.FAIL,
      message: "Unauthorized user"
    });
  }

  const accessToken = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.decode(accessToken ?? "") as jwt.JwtPayload;
    const auth0Id = decodedToken.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.status(STATUS.UNAUTHORIZED).json({
        status: STATUS_MESSAGE.FAIL,
        message: "Unauthorized user"
      });
    }

    req.auth0Id = auth0Id ?? "";
    req.userId = user._id.toString();

    return next();
  } catch (error) {
    return res.status(STATUS.UNAUTHORIZED).json({
      status: STATUS_MESSAGE.FAIL,
      message: "Unauthorized user"
    });
  }
};
