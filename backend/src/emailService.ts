/* eslint-disable i18n-text/no-en -- Postponed, decide if lang file is needed */

import { EMAIL_FROM, SENDGRID_API_KEY } from "./config";
import logger from "./logger/logger";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  const msg = {
    from: EMAIL_FROM,
    html,
    subject,
    to
  };

  try {
    await sgMail.send(msg);
    logger.info("Email sent successfully");
  } catch (err) {
    logger.error("Error sending email:", err);
  }
};
