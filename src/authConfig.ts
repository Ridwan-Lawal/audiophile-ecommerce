import { LoginSchema } from "@/src/app/_lib/schema/login";
import { getUserByEmail } from "@/src/app/_lib/services/auth/auth-service";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatingData = LoginSchema.safeParse(credentials);

        if (!validatingData.success) {
          return null;
        }

        const { email, password } = validatingData?.data ?? {};

        const existingUser = await getUserByEmail(email);
        if (!existingUser || !existingUser.password) return null;

        const doesPasswordMatch = await bcrypt.compare(
          password,
          existingUser.password,
        );

        if (!doesPasswordMatch) return null;

        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
