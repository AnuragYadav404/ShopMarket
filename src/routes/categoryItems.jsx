import { Link, useLoaderData, Form } from "react-router-dom";
import { getItemsByCategories } from "../store";
import { useState } from "react";

export async function loader(props) {
  const url = new URL(props.request.url);
  let q = url.searchParams.get("q");
  q = q ? q : "";
  const categoryItems = getItemsByCategories(props.params.category, q);
  return { items: categoryItems, q };
}

function Card({ title, image, rating }) {
  return (
    <div className="cards">
      <div className="cardsImg">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <h4>{title}</h4>
      <p>rating: {rating.rate}</p>
    </div>
  );
}

export function CategoryItems() {
  let { items, q } = useLoaderData();
  const [search, setSearch] = useState(q);

  return (
    <div className="itemsDisplay">
      <div className="searchItems">
        <Form id="search-form" role="search" onSubmit={(e) => handleSubmit(e)}>
          <input
            id="q"
            aria-label="Search Items"
            placeholder="Search"
            type="search"
            name="q"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </Form>
      </div>
      <div className="items">
        <ul className="itemsList">
          {items.map((item) => {
            return (
              <li key={item.id}>
                {/* Card item display karna hai */}
                <Card
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  id={item.id}
                />
                <Link to={`/shop/item/${item.id}`}>
                  <button>Buy Now!</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
