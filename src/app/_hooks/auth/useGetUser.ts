import { useSession } from "next-auth/react";

export function useGetUser() {
  const { data, update } = useSession();

  return { user: data?.user, update };
}
