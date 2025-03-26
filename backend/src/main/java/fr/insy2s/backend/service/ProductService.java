package fr.insy2s.backend.service;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.domain.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product saveProduct(Product p);
    Product updateProduct(Product p);
    void deleteProduct(Product p);
    void deleteProductById(Long id);
    Product getProduct(Long id);
    List<Product> getAllProducts();

    List<Category> getAllCategories();

    List<Product> getProductsByCategory(Long categoryId);

    Optional<Product> getProductById(Long id);
}
