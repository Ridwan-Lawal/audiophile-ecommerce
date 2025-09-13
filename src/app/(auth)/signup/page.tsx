import Signup from "@/src/app/_components/auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function page() {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h5 className="uppercase">Create your account </h5>
        <p className="text-almost-black">
          Sign up to purchase audio products and boost your productivity
        </p>
      </div>

      <Signup />
    </div>
  );
}
