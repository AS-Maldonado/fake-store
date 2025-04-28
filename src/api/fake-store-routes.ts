import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Product } from "@/types/Product";

export async function getProducts(): Promise<Product[]> {
  const response: AxiosResponse<Product[]> = await api.get("/products");
  const products = response.data;
  return products;
}

export async function getProductById(id: string): Promise<Product> {
  const response: AxiosResponse<Product> = await api.get(`/products/${id}`);
  const product = response.data;
  return product;
}

export async function getRelatedProducts(id: string): Promise<Product[]> {
  let response = await api.get("/products");
  const products = response.data;

  response = await api.get(`/products/${id}`);
  const product = response.data;

  const relatedProducts = products.filter(
    (p: Product) => p.category === product.category && p.id !== Number(id)
  );

  return relatedProducts;
}
