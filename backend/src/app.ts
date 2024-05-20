import { middleware as OpenApiValidatorMiddleware } from "express-openapi-validator";
import cors from "cors";
import dotenv from "dotenv";
import express, { ErrorRequestHandler } from "express";
import path from "node:path";
import routes from "./routes/index.routes";

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
  // @ts-expect-error
  next
) => {
  res.status(err.status || 500).json({
    errors: err.errors,
    message: err.message
  });
};

app.use(errorHandler);

export default app;
