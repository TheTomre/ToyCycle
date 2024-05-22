/* eslint-disable @typescript-eslint/explicit-function-return-type -- Ok */
/* eslint-disable no-console -- Ok */

import { EMAIL_FROM, SENDGRID_API_KEY } from "./config";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = {
    from: EMAIL_FROM,
    html,
    subject,
    to
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
