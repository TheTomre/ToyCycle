/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable unicorn/prefer-module -- Postponed, consider __dirname -> import.meta.dirname */

import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  SESSION_SECRET
} from "./config";

import { Strategy as Auth0Strategy } from "passport-auth0";
import { middleware as OpenApiValidator } from "express-openapi-validator";
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

// Middleware
app.use(cors());
app.use(express.json());

// Auth0
app.use(cookieParser());
app.use(
  session({
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

passport.use(
  new Auth0Strategy(
    {
      callbackURL: AUTH0_CALLBACK_URL,
      clientID: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      domain: AUTH0_DOMAIN
    },
    (_accessToken, _refreshToken, _extraParams, profile, done) => {
      // Remove unused parameters
      done(null, profile);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());
app.use(appendJwt);

// Serve the OpenAPI specification
app.use("/api-docs", express.static(path.join(__dirname, "../openapi.yaml")));

// Install the OpenAPI validator
app.use(
  OpenApiValidator({
    apiSpec: path.join(__dirname, "../openapi.yaml"),
    validateRequests: true,
    validateResponses: true
  })
);

// Routes
app.use("/api/v1", routes);

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
