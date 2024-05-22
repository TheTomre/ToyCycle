// backend/src/config.ts
export const SENDGRID_API_KEY = process.env['SENDGRID_API_KEY'] || 'sendgrid-api-key';
export const EMAIL_FROM = process.env['EMAIL_FROM'] || 'email@example.com';