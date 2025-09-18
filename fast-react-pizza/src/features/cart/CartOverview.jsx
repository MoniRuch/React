import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCartQuantity, getCartTotalPrice } from "./cartSlice.js";

function CartOverview() {
  const cartQuantity = useSelector(getCartQuantity);

  const cartTotalPrice = useSelector(getCartTotalPrice);

  if (cartQuantity === 0) return;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{cartQuantity} pizzas</span>
        <span>${cartTotalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
