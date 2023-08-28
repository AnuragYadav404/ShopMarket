import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
    const cartItem = localStorage.getItem('cart');
    const [cart, setCart] = useState(JSON.parse(cartItem));
    if(!cartItem) {
        return (
            <div>
                <h1>It seems so empty here</h1>
                <p>Head to shopping now!</p>
            </div>
        )
    }
    
    if(cart.length==0) {
        return (
            <div>
                <h1>It seems so empty here</h1>
                <p>Head to shopping now!</p>
            </div>
        )
    }

    function handleDelete(id) {
        const filtered = cart.filter((it) => it.id!=id);
        setCart(filtered);
        localStorage.setItem('cart', JSON.stringify(filtered));
    }

    let total = 0;

    function handleOrderNow() {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    return (
        <div className="cartDisplay">
            <ul>
                {cart.map((item) => {
                    total += item.price*item.count;
                    return (
                        <li key={item.id}>
                            <div className="cartItem">
                                <div className="itemdesc">
                                    <h3>Item: {item.title}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Count: {item.count}</p>
                                    <p>Item totale: ${item.price*item.count}</p>
                                    <Link to={`/shop/item/${item.id}`}><button>View Details</button></Link>
                                    <button onClick={(e) => handleDelete(item.id)}>Delete</button>
                                </div>
                                <div className="itemImg">
                                    <img src={item.image} alt="" />
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="orderSummary">
                <div className="totalContainer">
                    <p>Cart total: ${total}</p>
                    <Link to={"/"}><button onClick={handleOrderNow}>Proceed to Payment</button></Link>
                </div>
            </div>
        </div>
    )
}