import { useLoaderData, Link } from "react-router-dom";
import styles from "./ShopIndex.module.css";

export default function ShopIndex() {
  const categories = useLoaderData();
  return (
    <div className={styles.displayArea}>
      <div className={styles.content}>
        <h1>Welcome to ShopMarket!</h1>
        <h2>Select a category to explore: </h2>
        <div className={styles.categoryDisplay}>
          <ul>
            {categories.map((cat) => {
              return (
                <li key={cat}>
                  <Link to={`/shop/${cat}`}>
                    <button>{cat.toUpperCase()}</button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
