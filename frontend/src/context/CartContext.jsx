import React, { createContext, useState, useContext, useEffect } from 'react';
import apiBackend from '../api/apiBackend.js';
import { UserContext } from './UserContext.jsx';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log("UserContext state:", { user, loading });
        if (loading) return; // Attendre que l'utilisateur soit chargé
        if (user) {
            apiBackend.get(`/api/cart/${user.id}`)
                .then(response => {
                    console.log("Cart data:", response.data);
                    setCart(response.data.items || []);
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                });
        }
    }, [user, loading]);

    const saveCartToBackend = (updatedCart) => {
        if (user) {
            console.log("Saving cart to backend:", { items: updatedCart, userId: user.id }); // ✅ Vérifier ce qui est envoyé

            apiBackend.post('/api/cart', { items: updatedCart, userId: user.id })
                .then(response => {
                    setCart(response.data.items || []);
                    console.log('Cart saved:', response.data);
                })
                .catch(error => {
                    console.error('Error saving cart:', error);
                });
        }
    };

    const addToCart = (product) => {
        console.log("Adding to cart:", product);

        if (loading) return;
        if (!user) {
            alert('You must be logged in to add items to the cart.');
            return;
        }
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.productId === product.productId || item.productId === product.id);
            let updatedCart;
            if (existingProduct) {
                updatedCart = prevCart.map(item =>
                    item.productId === product.productId || item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [...prevCart, { ...product, productId: product.productId, quantity: 1 }];
            }
            saveCartToBackend(updatedCart);
            return updatedCart;
        });
    };

    const removeFromCart = (productId, removeAll = false) => {
        if (loading) return;
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.productId === productId);
            let updatedCart;
            if (existingProduct) {
                if (removeAll || existingProduct.quantity === 1) {
                    updatedCart = prevCart.filter(item => item.productId !== productId);
                } else {
                    updatedCart = prevCart.map(item =>
                        item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
                    );
                }
                saveCartToBackend(updatedCart);
                return updatedCart;
            }
            return prevCart;
        });
    };

    const clearCart = () => {
        if (loading) return;
        setCart([]);
        saveCartToBackend([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;