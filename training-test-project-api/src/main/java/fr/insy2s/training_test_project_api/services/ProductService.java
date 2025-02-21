package fr.insy2s.training_test_project_api.services;

import fr.insy2s.training_test_project_api.entities.Category;
import fr.insy2s.training_test_project_api.entities.Product;

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
