import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import routes from './routes/index.routes';
import { middleware as OpenApiValidatorMiddleware } from 'express-openapi-validator';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your-mongodb-uri';

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

// Database connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;