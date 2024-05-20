/* eslint-disable no-magic-numbers -- Postponed, better move all constants to consts/index.ts */
/* eslint-disable no-process-env -- Postponed, better move all process.env to config/index.ts */
/* eslint-disable no-console -- Postponed, better use logger */

import app from "./app";
import mongoose from "mongoose";

const PORT = process.env["PORT"] || 8000;
const MONGO_URI = process.env["MONGO_URI"] || "your-mongodb-uri";

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
