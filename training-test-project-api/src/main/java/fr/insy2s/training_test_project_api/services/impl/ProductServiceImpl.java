package fr.insy2s.training_test_project_api.services.impl;

import fr.insy2s.training_test_project_api.entities.Category;
import fr.insy2s.training_test_project_api.entities.Product;
import fr.insy2s.training_test_project_api.repositories.CategoryRepository;
import fr.insy2s.training_test_project_api.repositories.ProductRepository;
import fr.insy2s.training_test_project_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public Product saveProduct(Product p) {
        Category category = categoryRepository.findById(p.getCategory().getCategoryId()).get();
        p.setCategory(category);
        return productRepository.save(p);
    }

    @Override
    public Product updateProduct(Product p) {
        // Vérifier si le produit existe avant la mise à jour
        if (p.getProductId() == null || !productRepository.existsById(p.getProductId())) {
            throw new IllegalArgumentException("Le produit avec cet ID n'existe pas.");
        }

        // Si le produit existe, on met à jour tous les autres champs sauf l'ID
        Product existingProduct = productRepository.findById(p.getProductId()).orElseThrow(() ->
                new IllegalArgumentException("Produit non trouvé avec cet ID"));

        // Modifier les attributs sauf l'ID
        if (p.getProductName() != null) {
            existingProduct.setProductName(p.getProductName());
        }
        if (p.getProductPrice() != null) {
            existingProduct.setProductPrice(p.getProductPrice());
        }
        if (p.getCreationDate() != null) {
            existingProduct.setCreationDate(p.getCreationDate());
        }
        if (p.getCategory().getCategoryId() != null) {
            Category cat = categoryRepository.getById(p.getCategory().getCategoryId());
            existingProduct.setCategory(cat);
        }
        if (p.getProductImageUrl() != null) {
            existingProduct.setProductImageUrl(p.getProductImageUrl());
        }
        if (p.getProductDescription() != null) {
            existingProduct.setProductDescription(p.getProductDescription());
        }

        // Save et return updated product
        return productRepository.save(existingProduct);
    }


    @Override
    public void deleteProduct(Product p) {
        productRepository.delete(p);
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product getProduct(Long id) {
        return productRepository.findById(id).get();
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
