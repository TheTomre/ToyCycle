import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, EMAIL_FROM } from './config';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = {
    to,
    from: EMAIL_FROM,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};