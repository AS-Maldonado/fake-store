import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Product } from "@/types/Product";

export async function getProducts(): Promise<Product[]> {
  const response: AxiosResponse<Product[]> = await api.get("/products");
  const products = response.data;
  return products;
}
