import { useEffect, useState } from "react";
import {
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
  SfInput,
  SfIconSearch,
  SfIconMenu,
} from "@storefront-ui/react";
import { useGlobalContext } from "@/context/globalContext";
import Link from "next/link";

export default function Header() {
  const { cart } = useGlobalContext();

  const [inputValue, setInputValue] = useState("");
  const [totalCartQuantity, setCartTotalQuantity] = useState(0);

  useEffect(() => {
    const quantity = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

    setCartTotalQuantity(quantity);
  }, [cart, setCartTotalQuantity]);

  const actionItems = [
    {
      icon: <SfIconShoppingCart />,
      label: "",
      ariaLabel: "Cart",
      role: "button",
    },
    {
      icon: <SfIconFavorite />,
      label: "",
      ariaLabel: "Wishlist",
      role: "button",
    },
  ];

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Successfully found 10 results for ${inputValue}`);
  };

  return (
    <header className="flex justify-around w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
      <div className="flex flex-wrap lg:flex-nowrap items-center flex-row justify-around h-full max-w-[1536px] w-full">
        <Link
          href="/"
          aria-label="SF Homepage"
          className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          <picture>
            <source
              srcSet="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo.svg"
              media="(min-width: 768px)"
            />
            <img
              src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign.svg"
              alt="Sf Logo"
              className="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
            />
          </picture>
        </Link>
        <SfButton
          aria-label="Open categories"
          className="lg:hidden order-first lg:order-1 mr-4"
          square
          variant="tertiary"
        >
          <SfIconMenu />
        </SfButton>

        <form
          role="search"
          className="flex w-[50%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
          onSubmit={search}
        >
          <SfInput
            value={inputValue}
            type="search"
            className="[&::-webkit-search-cancel-button]:appearance-none"
            placeholder="Search"
            wrapperClassName="flex-1 h-10 pr-0"
            size="base"
            slotSuffix={
              <span className="flex items-center">
                <SfButton
                  variant="tertiary"
                  square
                  aria-label="search"
                  type="submit"
                  className="rounded-l-none hover:bg-transparent active:bg-transparent"
                >
                  <SfIconSearch />
                </SfButton>
              </span>
            }
            onChange={(event) => setInputValue(event.target.value)}
          />
        </form>
        <nav className="flex justify-end lg:order-last lg:ml-4">
          <div className="flex flex-row flex-nowrap">
            {actionItems.map((actionItem) => (
              <SfButton
                key={actionItem.ariaLabel}
                className="relative mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
                aria-label={actionItem.ariaLabel}
                variant="tertiary"
                square
                slotPrefix={actionItem.icon}
              >
                {actionItem.ariaLabel === "Cart" && (
                  <span className="absolute top-0 right-[-5px] text-white rounded-full px-[5px] py-0 bg-[rgb(var(--colors-primary-700)/var(--tw-bg-opacity))] text-xs">
                    {totalCartQuantity}
                  </span>
                )}
              </SfButton>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
