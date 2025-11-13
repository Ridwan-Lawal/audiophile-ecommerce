import { getUser } from "@/src/app/_lib/utils";
import { redirect } from "next/navigation";

import orderConfirmationEmail from "@/src/app/_components/orderhistory/OrderConfirmationEmail";
import { OrderHistory } from "@/src/app/_lib/supabase/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transportOptions: SMTPTransport.Options = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_APP_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transportOptions);

export async function sendOrderConfirmation(
  emailTo: string,
  orderData: OrderHistory | undefined,
) {
  const user = await getUser();
  if (!user?.id) redirect("/login");

  const orderId = orderData?.id?.slice(0, 5).toUpperCase();

  try {
    const message = await transporter.sendMail({
      from: "Audiophile <lawalridwan860@gmail.com>",
      to: emailTo,
      subject: `Order Confirmation #${orderId} - Audiophile`,
      text: `Thank you for your order #${orderId}. Your order has been confirmed and will be shipped soon.`,
      html: orderConfirmationEmail(orderData),
    });

    return { success: "Order confirmation email sent" };
  } catch (error) {
    if (error instanceof Error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }

    return { error: "Failed to send confirmation email" };
  }
}
