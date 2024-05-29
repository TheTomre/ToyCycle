/* eslint-disable @typescript-eslint/no-unsafe-argument -- Postponed */
/* eslint-disable no-magic-numbers -- Postponed */
/* eslint-disable i18n-text/no-en -- Postponed */
/* eslint-disable unicorn/prefer-module -- Postponed */
/* eslint-disable no-sync -- Postponed */
/* eslint-disable @typescript-eslint/no-misused-promises -- Postponed */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Postponed */
/* eslint-disable sort-imports-requires/sort-imports -- Postponed */

import express from "express";
import fs from "node:fs";
import handlebars from "handlebars";
import path from "node:path";
import controller from "../users/controller";
import { sendEmail } from "../emailService";

const router = express.Router();

router.get("/users", controller.getAllUsers);
router.post("/users", controller.createNewUser);

router.get("/users/:id", controller.getUserById);
router.put("/users/:id", controller.updateUserById);
router.delete("/users/:id", controller.deleteUserById);

// Route to create a new user
router.post("/users", async (req, res) => {
  const { email, username } = req.body;

  // Request validation with express-openapi-validator happens automatically

  // Logic to create a new user
  const newUser = {
    email,
    // Here should be the logic to save the user to the database
    id: "generated-id",
    username
    // other fields...
  };

  // Load and compile the email template
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "emails",
    "registration.html"
  );
  const source = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(source);
  const html = template({ username });

  // Send the email
  await sendEmail(email, "Welcome to ToyCycle", html);

  res.status(201).json(newUser);
});

export default router;
