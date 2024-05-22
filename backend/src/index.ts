/* eslint-disable no-sync -- Ok */
/* eslint-disable i18n-text/no-en -- Postponed, decide if lang file is needed */
/* eslint-disable no-magic-numbers -- Postponed, better move all constants to consts/index.ts */
/* eslint-disable no-process-env -- Postponed, better move all process.env to config/index.ts */
/* eslint-disable no-console -- Postponed, better use logger */

import { ENV, SECURE_PORT } from "./config";
import app from "./app";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import { initPassport } from "./providers";
import { logger } from "./services";
import mongoose from "mongoose";

const PORT = process.env["PORT"] || 8000;
const MONGO_URI = process.env["MONGO_URI"] || "your-mongodb-uri";

initPassport();

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Suggestion: Move mongoose initialization to providers folder
// Database connection
mongoose
  .connect(MONGO_URI)
  // eslint-disable-next-line github/no-then -- Ok
  .then(() => {
    console.log("MongoDB connectedon");
  })
  // eslint-disable-next-line github/no-then -- Ok
  .catch((err: unknown) => {
    console.error("MongoDB connection error:", err);
  });

// Use secure server in development (needed for auth0)
if (ENV === "development") {
  const httpsOptions = {
    cert: fs.readFileSync("./certificates/localhost.pem"),
    key: fs.readFileSync("./certificates/localhost-key.pem")
  } as const;

  http.createServer(app).listen(PORT, () => {
    logger.info("Server started");
  });

  https.createServer(httpsOptions, app).listen(SECURE_PORT, () => {
    logger.info("Secure server started");
  });
}
// Start server
else
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
