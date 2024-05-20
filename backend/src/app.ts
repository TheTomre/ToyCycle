/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- Postponed, unsafe assumption about `err` variable */
/* eslint-disable unicorn/prefer-module -- Postponed, consider __dirname -> import.meta.dirname */

import { middleware as OpenApiValidatorMiddleware } from "express-openapi-validator";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import dotenv from "dotenv";
import express, { ErrorRequestHandler } from "express";
import path from "node:path";
import routes from "./routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the OpenAPI specification
app.use("/api-docs", express.static(path.join(__dirname, "openapi.yaml")));

// Install the OpenAPI validator
app.use(
  OpenApiValidatorMiddleware({
    apiSpec: path.join(__dirname, "openapi.yaml"),
    validateRequests: true,
    validateResponses: true
  })
);

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
