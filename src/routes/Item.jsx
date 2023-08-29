import { useLoaderData } from "react-router-dom";
import {
  getItemDetails,
  getCartItemDetails,
  handleCartDecrease,
  handleCartIncrease,
  handleAddItemToCart,
} from "../store";
import { useState } from "react";
import { Link } from "react-router-dom";

export function loader({ params }) {
  let item = getItemDetails(params.itemId);
  if (!item) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const cartItem = getCartItemDetails(params.itemId);
  let count = cartItem ? cartItem.count : 0;
  item.count = count;
  //or maybe throw the error here if item does not exist
  return item;
}

export function ItemDetail() {
  const item = useLoaderData();

  // console.log(item.count)

  const [count, setCount] = useState(item.count);

  function handleAddToCart(id, title, price, img) {
    handleAddItemToCart(id, title, price, img);
    setCount((val) => val + 1);
  }

  function handleDecrease(id, cnt) {
    handleCartDecrease(id, cnt);
    setCount((val) => val - 1);
  }

  function handleIncrease(id) {
    handleCartIncrease(id);
    setCount((val) => val + 1);
  }

  return (
    <div className="itemElement">
      <div className="itemImage">
        <img src={item.image} alt="" />
      </div>
      <div className="itemAbout">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p>Item price : ${item.price}</p>
        <p>Item rating/reviews: {item.rating.rate}</p>
        <p>Reviews count: {item.rating.count} </p>
        {count > 0 && (
          <div className="itemButtons">
            <button onClick={() => handleDecrease(item.id, count)}>-</button>
            <p>{count}</p>
            <button onClick={() => handleIncrease(item.id, count)}>+</button>
            <Link to={`/shop/checkout/cart`}>
              <button>Checkout Cart</button>
            </Link>
          </div>
        )}
        {count == 0 && (
          <button
            onClick={() =>
              handleAddToCart(item.id, item.title, item.price, item.image)
            }
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
