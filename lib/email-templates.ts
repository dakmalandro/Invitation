const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://georgearabas.org"
).replace(/\/$/, "");

const COLORS = {
  background: "#cdb99f",
  card: "#ede1cf",
  text: "#4a3f33",
  muted: "#7a6b58",
  accent: "#a37b4c",
};

export type GuestData = {
  fullName: string;
  attending: boolean;
  adults: number;
  children: number;
  email: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildGuestEmail({
  fullName,
  subject,
  paragraphs,
  closingLine,
  signatureEmoji,
}: {
  fullName: string;
  subject: string;
  paragraphs: string[];
  closingLine: string;
  signatureEmoji: string;
}) {
  const name = escapeHtml(fullName);

  const html = `<!doctype html>
<html lang="el">
  <body style="margin:0;padding:32px 16px;background:${COLORS.background};font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:420px;background:${COLORS.card};border-radius:20px;overflow:hidden;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:40px 32px 8px;text-align:center;">
                <div style="font-size:32px;line-height:1;">👨‍🍳</div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 0;text-align:center;">
                <div style="font-family:'Brush Script MT','Segoe Script',cursive;font-size:40px;color:${COLORS.text};">Ευχαριστούμε!</div>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 32px 0;text-align:center;">
                <div style="font-size:15px;font-weight:600;letter-spacing:0.04em;color:${COLORS.accent};">${name}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;text-align:center;">
                <span style="font-size:14px;color:${COLORS.accent};">♡</span>
              </td>
            </tr>
            ${paragraphs
              .map(
                (paragraph) => `<tr>
              <td style="padding:16px 40px 0;text-align:center;font-size:14px;line-height:1.7;color:${COLORS.text};">
                ${paragraph}
              </td>
            </tr>`,
              )
              .join("")}
            <tr>
              <td style="padding:28px 32px 0;text-align:center;">
                <div style="font-family:'Brush Script MT','Segoe Script',cursive;font-size:26px;color:${COLORS.accent};">${closingLine}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;text-align:center;">
                <span style="font-size:12px;letter-spacing:0.3em;color:${COLORS.accent};">┄┄┄┄ ♡ ┄┄┄┄</span>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;text-align:center;font-size:14px;color:${COLORS.text};">
                Με αγάπη,
              </td>
            </tr>
            <tr>
              <td style="padding:2px 32px 0;text-align:center;">
                <span style="font-family:'Brush Script MT','Segoe Script',cursive;font-size:30px;color:${COLORS.text};">George</span>
                <span style="font-size:20px;">${signatureEmoji}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 0;text-align:center;font-size:13px;color:${COLORS.muted};">
                &amp; οι γονείς του<br />
                Δάκης &amp; Γεωργία
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 32px;text-align:center;">
                <span style="font-size:12px;letter-spacing:0.3em;color:${COLORS.accent};">┄┄┄┄ ♡ ┄┄┄┄</span>
              </td>
            </tr>
            <tr>
              <td>
                <img src="${SITE_URL}/bye2.png" alt="" width="420" style="display:block;width:100%;height:auto;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `Ευχαριστούμε, ${fullName}!

${paragraphs.join("\n")}

${closingLine}

Με αγάπη,
George ${signatureEmoji}
& οι γονείς του
Δάκης & Γεωργία`;

  return { subject, html, text };
}

export function guestConfirmationEmail({ fullName }: Pick<GuestData, "fullName">) {
  return buildGuestEmail({
    fullName,
    subject: "Ευχαριστούμε για την επιβεβαίωση παρουσίας! 🤍",
    paragraphs: [
      "Η απάντησή σας μας γέμισε χαρά!",
      "Σας ευχαριστούμε που αποδεχθήκατε την πρόσκλησή μας και θα είστε μαζί μας στη βάφτιση του μικρού μας.",
      "Ανυπομονούμε να σας υποδεχθούμε σε μια ημέρα γεμάτη αγάπη, όμορφες στιγμές και... αρώματα από το αγαπημένο μας bakery!",
    ],
    closingLine: "Ραντεβού στη γιορτή μας!",
    signatureEmoji: "🥖",
  });
}

export function guestRegretEmail({ fullName }: Pick<GuestData, "fullName">) {
  return buildGuestEmail({
    fullName,
    subject: "Ευχαριστούμε για την ενημέρωση! 🤍",
    paragraphs: [
      "Λυπούμαστε που δεν θα μπορέσετε να μοιραστείτε μαζί μας αυτή τη γλυκιά στιγμή.",
      "Σας ευχαριστούμε που μας ενημερώσατε και για τις όμορφες ευχές σας. Η αγάπη σας είναι πάντα το πιο πολύτιμο συστατικό της ημέρας μας.",
      "Ευχόμαστε να ανταμώσουμε πολύ σύντομα, σε μια άλλη όμορφη περίσταση.",
    ],
    closingLine: "Σας ευχαριστούμε ΑΠΟ ΚΑΡΔΙΑΣ!",
    signatureEmoji: "🥄",
  });
}

export function hostNotificationEmail(guest: GuestData) {
  const subject = "Καλεσμένος";
  const attendingLabel = guest.attending ? "Ναι" : "Όχι";

  const rows: [string, string][] = [
    ["Ονοματεπώνυμο", guest.fullName],
    ["Θα παρευρεθεί", attendingLabel],
    ["Αριθμός ενηλίκων", String(guest.adults)],
    ["Αριθμός παιδιών", String(guest.children)],
    ["Email", guest.email],
  ];

  const html = `<!doctype html>
<html lang="el">
  <body style="margin:0;padding:24px;background:#f5f1ea;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:${COLORS.text};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5ddcf;">
      <tr>
        <td style="padding:24px 28px 8px;font-size:20px;font-weight:600;">Νέος καλεσμένος 🎉</td>
      </tr>
      <tr>
        <td style="padding:0 28px 20px;font-size:13px;color:${COLORS.muted};">Μόλις επιβεβαιώθηκε μια νέα παρουσία από τη φόρμα RSVP.</td>
      </tr>
      <tr>
        <td style="padding:0 28px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${rows
              .map(
                ([label, value]) => `<tr>
              <td style="padding:8px 0;border-top:1px solid #eee;font-size:13px;color:${COLORS.muted};width:45%;">${escapeHtml(label)}</td>
              <td style="padding:8px 0;border-top:1px solid #eee;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
            </tr>`,
              )
              .join("")}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return { subject, html, text };
}
