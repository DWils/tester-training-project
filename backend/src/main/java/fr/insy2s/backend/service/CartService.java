package fr.insy2s.backend.service;

import fr.insy2s.backend.domain.Cart;
import fr.insy2s.backend.domain.CartItem;

import java.util.List;

public interface CartService {
    Cart getCartByUserId(Long userId);
    Cart saveCart(Cart cart);
    void deleteCart(Long cartId);
    List<CartItem> saveCartItems(List<CartItem> cartItems);
    Cart findOrCreateCartByUserId(Long userId);
}
