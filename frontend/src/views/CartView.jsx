import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const CartView = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

    // Correction pour éviter une erreur si productPrice ou quantity est undefined
    const totalPrice = cart.reduce((total, product) => {
        return total + ((product.productPrice || 0) * (product.quantity || 0));
    }, 0);

    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((product) => (
                            <li key={product.productId} className="d-flex align-items-center mb-3">
                                <img src={product.productImage} alt={product.productName} className="img-thumbnail mr-3" style={{ width: '50px', height: '50px' }} />
                                <div className="flex-grow-1">
                                    <h5>{product.productName}</h5>
                                    <p>{(product.productPrice || 0).toFixed(2)} €</p>
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => addToCart(product)} className="btn btn-primary btn-sm mr-2">+</button>
                                        <span>{product.quantity || 0}</span>
                                        <button onClick={() => removeFromCart(product.productId)} className="btn btn-primary btn-sm ml-2">-</button>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(product.productId, true)} className="btn btn-danger btn-sm ml-3">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: {totalPrice.toFixed(2)} €</h3>
                    <button onClick={clearCart} className="btn btn-warning">Clear Cart</button>
                </div>
            )}
        </div>
    );
};

export default CartView;
