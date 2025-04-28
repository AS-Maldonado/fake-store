import { Product } from "@/types/Product";
import {
  SfButton,
  SfRating,
  SfCounter,
  SfIconShoppingCart,
  SfIconFavorite,
} from "@storefront-ui/react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCardVertical({ product }: ProductCardProps) {
  return (
    <>
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <Image
            src={product.image}
            alt={product.title}
            className="object-contain px-2 pt-2 h-auto rounded-md aspect-square"
            width="300"
            height="300"
          />
          <SfButton
            variant="tertiary"
            size="sm"
            square
            className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
            aria-label="Add to wishlist"
          >
            <SfIconFavorite size="sm" />
          </SfButton>
        </div>
        <div className="p-4 border-t border-neutral-200">
          <span className="no-underline line-clamp-2 min-h-[50px]">
            {product.title}
          </span>
          <div className="flex items-center pt-1">
            <SfRating size="xs" value={5} max={5} />

            <SfCounter size="xs">{123}</SfCounter>
          </div>
          <span className="block pb-2 font-bold typography-text-lg">
            ${product.price}
          </span>
        </div>
      </Link>

      <div className="px-2 pt-2 pb-4 text-center">
        <SfButton size="base" slotPrefix={<SfIconShoppingCart size="sm" />}>
          Add to cart
        </SfButton>
      </div>
    </>
  );
}
