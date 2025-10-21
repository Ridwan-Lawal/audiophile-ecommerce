import {
  getAccountUserById,
  getUserById,
} from "@/src/app/_lib/services/auth/auth-service";
import { createClient } from "@/src/app/_lib/supabase/server";
import { authConfig } from "@/src/authConfig";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      isAccountByOAuth: boolean;
      isTwoFactorEnabled: boolean;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/login" },
  events: {
    async linkAccount({ user }) {
      const supabase = await createClient();
      if (user?.id) {
        await supabase
          .from("users")
          .update({ emailVerified: new Date().toISOString() })
          .eq("id", user?.id);
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
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

      if (session?.user && token) {
        session.user.isAccountByOAuth = token.isAccountByOAuth as boolean;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      return session;
    },
    async jwt({ token, trigger, account }) {
      if (trigger === "signIn" && account) {
        const isAccountByOAuth = await getAccountUserById(token.sub!);
        token.isAccountByOAuth = !!isAccountByOAuth;
      }

      if (token?.sub) {
        const existingUser = await getUserById(token?.sub);
        token.isTwoFactorEnabled = existingUser?.isTwoFactorEnabled;
      }

      return token;
    },
  },
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: { strategy: "jwt" },
  trustHost: true,
  ...authConfig,
});
