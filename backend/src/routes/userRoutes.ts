import express from 'express';
import { sendEmail } from '../emailService';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const router = express.Router();

// Route to create a new user
router.post('/users', async (req, res) => {
  const { email, username } = req.body;

  // Request validation with express-openapi-validator happens automatically

  // Logic to create a new user
  const newUser = {
    // Here should be the logic to save the user to the database
    id: 'generated-id',
    email,
    username,
    // other fields...
  };

  // Load and compile the email template
  const templatePath = path.join(__dirname, '..', 'templates', 'emails', 'registration.html');
  const source = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(source);
  const html = template({ username });

  // Send the email
  await sendEmail(email, 'Welcome to ToyCycle', html);

  res.status(201).json(newUser);
});

export default router;