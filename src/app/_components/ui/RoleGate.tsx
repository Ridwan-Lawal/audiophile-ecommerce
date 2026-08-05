import { PropsWithChildren } from "react";

interface RoleGateType extends PropsWithChildren {
  isSignedIn: boolean;
}

export default function RoleGate({ children, isSignedIn }: RoleGateType) {
  if (isSignedIn) {
    return children;
  }
}
