package fr.insy2s.backend.controller;

import fr.insy2s.backend.domain.Cart;
import fr.insy2s.backend.domain.CartItem;
import fr.insy2s.backend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>()); // Assurer qu'il y a une liste vide et pas `null`
        }

        return ResponseEntity.ok(cart);
    }


    @PostMapping
    public ResponseEntity<Cart> saveCart(@RequestBody Cart cart) {
        Cart existingCart = cartService.getCartByUserId(cart.getUserId());

        if (existingCart.getItems() == null) {
            existingCart.setItems(new ArrayList<>());
        }

        if (cart.getItems() != null) {
            existingCart.getItems().clear();
            existingCart.getItems().addAll(cart.getItems());
        }

        return ResponseEntity.ok(cartService.saveCart(existingCart));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/items")
    public ResponseEntity<List<CartItem>> saveCartItems(@RequestBody List<CartItem> cartItems) {
        List<CartItem> savedCartItems = cartService.saveCartItems(cartItems);
        return ResponseEntity.ok(savedCartItems);
    }
}
