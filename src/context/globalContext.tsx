import { CartItem } from "@/interfaces/CartItem";
import { Product } from "@/interfaces/Product";
import { createContext, ReactNode, useContext, useState } from "react";

interface GlobalContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product, quantity: number) => void;
  addToFavorites: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeFromFavorites: (product: Product) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  function addToCart(product: Product, quantity: number) {
    const isProductInCart = cart.find(
      (cartItem) => cartItem.product.id === product.id
    );

    if (isProductInCart) {
      const totalQuantity = isProductInCart.quantity + quantity;
      const filteredCart = cart.filter(
        (cartItem) => cartItem.product.id !== isProductInCart.product.id
      );

      filteredCart.push({ product, quantity: totalQuantity });

      setCart(filteredCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  }

  function removeFromCart(product: Product) {
    const cartWithoutSelectedProduct = cart.filter(
      (cartItem) => cartItem.product.id !== product.id
    );

    setCart(cartWithoutSelectedProduct);
  }

  function addToFavorites(product: Product) {
    const isProductInFavorites = favorites.find((p) => p.id === product.id);

    if (isProductInFavorites) {
      const filteredFavorites = favorites.filter(
        (p) => p.id !== isProductInFavorites.id
      );

      filteredFavorites.push(product);

      setFavorites(filteredFavorites);
    }
  }

  function removeFromFavorites(product: Product) {
    const favoritesWithoutSelectedProduct = favorites.filter(
      (p) => p.id !== product.id
    );

    setFavorites(favoritesWithoutSelectedProduct);
  }

  return (
    <GlobalContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const globalProvider = useContext(GlobalContext);

  if (!globalProvider)
    throw new Error("useGlobalProvider must be used inside a provider!");
  return globalProvider;
}
