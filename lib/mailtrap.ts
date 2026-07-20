import { MailtrapClient } from "mailtrap";

export const HOST_NOTIFICATION_EMAIL = "gew7kous@gmail.com";

export const MAILTRAP_SENDER = {
  name: process.env.MAILTRAP_SENDER_NAME ?? "Βάπτιση του George",
  email: process.env.MAILTRAP_SENDER_EMAIL ?? "no-reply@example.com",
};

let client: MailtrapClient | null = null;

/**
 * Returns null when Mailtrap hasn't been configured yet, so the RSVP can
 * still be saved to Convex even before email sending is set up.
 */
export function getMailtrapClient() {
  const token = process.env.MAILTRAP_API_KEY;
  if (!token) return null;

  if (!client) {
    client = new MailtrapClient({
      token,
      sandbox: process.env.MAILTRAP_USE_SANDBOX === "true",
      testInboxId: process.env.MAILTRAP_INBOX_ID
        ? Number(process.env.MAILTRAP_INBOX_ID)
        : undefined,
    });
  }
  return client;
}
