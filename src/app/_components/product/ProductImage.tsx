import { blurDataUrl } from "@/src/app/_lib/blurdataurl";
import Image from "next/image";

export default function ProductImage({
  src,
  alt,
  className,
}: {
  src: string | undefined;
  alt: string;
  className: string;
}) {
  return (
    <Image
      src={src as string}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      quality={100}
      placeholder="blur"
      blurDataURL={blurDataUrl}
    />
  );
}
