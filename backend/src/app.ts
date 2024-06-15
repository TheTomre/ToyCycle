import { middleware as OpenApiValidator } from "express-openapi-validator";
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
