import ResetPassword from "@/src/app/_components/auth/ResetPassword";

export default function page() {
  return (
    <div className="">
      <div className="text-center">
        <h5 className="uppercase">Reset your password </h5>
        <p className="text-almost-black">
          Choose a new password to secure your account.
        </p>
      </div>
      <ResetPassword />
    </div>
  );
}
