package fr.insy2s.backend.service;

import fr.insy2s.backend.entity.Category;
import fr.insy2s.backend.entity.Product;

import java.util.List;

public interface ProductService {

    Product saveProduct(Product p);
    Product updateProduct(Product p);
    void deleteProduct(Product p);
    void deleteProductById(Long id);
    Product getProduct(Long id);
    List<Product> getAllProducts();

    List<Category> getAllCategories();
}
