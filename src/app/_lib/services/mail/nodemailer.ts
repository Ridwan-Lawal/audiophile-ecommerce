import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_APP_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

try {
  await transporter.verify();

  if (process.env.NODE_ENV === "development") {
    console.log("Email transporter is ready to send emails");
  }
} catch (err) {
  if (process.env.NODE_ENV === "development") {
    console.error("Error setting up email transporter:", err);
  }
}

export async function sendEmail(
  from: string,
  to: string,
  subject: string,
  html: string,
) {
  try {
    const info = await transporter.sendMail({
      from: `"Audiophile Support Team" <${from}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error sending email:", error);
    }
  }
}
