import Login from "@/src/app/_components/auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function page() {
  return (
    <div className="w-full space-y-5">
      <div className="text-center">
        <h5 className="uppercase">Welcome </h5>
        <p className="text-almost-black">Please log in to continue.</p>
      </div>

      <Login />
    </div>
  );
}
