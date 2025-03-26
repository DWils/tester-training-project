package fr.insy2s.backend.service.impl;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.domain.Product;
import fr.insy2s.backend.domain.ProductRating;
import fr.insy2s.backend.dto.ProductDTO;
import fr.insy2s.backend.repository.CategoryRepository;
import fr.insy2s.backend.repository.ProductRepository;
import fr.insy2s.backend.repository.ProductRatingRepository;
import fr.insy2s.backend.service.FakeStoreService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class FakeStoreServiceImpl implements FakeStoreService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRatingRepository productRatingRepository;
    private final RestTemplate restTemplate;

    public FakeStoreServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, ProductRatingRepository productRatingRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productRatingRepository = productRatingRepository;
        this.restTemplate = new RestTemplate();
    }

    @Override
    @PostConstruct
    public void fetchAndSaveFakeProducts() {
        String url = "https://fakestoreapi.com/products";
        ProductDTO[] fakeProducts = restTemplate.getForObject(url, ProductDTO[].class);

        if (fakeProducts != null) {
            for (ProductDTO fakeProduct : fakeProducts) {
                saveFakeProduct(fakeProduct);
            }
        }
        System.out.println("Fetching and saving fake products");
    }

    @Override
    public void saveFakeProduct(ProductDTO fakeProduct) {
        Optional<Category> optionalCategory = categoryRepository.findByName(fakeProduct.getCategory());
        Category category = optionalCategory.orElseGet(() -> {
            Category newCategory = new Category();
            newCategory.setName(fakeProduct.getCategory());
            return categoryRepository.save(newCategory);
        });

        if (productRepository.existsByTitle(fakeProduct.getTitle())) {
            return;
        }

        Product product = new Product(
                fakeProduct.getTitle(),
                fakeProduct.getDescription(),
                fakeProduct.getPrice(),
                fakeProduct.getImage(),
                10,
                category
        );

        product = productRepository.save(product);

        if (fakeProduct.getRating() != null) {
            ProductRating rating = new ProductRating();
            rating.setRate(fakeProduct.getRating().getRate());
            rating.setCount(fakeProduct.getRating().getCount());
            rating.setProduct(product);
            productRatingRepository.save(rating);
        }
    }
}
