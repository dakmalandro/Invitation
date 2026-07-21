"use server";

import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex-server";
import {
  getMailtrapClient,
  HOST_NOTIFICATION_EMAIL,
  MAILTRAP_SENDER,
} from "@/lib/mailtrap";
import {
  guestConfirmationEmail,
  guestRegretEmail,
  hostNotificationEmail,
  type GuestData,
} from "@/lib/email-templates";
import type { PresenceConfirmationState } from "@/lib/presence-confirmation-state";

async function sendConfirmationEmails(guest: GuestData) {
  const mailtrap = getMailtrapClient();
  if (!mailtrap) {
    console.warn("Mailtrap is not configured — skipping RSVP emails.");
    return;
  }

  const guestEmail = guest.attending
    ? guestConfirmationEmail(guest)
    : guestRegretEmail(guest);
  const hostEmail = hostNotificationEmail(guest);

  await Promise.all([
    mailtrap.send({
      from: MAILTRAP_SENDER,
      to: [{ email: guest.email, name: guest.fullName }],
      subject: guestEmail.subject,
      html: guestEmail.html,
      text: guestEmail.text,
    }),
    mailtrap.send({
      from: MAILTRAP_SENDER,
      to: [{ email: HOST_NOTIFICATION_EMAIL }],
      subject: hostEmail.subject,
      html: hostEmail.html,
      text: hostEmail.text,
    }),
  ]);
}

export async function submitPresenceConfirmation(
  _prevState: PresenceConfirmationState,
  formData: FormData,
): Promise<PresenceConfirmationState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const attending = formData.get("attending") === "yes";
  const adults = Number(formData.get("adults") ?? 0);
  const children = Number(formData.get("children") ?? 0);

  if (!fullName || !email) {
    return {
      status: "error",
      message: "Συμπληρώστε το ονοματεπώνυμο και το email σας.",
    };
  }

  const guest: GuestData = { fullName, attending, adults, children, email };

  try {
    const convex = getConvexClient();
    await convex.mutation(api.guests.create, guest);
  } catch (error) {
    console.error("Failed to save RSVP to Convex:", error);
    return {
      status: "error",
      message: "Κάτι πήγε στραβά κατά την αποστολή. Δοκιμάστε ξανά.",
    };
  }

  try {
    await sendConfirmationEmails(guest);
  } catch (error) {
    // The RSVP is already saved — a flaky email send shouldn't block the
    // guest from seeing a successful confirmation.
    console.error("Failed to send RSVP emails:", error);
  }

  return { status: "success", submittedAt: Date.now() };
}
