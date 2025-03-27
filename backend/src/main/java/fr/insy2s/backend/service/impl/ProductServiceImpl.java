package fr.insy2s.backend.service.impl;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.domain.Product;
import fr.insy2s.backend.dto.ProductDTO;
import fr.insy2s.backend.repository.CategoryRepository;
import fr.insy2s.backend.repository.ProductRepository;
import fr.insy2s.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product saveProduct(Product p) {
        if(p.getCategory() != null){
            Optional<Category> categoryOptional = categoryRepository.findById(p.getCategory().getId());
            categoryOptional.ifPresent(p::setCategory);
        }
        return productRepository.save(p);
    }

    @Override
    public Product updateProduct(Product p) {
        // Vérifier si le produit existe avant la mise à jour
        if (p.getId() == null || !productRepository.existsById(p.getId())) {
            throw new IllegalArgumentException("Le produit avec cet ID n'existe pas.");
        }

        // Si le produit existe, on met à jour tous les autres champs sauf l'ID
        Product existingProduct = productRepository.findById(p.getId()).orElseThrow(() ->
                new IllegalArgumentException("Produit non trouvé avec cet ID"));

        // Modifier les attributs sauf l'ID
        if (p.getTitle() != null) {
            existingProduct.setTitle(p.getTitle());
        }
        if (p.getPrice() != null) {
            existingProduct.setPrice(p.getPrice());
        }
        if (p.getCategory().getId() != null) {
            Category cat = categoryRepository.getById(p.getCategory().getId());
            existingProduct.setCategory(cat);
        }
        if (p.getImage() != null) {
            existingProduct.setImage(p.getImage());
        }
        if (p.getDescription() != null) {
            existingProduct.setDescription(p.getDescription());
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
        if(productRepository.findById(id).isEmpty()){
            throw new IllegalArgumentException("Le produit avec cet ID n'existe pas.");
        }
        return productRepository.findById(id).get();
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }


    public Optional<ProductDTO> getProductById(Long id) {
        return productRepository.findById(id).map(ProductDTO::new);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
    }

    @Override
    public Category getCategoryByProductId(Long id) {
        return categoryRepository.findByProductId(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
    }


}
