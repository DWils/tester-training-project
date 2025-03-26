package fr.insy2s.backend.service.impl;

import fr.insy2s.backend.domain.*;
import fr.insy2s.backend.repository.CartRepository;
import fr.insy2s.backend.repository.CartItemRepository;
import fr.insy2s.backend.repository.CustomerOrderRepository;
import fr.insy2s.backend.repository.UserRepository;
import fr.insy2s.backend.service.CartService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final CustomerOrderRepository customerOrderRepository;

    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, UserRepository userRepository, CustomerOrderRepository customerOrderRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.customerOrderRepository = customerOrderRepository;
    }

    @Override
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).get();
    }

    @Override
    public Cart saveCart(Cart cart) {
        if (cart.getItems() != null) {
            for (CartItem item : cart.getItems()) {
                if (item.getProduct() == null || item.getProduct().getId() == null) {
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
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }

    @Override
    @Transactional
    public CustomerOrder confirmCart(Long userId) {
        Cart cart = cartRepository.findActiveCartByUser(userId)
                .orElseThrow(() -> new RuntimeException("Aucun panier actif trouvé"));

        CustomerOrder order = new CustomerOrder();
        order.setUser(cart.getUser());
        order.setItems(new ArrayList<>(cart.getItems())); // Copie les articles
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        customerOrderRepository.save(order);

        // Supprimer les articles du panier et recréer un panier vide
        cart.getItems().clear();
        cartRepository.save(cart);

        return order;
    }
}
