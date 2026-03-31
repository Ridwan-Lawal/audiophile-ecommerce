import { sendEmail } from "@/src/app/_lib/services/mail/nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetMail(token: string, email: string) {
  const passwordResetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/resetpassword?tkn=${token}`;

  const html = `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f1f1; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f1f1; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #979797; overflow: hidden;">
          
          <tr>
            <td style="background-color: #101010; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">
                Audiophile
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #101010; margin-top: 0; margin-bottom: 20px; font-size: 22px;">
                Password Reset Request
              </h2>
              
              <p style="color: #101010; font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 30px;">
                We received a request to reset the password for your account. If you made this request, please click the button below to securely choose a new password:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <a href="${passwordResetUrl}" style="display: inline-block; background-color: #d87d4a; color: #ffffff; padding: 14px 32px; text-decoration: none; font-weight: bold; border-radius: 4px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #cd2c2c; font-size: 14px; text-align: center; margin-top: 0; margin-bottom: 30px; font-weight: bold;">
                This link will expire in 1 hour.
              </p>

              <p style="color: #101010; font-size: 15px; line-height: 1.6; margin-bottom: 0;">
                If you did not request a password reset, you can safely ignore this email. Your password and account will remain secure.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #fafafa; padding: 24px 30px; text-align: center; border-top: 1px solid #979797;">
              <p style="color: #979797; font-size: 12px; margin: 0; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} Your Store Name. All rights reserved.<br>
                Need help? Contact our support team.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: "lawalridwan860@gmail.com",
  //   subject: "Reset password - Audiophile",
  //   react: PasswordResetTemp({ brandName: "Audiophile", passwordResetUrl }),
  // });

  await sendEmail(
    process.env.EMAIL_APP_USER!,
    email,
    "Reset password - Audiophile",
    html,
  );
}

export async function sendEmailVerificationMail(token: string, email: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verifyemail?tkn=${token}`;

  const html = `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f1f1; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f1f1; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #979797; overflow: hidden;">
          
          <tr>
            <td style="background-color: #101010; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">
               Audiophile
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #101010; margin-top: 0; margin-bottom: 20px; font-size: 22px;">
                Welcome to the club!
              </h2>
              
              <p style="color: #101010; font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 30px;">
                Thanks for creating an account. Before you can start shopping and tracking your orders, we just need to verify your email address. Please click the button below to complete your registration:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <a href="${verificationUrl}" style="display: inline-block; background-color: #d87d4a; color: #ffffff; padding: 14px 32px; text-decoration: none; font-weight: bold; border-radius: 4px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #101010; font-size: 14px; line-height: 1.6; margin-bottom: 10px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin-top: 0; margin-bottom: 30px; word-break: break-all;">
                <a href="${verificationUrl}" style="color: #d87d4a; font-size: 14px;">
                  ${verificationUrl}
                </a>
              </p>

              <p style="color: #979797; font-size: 14px; line-height: 1.6; margin-bottom: 0;">
                If you did not create an account using this email address, please safely ignore and delete this email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #fafafa; padding: 24px 30px; text-align: center; border-top: 1px solid #979797;">
              <p style="color: #979797; font-size: 12px; margin: 0; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} Audiophile. All rights reserved.<br>
                Need help? Contact our support team.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  try {
    await sendEmail(
      process.env.EMAIL_APP_USER!,
      email,
      "Verify your email address - Audiophile",
      html,
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error sending verification email:", error);
    }

    throw new Error("Error sending verification email");
  }
}
