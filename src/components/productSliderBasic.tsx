import { Product } from "@/types/Product";
import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfScrollable,
} from "@storefront-ui/react";
import classNames from "classnames";
import ProductCardVertical from "./productCardVertical";

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
          <ProductCardVertical product={product} />
        </div>
      ))}
    </SfScrollable>
  );
}
