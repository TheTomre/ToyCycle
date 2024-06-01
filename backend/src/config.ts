/* eslint-disable no-process-env -- Ok */

import { config } from "dotenv";

config();

export const SENDGRID_API_KEY =
  process.env["SENDGRID_API_KEY"] || "sendgrid-api-key";
export const EMAIL_FROM = process.env["EMAIL_FROM"] || "email@example.com";

export const { ENV } = process.env;

export const { SECURE_PORT } = process.env;

export const ADMIN_EMAIL = (process.env["ADMIN_EMAIL"] ?? "")
  .split(",")
  .filter(email => email.length)
  .map(email => email.toLowerCase());

export const AUTH0_CALLBACK_URL = process.env["AUTH0_CALLBACK_URL"] ?? "";

export const AUTH0_CLIENT_ID = process.env["AUTH0_CLIENT_ID"] ?? "";

export const AUTH0_CLIENT_SECRET = process.env["AUTH0_CLIENT_SECRET"] ?? "";

export const AUTH0_DOMAIN = process.env["AUTH0_DOMAIN"] ?? "";

export const AUTH0_RETURN_URL = process.env["AUTH0_RETURN_URL"] ?? "";

export const { COOKIE_DOMAIN } = process.env;

export const JWT_SECRET = process.env["JWT_SECRET"] ?? "";

export const SESSION_SECRET = process.env["SESSION_SECRET"] ?? "";
