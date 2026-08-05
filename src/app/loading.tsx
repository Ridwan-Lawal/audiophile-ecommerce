import logo from "@/public/assets/shared/desktop/logo-dark.svg";
import Image from "next/image";
function Spinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="spinner-container relative h-[150px] w-[150px]">
        <Image src={logo} alt="logo" fill className="object-contain" />
      </div>
    </div>
  );
}
export default Spinner;
