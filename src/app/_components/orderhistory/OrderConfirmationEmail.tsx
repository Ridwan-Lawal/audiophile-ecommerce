import { CartDataType } from "@/src/app/_lib/schema/cart-shema";
import { OrderHistory } from "@/src/app/_lib/supabase/server";

export default function orderConfirmationEmail(
  orderData: OrderHistory | undefined,
) {
  const orderedItems = orderData?.ordered_items as CartDataType;

  const totalPrice = orderedItems?.reduce(
    (acc, cur) => acc * (cur.price * cur.quantity),
    0,
  );

  const shipping = 50;

  const grandTotal = totalPrice + shipping;

  function generateItemRows(items: CartDataType) {
    return items
      .map(
        (item) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea;">
        ${item.name} (x${item.quantity})
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; text-align: right;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `,
      )
      .join("");
  }

  const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    /* Basic reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
  </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background-color: #f4f4f4;">

  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Thank you for your order! We're getting it ready.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td bgcolor="#d87d4a" align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
              <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 32px; font-weight: bold; margin: 0;">Audiophile</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 4px;">
          <tr>
            <td align="left" style="padding: 40px 40px 20px 40px; font-family: Arial, sans-serif; font-size: 18px; line-height: 25px;">
              <h2 style="font-size: 24px; font-weight: bold; margin: 0; color: #333333;">Thanks for your order!</h2>
            </td>
          </tr>
          
          <tr>
            <td align="left" style="padding: 0px 40px 20px 40px; font-family: Arial, sans-serif; font-size: 16px; line-height: 25px; color: #666666;">
              <p style="margin: 0;">Hi [Customer Name],<br><br>Your order has been confirmed and we're getting it ready. We'll let you know as soon as it's on its way.</p>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding: 0px 40px 20px 40px;">
              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td colspan="2" style="font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; color: #333333; padding-bottom: 10px; border-bottom: 2px solid #eaeaea;">
                    Order Summary
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="font-family: Arial, sans-serif; font-size: 16px; color: #666666; padding-top: 10px;">
                    Order #: <strong>[Order Number]</strong>
                  </td>
                </tr>
                
                [Order Items]

                <tr>
                  <td style="padding: 20px 0 0 0; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #333333;">
                    shipping
                  </td>
                  <td style="padding: 20px 0 0 0; text-align: right; font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; color: #333333;">
                    $[shipping]
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 0 0; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #333333;">
                    Total
                  </td>
                  <td style="padding: 20px 0 0 0; text-align: right; font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; color: #333333;">
                    $[Total Price]
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 0 0; font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; color: #333333;">
                    Total
                  </td>
                  <td style="padding: 20px 0 0 0; text-align: right; font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; color: #333333;">
                    $[grand total]
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 20px 40px 40px 40px;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 5px;" bgcolor="#d87d4a">
                    <a href="[Your Order Status URL]" target="_blank" style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; padding: 15px 30px; border: 1px solid #d87d4a; display: inline-block;">
                      View Order Status
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 20px 10px 20px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" style="padding: 0px 20px 0px 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #888888;">
              <p style="margin: 0;">Questions? Contact us at <a href="mailto:[your-support-email@example.com]" style="color: #d87d4a; text-decoration: none;">orders@audiophile.com</a></p>
              <p style="margin: 10px 0 0 0;">&copy; [20XX] [Your Store Name]. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  if (orderData) {
    return emailHtml
      .replace("[Customer Name]", orderData.name!)
      .replace("[Order Number]", orderData?.id.slice(0, 5).toUpperCase())
      .replace("[Order Items]", generateItemRows(orderedItems)) // Use the function here
      .replace("[Total Price]", totalPrice.toFixed(2))
      .replace("[shipping]", shipping.toFixed(2))
      .replace("[grand total]", grandTotal.toFixed(2))
      .replace("[Your Store Name]", "Audiophile")
      .replace("[20XX]", new Date().getFullYear().toString());
  }
}
