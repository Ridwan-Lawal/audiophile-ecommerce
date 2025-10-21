"use client";

import { Switch } from "@/components/ui/switch";
import { useGetUser } from "@/src/app/_hooks/auth/useGetUser";
import { updateTwoFactorOption } from "@/src/app/_lib/actions/auth/two-factor";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TwoFactorControl() {
  const { user, update } = useGetUser();
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(
    user?.isTwoFactorEnabled ?? false,
  );

  const toggleTwoFactorControl = async () => {
    const updatedState = !isTwoFactorEnabled;
    setIsTwoFactorEnabled(updatedState);
    const res = await updateTwoFactorOption(updatedState);
    if (res.error) {
      toast.error(res.error);
    }
    if (res.success) {
      update({ isTwoFactorEnabled: updatedState });
    }
  };

  console.log(isTwoFactorEnabled);

  return (
    <div className="mx-auto max-w-[1100px] rounded-md bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <p className="uppercase">Two factor authentication</p>
        <Switch onClick={toggleTwoFactorControl} checked={isTwoFactorEnabled} />
      </div>
    </div>
  );
}
