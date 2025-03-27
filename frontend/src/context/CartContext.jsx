import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "react-toastify";
import apiBackend from '../api/apiBackend.js';
import { UserContext } from './UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

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
            const existingProduct = prevCart.find(item => item.id === product.id);
            let updatedCart;
            if (existingProduct) {
                updatedCart = prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [...prevCart, { ...product, id: product.id, quantity: 1 }];
            }
            saveCartToBackend(updatedCart);
            return updatedCart;
        });
        toast.success(` 🛒 ${product.title} ajouté au panier !`);
    };

    const removeFromCart = (product, removeAll = false) => {
        if (loading) return;
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            let updatedCart;
            if (existingProduct) {
                if (removeAll || existingProduct.quantity === 1) {
                    updatedCart = prevCart.filter(item => item.id !== product.id);
                } else {
                    updatedCart = prevCart.map(item =>
                        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
                    );
                }
                toast.error(`❌ ${product.title} supprimé du panier !`);
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
        toast.error(`❌ Tous les articles ont été supprimés du panier !`);
    };

    const proceedToOrder = () => {
        if (loading) return;
        if (!user) {
            alert('Vous devez être connecté pour effectuer à la commande.');
            return;
        }
        const userId = user ? user.id : null;
        apiBackend.post(`/cart/confirm?userId=${userId}`)
        navigate('/order');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, proceedToOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;