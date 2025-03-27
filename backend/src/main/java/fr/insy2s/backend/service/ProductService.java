package fr.insy2s.backend.service;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.domain.Product;
import fr.insy2s.backend.dto.ProductDTO;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product saveProduct(Product p);
    Product updateProduct(Product p);
    void deleteProduct(Product p);
    void deleteProductById(Long id);
    Product getProduct(Long id);
    List<ProductDTO> getAllProducts();

    List<Category> getAllCategories();

    List<ProductDTO> getProductsByCategory(Long categoryId);

    Optional<ProductDTO> getProductById(Long id);

    Category getCategoryById(Long id);

    Category getCategoryByProductId(Long id);
}
