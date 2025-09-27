import Headphone from "@/src/app/_components/headphones/Headphone";
import { getCategoryProducts } from "@/src/app/_lib/services/products/category-products";

export default async function Headphones() {
  const headphones = await getCategoryProducts("headphones");

  return (
    <div className="mt-28 flex flex-col gap-28">
      {/* first product */}
      {headphones.map((headphone) => (
        <Headphone headphone={headphone} key={headphone?.id} />
      ))}
    </div>
  );
}
