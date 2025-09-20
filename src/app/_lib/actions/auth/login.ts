"use server";

import { LoginSchema } from "@/src/app/_lib/schema/login";
import { getUserByEmail } from "@/src/app/_lib/services/auth/auth-service";
import { sendEmailVerificationMail } from "@/src/app/_lib/services/auth/mail-service";
import { generateEmailVerificationToken } from "@/src/app/_lib/services/auth/token-service";
import { logFullErrorInDevMode } from "@/src/app/_lib/utils";
import { LoginSchemaType } from "@/src/app/_types/auth/auth";
import { signIn } from "@/src/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";

export async function loginAction(data: LoginSchemaType) {
  //This is to validate data serverly
  const validatingData = LoginSchema.safeParse(data);

  if (!validatingData.success) {
    const formErrors = z.treeifyError(validatingData.error).properties;
    const formErrorInputKeys = Object.keys(formErrors!);

    return {
      error: `Invalid form input for the ${formErrorInputKeys.join(", ")} field. Check the fields and try submitting again`,
    };
  }

  const { email, password } = validatingData?.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    console.log("email ver 1");
    const doesPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (doesPasswordMatch && !existingUser?.emailVerified) {
      console.log("email ver 2");
      const emailVerificationToken =
        await generateEmailVerificationToken(email);

      if (emailVerificationToken) {
        console.log("email ver 3");
        await sendEmailVerificationMail(emailVerificationToken);

        return {
          error:
            "Your account hasn't been verified, Please check your email to verify your account.",
        };
      }
    }
  }

  console.log("email ver 4");

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("email ver 6");

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("email ver 7");

      if (process.env.NODE_ENV === "development") {
        logFullErrorInDevMode(error);
      }

      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password, try again" };

        default:
          return { error: "Something went wrong, try again" };
      }
    }

    throw error;
  }
}
