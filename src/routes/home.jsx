import { Link, Outlet } from "react-router-dom"
import styles from './homepage.module.css'

export default function HomePage() {
    return (
        <div>
            <h1>Welcome to ShopMarket!</h1>
            <h2>Only destination for all your fashion cravings.</h2>
            <h2>Go ahead</h2>
            <button className={styles.buttonStyle}>
                <Link to="shop/"><h2>Shop Now!</h2></Link>
            </button>
            <div>
                <Outlet />
            </div>
        </div>
    )
}