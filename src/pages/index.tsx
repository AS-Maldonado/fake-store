import { getProducts } from "@/api/fake-store-routes";
import { Product } from "@/interfaces/Product";
import ProductSliderBasic from "@/components/productSliderBasic";
import { GetStaticProps } from "next";

interface HomePageProps {
  products: Product[];
}

export default function Home({ products }: HomePageProps) {
  const productCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const productsByCategories = productCategories.map((category) => {
    return products.filter((product) => product.category === category);
  });

  return (
    <div>
      {productsByCategories.length > 0 &&
        productsByCategories
          .sort((a, b) => b.length - a.length)
          .map((products, i) => (
            <div key={products[i].category}>
              <h1 className="uppercase font-bold">{products[i].category}</h1>
              <ProductSliderBasic products={products} />
            </div>
          ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const products = await getProducts();
    return {
      props: {
        products,
      },
      revalidate: 60 * 60, // 1 hora
    };
  } catch (e) {
    console.error("ERRO:", e);
    return {
      props: { products: [] },
    };
  }
};
