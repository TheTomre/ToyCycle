// import type { RequestHandler } from "express";
// import { StatusCodes } from "http-status-codes";
// import { STATUS_MESSAGE } from "../consts/statusCodes";
// import { adminEmails } from "../config";

// export const requireJwtAdmin: RequestHandler = (req, res, next) => {
//   if (req.jwt && adminEmails.includes(req.jwt.email)) next();
//   else
//     res.status(StatusCodes.UNAUTHORIZED).json({
//       status: STATUS_MESSAGE.FAIL,
//       errorMessage:
//         "Unauthorized, You must be logged in to access this resource."
//     });
// };
