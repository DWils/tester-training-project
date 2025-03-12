import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const CartView = () => {
    const { cart, removeFromCart, clearCart, submitOrder } = useContext(CartContext);

    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((product) => (
                            <li key={product.productId}>
                                {product.productName} - {product.productPrice.toFixed(2)} €
                                <button onClick={() => removeFromCart(product.productId)} className="btn btn-danger btn-sm ml-2">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart} className="btn btn-warning">Clear Cart</button>
                    <button onClick={submitOrder} className="btn btn-success ml-2">Submit Order</button>
                </div>
            )}
        </div>
    );
};

export default CartView;