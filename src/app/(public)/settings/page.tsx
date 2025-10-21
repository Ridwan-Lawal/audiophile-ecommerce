import BackButton from "@/src/app/_components/product/BackButton";
import ChangePasswordForm from "@/src/app/_components/settings/ChangePasswordForm";
import TwoFactorControl from "@/src/app/_components/settings/TwoFactorControl";
import { auth } from "@/src/auth";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const session = await auth();
  return (
    <div className="bg-white-3 h-full space-y-8 border border-black px-6 pt-8 pb-14">
      <div className="mx-auto max-w-[1100px] space-y-8">
        <BackButton />

        {/* Change password */}

        <SessionProvider session={session}>
          <ChangePasswordForm />
        </SessionProvider>
        <SessionProvider session={session}>
          <TwoFactorControl />
        </SessionProvider>
      </div>
    </div>
  );
}
