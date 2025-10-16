import { useSession } from "next-auth/react";

export function useGetUser() {
  const { data } = useSession();

  return data?.user;
}
