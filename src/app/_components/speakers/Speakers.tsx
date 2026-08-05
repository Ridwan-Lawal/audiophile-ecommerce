import Speaker from "@/src/app/_components/speakers/Speaker";
import { getCategoryProducts } from "@/src/app/_lib/services/products/category-products";

export default async function Speakers() {
  const speakers = await getCategoryProducts("speakers");

  return (
    <div className="mt-28 flex flex-col gap-28">
      {/* first product */}
      {speakers.map((speaker, idx) => (
        <Speaker speaker={speaker} key={idx} />
      ))}
    </div>
  );
}
