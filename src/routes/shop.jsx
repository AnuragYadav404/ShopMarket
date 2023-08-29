import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getCategories, initializeCart, initializeCacheStore } from "../store";

export async function loader() {
  initializeCart();
  await initializeCacheStore();
  return getCategories();
}

export default function Shop() {
  const categories = useLoaderData();
  return (
    <>
      <div id="sidebar">
        {/* search for item using searchBar */}
        {/* filter items according to category */}
        <nav>
          <ul>
            {categories.map((category) => {
              return (
                <li key={category}>
                  <NavLink
                    to={`/shop/${category}`}
                    className={({ isActive, isPending }) => {
                      return isActive ? "active" : isPending ? "pending" : "";
                    }}
                  >
                    {category.toUpperCase()}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link to={`/shop/checkout/cart`}>
          <button>Checkout Cart</button>
        </Link>
      </div>
      <div id="details">
        <Outlet />
      </div>
    </>
  );
}
