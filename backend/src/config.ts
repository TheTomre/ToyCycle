import { config } from "dotenv";

config();

const {
  SENDGRID_API_KEY = "sendgrid-api-key",
  EMAIL_FROM = "email@example.com",
  ENV,
  SECURE_PORT,
  ADMIN_EMAIL = "",
  AUTH0_CALLBACK_URL = "",
  AUTH0_CLIENT_ID = "",
  AUTH0_CLIENT_SECRET = "",
  AUTH0_DOMAIN = "",
  AUTH0_RETURN_URL = "",
  COOKIE_DOMAIN,
  JWT_SECRET = "",
  SESSION_SECRET = ""
} = process.env;

export {
  SENDGRID_API_KEY,
  EMAIL_FROM,
  ENV,
  SECURE_PORT,
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_RETURN_URL,
  COOKIE_DOMAIN,
  JWT_SECRET,
  SESSION_SECRET
};

export const adminEmails = ADMIN_EMAIL.split(",")
  .filter(email => email.length)
  .map(email => email.toLowerCase());
