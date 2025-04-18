import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import Breadcrumb from "../components/Breadcrumb.jsx";

const CartView = () => {
    const { cart, addToCart, removeFromCart, clearCart, proceedToOrder } = useContext(CartContext);

    const totalPrice = cart.reduce((total, product) => {
        return total + ((product.price || 0) * (product.quantity || 0));
    }, 0);

    return (
        <div className="container mt-4">
            <Breadcrumb/>
            <h2>Panier</h2>
            {cart.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((product) => (
                            <li key={product.id} className="d-flex align-items-center mb-3">
                                <img src={product.image} alt={product.title} className="img-thumbnail mr-3" style={{ width: '50px', height: '50px' }} />
                                <div className="flex-grow-1">
                                    <h5>{product.title}</h5>
                                    <p>{(product.price || 0).toFixed(2)} €</p>
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => removeFromCart(product)} className="btn btn-primary btn-sm ml-2">-</button>
                                        <span>{product.quantity || 0}</span>
                                        <button onClick={() => addToCart(product)} className="btn btn-primary btn-sm mr-2">+</button>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(product, true)} className="btn btn-danger btn-sm ml-3">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: {totalPrice.toFixed(2)} €</h3>
                    <button onClick={clearCart} className="btn btn-warning">Clear Cart</button>
                    <button onClick={proceedToOrder} className="btn btn-primary">
                                    Confirmer la commande
                                </button>
                </div>
            )}
        </div>
    );
};

export default CartView;
