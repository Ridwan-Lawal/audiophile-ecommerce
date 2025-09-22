"use server";

import { SignupSchema } from "@/src/app/_lib/schema/signup";
import { getUserByEmail } from "@/src/app/_lib/services/auth/auth-service";
import { sendEmailVerificationMail } from "@/src/app/_lib/services/auth/mail-service";
import { generateEmailVerificationToken } from "@/src/app/_lib/services/auth/token-service";
import { createClient } from "@/src/app/_lib/supabase/server";
import { SignupSchemaType } from "@/src/app/_types/auth/auth";
import bcrypt from "bcryptjs";
import * as z from "zod";

export async function signupAction(formData: SignupSchemaType) {
  const supabase = await createClient();
  const validatingFormData = SignupSchema.safeParse(formData);
  console.log("email now");

  if (!validatingFormData.success) {
    const error = z.treeifyError(validatingFormData.error).properties;
    const errorFields = Object.keys(error!);

    return {
      error: `Invalid form input for the ${errorFields.join(",")} field. `,
    };
  }

  const validatedFormData = validatingFormData?.data ?? {};

  const existingUser = await getUserByEmail(validatedFormData.email);

  if (existingUser) {
    return { error: "Email has already been registered" };
  }

  try {
    const hashedPassword = await bcrypt.hash(
      validatedFormData.confirmPassword,
      10,
    );

    const { error } = await supabase.from("users").insert({
      name: validatedFormData.name,
      password: hashedPassword,
      email: validatedFormData.email,
    });

    if (error) {
      throw error;
    }

    const emailVerificationToken = await generateEmailVerificationToken(
      validatedFormData.email,
    );

    if (emailVerificationToken) {
      await sendEmailVerificationMail(emailVerificationToken);
    }

    return {
      success:
        "Thanks for signing up! Please check your email to verify your account.",
    };
  } catch (error) {
    const err = error as Error;

    if (error) {
      if (process.env.NODE_ENV === "development") {
        throw new Error(err.message);
      }

      return { error: "An unexpected error occured, Please try again" };
    }
  }
}
