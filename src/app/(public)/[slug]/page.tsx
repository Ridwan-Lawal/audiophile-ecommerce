import ProductDetails from "@/src/app/_components/product/ProductDetails";
import { getProduct } from "@/src/app/_lib/services/products/product";
import { Metadata } from "next";
import { Suspense } from "react";

interface ProductDetailsProp {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailsProp): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  return { title: product?.name };
}

// export function generateStaticParams() {}

export default async function Page({ params }: ProductDetailsProp) {
  const { slug } = await params;

  // create the product component
  return (
    <div className="px-4 py-6">
      <Suspense fallback={<div>Loading...</div>} key={slug}>
        <ProductDetails slug={slug} />
      </Suspense>
    </div>
  );
}
