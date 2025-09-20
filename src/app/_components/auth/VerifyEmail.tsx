"use client";

import { verifyEmailAction } from "@/src/app/_lib/actions/auth/verify-email";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

export default function VerifyEmail() {
  const [isVerifyingEmail, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenFromUrl = searchParams.get("tkn");
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    setEmailVerified(false);
    if (tokenFromUrl) {
      startTransition(async () => {
        const res = await verifyEmailAction(tokenFromUrl);

        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          setEmailVerified(true);
          toast.success(res.success);
          router.push("/login");
        }
      });
    }
  }, [tokenFromUrl, router]);

  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-6">
      {isVerifyingEmail && (
        <>
          {" "}
          <SyncLoader size={10} />
          <h5>Verifying email</h5>
        </>
      )}
      {emailVerified && <h5>Email Verified!</h5>}
    </div>
  );
}
