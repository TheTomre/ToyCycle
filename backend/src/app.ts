import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import { middleware as OpenApiValidatorMiddleware } from 'express-openapi-validator';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the OpenAPI specification
app.use('/api-docs', express.static(path.join(__dirname, 'openapi.yaml')));

// Install the OpenAPI validator
app.use(
  OpenApiValidatorMiddleware({
    apiSpec: path.join(__dirname, 'openapi.yaml'),
    validateRequests: true,
    validateResponses: true,
  })
);

// Routes
app.use('/api', routes);

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
};

app.use(errorHandler);

export default app;
