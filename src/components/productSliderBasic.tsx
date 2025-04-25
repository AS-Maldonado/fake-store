import { Product } from "@/types/Product";
import {
  SfLink,
  SfButton,
  SfIconFavorite,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfScrollable,
} from "@storefront-ui/react";
import classNames from "classnames";
import Image from "next/image";

interface ProducSliderBasicProps {
  products: Product[];
}

function ButtonPrev({ disabled, ...attributes }: { disabled?: boolean }) {
  return (
    <SfButton
      className={classNames(
        "absolute !rounded-full z-10 left-4 bg-white hidden md:block",
        {
          "!hidden": disabled,
        }
      )}
      variant="secondary"
      size="lg"
      square
      {...attributes}
    >
      <SfIconChevronLeft />
    </SfButton>
  );
}

function ButtonNext({ disabled, ...attributes }: { disabled?: boolean }) {
  return (
    <SfButton
      className={classNames(
        "absolute !rounded-full z-10 right-4 bg-white hidden md:block",
        {
          "!hidden": disabled,
        }
      )}
      variant="secondary"
      size="lg"
      square
      {...attributes}
    >
      <SfIconChevronRight />
    </SfButton>
  );
}

export default function ProductSliderBasic({
  products,
}: ProducSliderBasicProps) {
  return (
    <SfScrollable
      className="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      buttons-placement="floating"
      drag
      slotPreviousButton={<ButtonPrev />}
      slotNextButton={<ButtonNext />}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="last:me-auto ring-1 ring-inset ring-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]"
        >
          <div className="relative">
            <SfLink href="#" className="block">
              <Image
                src={product.image}
                alt={product.image}
                className="block object-cover h-auto rounded-md aspect-square lg:w-[190px] lg:h-[190px]"
                width="146"
                height="146"
              />
            </SfLink>
            <SfButton
              variant="tertiary"
              size="sm"
              square
              className="absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full"
              aria-label="Add to wishlist"
            >
              <SfIconFavorite size="sm" />
            </SfButton>
          </div>
          <div className="p-2 border-t border-neutral-200 typography-text-sm">
            <SfLink
              href="#"
              variant="secondary"
              className="no-underline line-clamp-1"
            >
              {product.title}
            </SfLink>
            <span className="block mt-2 font-bold">$ {product.price}</span>
          </div>
        </div>
      ))}
    </SfScrollable>
  );
}
