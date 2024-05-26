import { EMAIL_FROM, SENDGRID_API_KEY } from "./config";
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
    /* eslint-disable-next-line no-console -- Postponed, talk to Firill about this file */
    console.log("Email sent successfully");
  } catch (err) {
    /* eslint-disable-next-line no-console -- Postponed, talk to Firill about this file */
    console.error("Error sending email:", err);
  }
};
