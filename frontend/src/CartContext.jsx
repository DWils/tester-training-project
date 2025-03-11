import React, { createContext, useState, useEffect, useContext } from 'react';
import apiBackend from './api/apiBackend.js';
import { UserContext } from './UserContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const { user } = useContext(UserContext);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
    };

    const clearCart = () => {
        setCart([]);
    };

    const submitOrder = () => {
        const orderLines = cart.map(product => ({
            productId: product.productId,
            quantity: 1 // Assuming quantity is 1 for simplicity
        }));

        if (user) {
            apiBackend.post('/api/orders', { userId: user.id, orderLines })
                .then(response => {
                    console.log('Order submitted:', response.data);
                    clearCart();
                })
                .catch(error => {
                    console.error('Error submitting order:', error);
                });
        } else {
            localStorage.setItem('order', JSON.stringify(orderLines));
            clearCart();
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, submitOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;