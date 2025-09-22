import EmailVerificationTemp from "@/src/app/_components/templates/EmailVerificationTemp";
import PasswordResetTemp from "@/src/app/_components/templates/PasswordResetTemp";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetMail(token: string) {
  const passwordResetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/resetpassword?tkn=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lawalridwan860@gmail.com",
    subject: "Reset password - Audiophile",
    react: PasswordResetTemp({ brandName: "Audiophile", passwordResetUrl }),
  });
}

export async function sendEmailVerificationMail(token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verifyemail?tkn=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lawalridwan860@gmail.com",
    subject: "Verify email - Audiophile",
    react: EmailVerificationTemp({ brandName: "Audiophile", verificationUrl }),
  });
}
