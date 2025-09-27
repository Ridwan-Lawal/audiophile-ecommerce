import ForgotPassword from "@/src/app/_components/auth/ForgotPassword";

export default function Page() {
  return (
    <div>
      <div className="text-center">
        <h5 className="w-full text-[22px] uppercase">
          Forgotten your password?{" "}
        </h5>
        <p className="text-almost-black">
          Enter your email below and we&apos;ll send you a link to reset it.
        </p>
      </div>
      <ForgotPassword />
    </div>
  );
}
