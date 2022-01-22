import { useRecoilValue } from "recoil";
import { cartState } from "../atoms/CartAtom";
import Link from "next/link";

function ShoppingCart() {
  // const cartValue = useRecoilValue(cartState);
  var cartValue;
  if (typeof window !== "undefined") {
    if (JSON.parse(window.localStorage.getItem("cart")) !== null) {
      cartValue = JSON.parse(window.localStorage.getItem("cart")).length;
    } else {
      cartValue = 0;
    }
  }
  return (
    <Link href="/checkout">
      <span className="relative cursor-pointer mr-5">
        <svg
          className="w-6 h-6 lg:w-7 lg:h-7"
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
            clipRule="evenodd"
          />
        </svg>
        <div
          suppressHydrationWarning
          className="rounded-full absolute text-white left-6 bottom-3  text-center font-semibold lg:w-[20px] lg:h-[20px] lg:bg-red-500 lg:left-7 lg:bottom-4"
        >
          {cartValue}
        </div>
      </span>
    </Link>
  );
}

export function HomeIcon() {
  return (
    <Link href="/">
      <svg
        className="w-6 h-6"
        fill="white"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    </Link>
  );
}

export default ShoppingCart;
