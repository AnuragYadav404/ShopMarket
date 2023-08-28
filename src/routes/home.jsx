import { Link, Outlet } from "react-router-dom"

export default function HomePage() {
    return (
        <div>
            <h1>This is the homepage of a awesome website</h1>
            <button>
                <Link to="shop/">Shop Now!</Link>
            </button>
            <div>
                <Outlet />
            </div>
        </div>
    )
}