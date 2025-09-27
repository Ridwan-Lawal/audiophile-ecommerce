import Earphone from "@/src/app/_components/earphones/Earphone";
import { getCategoryProducts } from "@/src/app/_lib/services/products/category-products";

export default async function Earphones() {
  const earphones = await getCategoryProducts("earphones");

  console.log(earphones, "earphones");

  return (
    <div className="mt-28 flex flex-col gap-28">
      {/* first product */}
      {earphones?.map((earphone, idx) => (
        <Earphone earphone={earphone} key={idx} />
      ))}
    </div>
  );
}
