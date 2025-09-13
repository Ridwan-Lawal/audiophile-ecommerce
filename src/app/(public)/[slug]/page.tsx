interface ProductDetailsProp {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailsProp) {
  const { slug } = await params;
}

// export function generateStaticParams() {}

export default async function Page({ params }: ProductDetailsProp) {
  const { slug } = await params;

  return <div>Product details. Slug: {slug}</div>;
}
