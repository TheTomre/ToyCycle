/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable unicorn/prefer-module -- Postponed, consider __dirname -> import.meta.dirname */

import { SESSION_SECRET } from "./config";
import { StatusCodes } from "http-status-codes";
import { appendJwt } from "./middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { ErrorRequestHandler } from "express";
import passport from "passport";
import path from "node:path";
import routes from "./routes";
import session from "express-session";

dotenv.config();

const app = express();

app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(express.json());

// Auth0
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(appendJwt);

// Serve the OpenAPI specification
app.use("/api-docs", express.static(path.join(__dirname, "openapi.yaml")));

// !!!
// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Temporary disabled because of error
// {"message":"openapi.validator: spec could not be read at R:\\repos\\bootcamp-toy-cycle\\backend\\src\\openapi.yaml"}
// Install the OpenAPI validator
/*
app.use(
  OpenApiValidatorMiddleware({
    apiSpec: path.join(__dirname, "openapi.yaml"),
    validateRequests: true,
    validateResponses: true
  })
);
*/

// Routes
app.use("/api", routes);

// Error handler
const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Ok
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ok
  next
) => {
  res.status(err.status ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: err.errors,
    message: err.message
  });
};

app.use(errorHandler);

export default app;
