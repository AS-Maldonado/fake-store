import { getProductById, getRelatedProducts } from "@/api/fake-store-routes";
import { Product } from "@/interfaces/Product";
import {
  SfButton,
  SfIconArrowBack,
  SfIconFavorite,
  SfIconPackage,
  SfIconSafetyCheck,
  SfIconShoppingCart,
  SfLink,
  SfRating,
} from "@storefront-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import ProductSliderBasic from "@/components/productSliderBasic";
import ProductTabs from "@/components/productTabs";
import { Tab } from "@/interfaces/Tab";
import { useGlobalContext } from "@/context/globalContext";

interface ProductProps {
  product: Product | null;
  relatedProducts: Product[];
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function ProductPage({
  product,
  relatedProducts,
}: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useGlobalContext();

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p>Product not found</p>
        <Link href="/" passHref legacyBehavior>
          <SfLink className="mt-4 inline-flex items-center">
            <SfIconArrowBack className="mr-2" />
            Back to home
          </SfLink>
        </Link>
      </div>
    );
  }

  const tabs: Tab[] = [
    { label: "Description", content: product.description },
    { label: "Reviews", content: "" },
    { label: "Support", content: "" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" passHref legacyBehavior>
          <SfLink className="flex items-center text-neutral-500 hover:text-primary-700">
            <SfIconArrowBack className="mr-2" />
          </SfLink>
        </Link>
      </div>

      <div className="md:flex gap-8">
        <div className="md:w-1/2">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-auto object-contain aspect-square"
              priority
            />
          </div>
        </div>

        <div className="md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center mb-4">
            <SfRating value={product.rating?.rate || 0} max={5} size="lg" />
            <span className="ml-2 text-neutral-500">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold mb-6">${product.price}</div>
          <div className="flex gap-4 mb-8">
            <div className="flex items-center border rounded-md">
              <SfButton
                variant="tertiary"
                square
                className="!px-4"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </SfButton>
              <span className="px-4">{quantity}</span>
              <SfButton
                variant="tertiary"
                square
                className="!px-4"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </SfButton>
            </div>
            <SfButton
              size="lg"
              className="flex-1"
              slotPrefix={<SfIconShoppingCart size="lg" />}
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </SfButton>
            <SfButton size="lg" variant="tertiary" square>
              <SfIconFavorite size="lg" />
            </SfButton>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <div className="flex items-start gap-4 mb-4">
              <SfIconPackage className="mt-1 text-neutral-500" />
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-neutral-500">
                  Delivery in 2-5 business days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <SfIconSafetyCheck className="mt-1 text-neutral-500" />
              <div>
                <h3 className="font-medium">1-Year Warranty</h3>
                <p className="text-sm text-neutral-500">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs tabs={tabs} />

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            You may also like
          </h2>
          <ProductSliderBasic products={relatedProducts} />
        </div>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ProductProps, Params> = async ({
  params,
}) => {
  if (!params || !params.id) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  try {
    const product = await getProductById(id);
    const relatedProducts = await getRelatedProducts(id);

    return {
      props: {
        product,
        relatedProducts: relatedProducts || [],
      },
      revalidate: 60 * 60, // 1 Hora
    };
  } catch (e) {
    console.error("ERROR WHILE FETCHING PRODUCT: ", e);
    return {
      props: {
        product: null,
        relatedProducts: [],
      },
      revalidate: 60 * 60, // 1 hora
    };
  }
};
