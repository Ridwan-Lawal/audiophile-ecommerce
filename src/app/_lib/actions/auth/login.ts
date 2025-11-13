"use server";

import { logFullErrorInDevMode } from "@/src/app/_lib/error-handling";
import { LoginSchema } from "@/src/app/_lib/schema/login";
import { getUserByEmail } from "@/src/app/_lib/services/auth/auth-service";
import { sendEmailVerificationMail } from "@/src/app/_lib/services/auth/mail-service";
import { generateEmailVerificationToken } from "@/src/app/_lib/services/auth/token-service";
import { LoginSchemaType } from "@/src/app/_types/auth/auth";
import { signIn, signOut } from "@/src/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

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
    const doesPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password!,
    );

    if (doesPasswordMatch && !existingUser?.emailVerified) {
      const emailVerificationToken =
        await generateEmailVerificationToken(email);

      if (emailVerificationToken) {
        await sendEmailVerificationMail(emailVerificationToken);

        return {
          error:
            "Your account hasn't been verified, Please check your email to verify your account.",
        };
      }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
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
