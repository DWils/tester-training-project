package fr.insy2s.backend.service.impl;

import fr.insy2s.backend.domain.Cart;
import fr.insy2s.backend.domain.CartItem;
import fr.insy2s.backend.repository.CartRepository;
import fr.insy2s.backend.repository.CartItemRepository;
import fr.insy2s.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).get(0);
    }

    @Override
    public Cart saveCart(Cart cart) {
        if (cart.getItems() != null) {
            for (CartItem item : cart.getItems()) {
                if (item.getProduct() == null || item.getProduct().getProductId() == null) {
                    throw new IllegalArgumentException("CartItem must have a valid Product");
                }
                item.setCart(cart); // Lier l'item au panier
            }
        }
        return cartRepository.save(cart);
    }



    @Override
    public void deleteCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    @Override
    public List<CartItem> saveCartItems(List<CartItem> cartItems) {
        return cartItemRepository.saveAll(cartItems);
    }

    @Override
    public Cart findOrCreateCartByUserId(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        if (carts.isEmpty()) {
            Cart cart = new Cart();
            cart.setUserId(userId);
            return cartRepository.save(cart);
        }
        return carts.get(0);
    }
}
