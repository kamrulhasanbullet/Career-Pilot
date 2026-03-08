// app/api/send-interview-email/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Generate a random Google Meet-style link ──────────────────────────────────
function generateMeetLink() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const rand = (n) =>
    Array.from(
      { length: n },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  return `https://meet.google.com/${rand(3)}-${rand(4)}-${rand(3)}`;
}

// ── Format date nicely ────────────────────────────────────────────────────────
function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export async function POST(req) {
  try {
    const {
      applicantEmail,
      applicantName,
      position,
      companyName,
      interviewDateTime,
    } = await req.json();

    if (!applicantEmail || !applicantName || !position || !interviewDateTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const meetLink = generateMeetLink();
    const formattedDate = formatDateTime(interviewDateTime);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: applicantEmail,
      subject: `🎉 Interview Invitation — ${position} at ${companyName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Interview Invitation</title>
</head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#13181f;border:1px solid rgba(99,102,241,0.25);border-radius:20px;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 100%);padding:40px 40px 36px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#a5b4fc;font-weight:700;">
                Interview Invitation
              </p>
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">
                You've been selected! 🎉
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:16px;color:#cbd5e1;line-height:1.6;">
                Dear <strong style="color:#ffffff;">${applicantName}</strong>,
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.7;">
                We're pleased to invite you for an interview for the
                <strong style="color:#a5b4fc;">${position}</strong> role at
                <strong style="color:#ffffff;">${companyName}</strong>.
                Please find your interview details below.
              </p>

              <!-- Info card -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#0d1117;border:1px solid rgba(99,102,241,0.2);border-radius:14px;margin-bottom:28px;">
                <tr>
                  <td style="padding:28px 30px;">

                    <!-- Position -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                      <tr>
                        <td style="width:40px;vertical-align:top;padding-top:2px;">
                          <div style="width:34px;height:34px;background:rgba(99,102,241,0.15);border-radius:8px;text-align:center;line-height:34px;font-size:16px;">💼</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="margin:0 0 2px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;">Position</p>
                          <p style="margin:0;font-size:15px;color:#e2e8f0;font-weight:600;">${position}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Date & Time -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                      <tr>
                        <td style="width:40px;vertical-align:top;padding-top:2px;">
                          <div style="width:34px;height:34px;background:rgba(99,102,241,0.15);border-radius:8px;text-align:center;line-height:34px;font-size:16px;">📅</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="margin:0 0 2px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;">Date &amp; Time</p>
                          <p style="margin:0;font-size:15px;color:#e2e8f0;font-weight:600;">${formattedDate}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Meet Link -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:40px;vertical-align:top;padding-top:2px;">
                          <div style="width:34px;height:34px;background:rgba(99,102,241,0.15);border-radius:8px;text-align:center;line-height:34px;font-size:16px;">🎥</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="margin:0 0 2px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;">Google Meet</p>
                          <a href="${meetLink}" style="color:#818cf8;font-size:14px;font-weight:600;text-decoration:none;word-break:break-all;">${meetLink}</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${meetLink}"
                      style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.5px;">
                      Join Google Meet →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
                Please ensure you join 5 minutes before the scheduled time. If you have any questions
                or need to reschedule, reply to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 30px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:12px;color:#374151;text-align:center;">
                Best of luck! — The <strong style="color:#6b7280;">${companyName}</strong> Hiring Team
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, meetLink });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email: " + err.message },
      { status: 500 },
    );
  }
}
