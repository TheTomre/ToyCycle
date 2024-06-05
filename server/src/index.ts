import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import mongoose from "mongoose";
import { ENV, SECURE_PORT } from "./config";
import app from "./app";
import { initPassport } from "./providers";
import logger from "./logger/logger";

const PORT = process.env["PORT"] || 8000;
const MONGO_URI = process.env["MONGO_URI"] || "your-mongodb-uri";

initPassport();

// TODO: Suggestion: Move mongoose initialization to providers folder
// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info("MongoDB connected");
  })
  .catch((err: unknown) => {
    logger.error("MongoDB connection error:", err);
  });

// Use secure server in development (needed for auth0)
if (ENV === "development") {
  const httpsOptions = {
    cert: fs.readFileSync("./certificates/localhost.pem"),
    key: fs.readFileSync("./certificates/localhost-key.pem")
  } as const;

  // HTTP server
  http.createServer(app).listen(PORT, () => {
    logger.info(`HTTP Server started on http://localhost:${PORT}`);
  });

  // HTTPS server
  https.createServer(httpsOptions, app).listen(SECURE_PORT, () => {
    logger.info(`HTTPS Server started on https://localhost:${SECURE_PORT}`);
  });
} else {
  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
