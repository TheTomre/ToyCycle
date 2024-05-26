/* eslint-disable no-magic-numbers -- Postponed, better move all constants to consts/index.ts */
/* eslint-disable no-process-env -- Postponed, better move all process.env to config/index.ts */

import app from "./app";
import logger from "./logger/logger";
import mongoose from "mongoose";

const PORT = process.env["PORT"] || 8000;
const MONGO_URI =
  process.env["MONGO_URI"] ||
  "mongodb+srv://valeriiamelnikov:WkCwD0F55bzlHuRJ@valeriia.mp32dxd.mongodb.net/toycycle";

// Database connection
mongoose
  .connect(MONGO_URI)
  // eslint-disable-next-line github/no-then -- Ok
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  // eslint-disable-next-line github/no-then -- Ok
  .catch((err: unknown) => {
    logger.error("MongoDB connection error:", err);
  });

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
