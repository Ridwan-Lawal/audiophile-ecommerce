import { getUserById } from "@/src/app/_lib/services/auth/auth-service";
import { authConfig } from "@/src/authConfig";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user }) {
      console.log("signin callback");
      const existingUser = await getUserById(user.id as string);

      console.log(existingUser?.emailVerified, "1");

      if (!existingUser?.emailVerified) {
        console.log(existingUser?.emailVerified, "2");
        return false;
      }

      return true;
    },
    session({ token, session }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
    jwt({ token }) {
      return token;
    },
  },
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  }),
  session: { strategy: "jwt" },
  ...authConfig,
});
