package fr.insy2s.backend.controller;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.domain.Product;
import fr.insy2s.backend.dto.ProductDTO;
import fr.insy2s.backend.service.FakeStoreService;
import fr.insy2s.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final FakeStoreService fakeStoreService;

    public ProductController(ProductService productService, FakeStoreService fakeStoreService) {
        this.productService = productService;
        this.fakeStoreService = fakeStoreService;
    }

    /**
     * Endpoint de test
     */
    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello");
    }

    /**
     * Récupérer la liste de tous les produits
     */
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts(@RequestParam(required = false) Long categoryId) {
        List<ProductDTO> products = (categoryId != null)
                ? productService.getProductsByCategory(categoryId)
                : productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    /**
     * Récupérer un produit par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Optional<ProductDTO> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * Ajouter un nouveau produit (seulement pour VENDOR et ADMIN)
     */
    @PostMapping
    //@PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    /**
     * Supprimer un produit par ID (seulement pour VENDOR et ADMIN)
     */
    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProductById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Mettre à jour un produit (seulement pour VENDOR et ADMIN)
     */
    @PutMapping("/{id}")
    //@PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        try {
            product.setId(id);
            Product updatedProduct = productService.updateProduct(product);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/import-fakestore")
    public ResponseEntity<String> importFakeProducts() {
        fakeStoreService.fetchAndSaveFakeProducts();
        return ResponseEntity.ok("Produits FakeStoreAPI importés avec succès !");
    }

}
