package fr.insy2s.backend.service.impl;

import fr.insy2s.backend.entity.Category;
import fr.insy2s.backend.entity.Product;
import fr.insy2s.backend.repository.CategoryRepository;
import fr.insy2s.backend.repository.ProductRepository;
import fr.insy2s.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    final
    ProductRepository productRepository;

    final
    CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product saveProduct(Product p) {
        if(p.getCategory() != null){
            Optional<Category> categoryOptional = categoryRepository.findById(p.getCategory().getCategoryId());
            categoryOptional.ifPresent(p::setCategory);
        }
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
