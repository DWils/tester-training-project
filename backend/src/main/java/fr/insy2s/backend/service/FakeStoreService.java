package fr.insy2s.backend.service;

import fr.insy2s.backend.dto.ProductDTO;
import fr.insy2s.backend.repository.CategoryRepository;
import fr.insy2s.backend.repository.ProductRepository;
import org.springframework.web.client.RestTemplate;

public interface FakeStoreService {
    void fetchAndSaveFakeProducts();
    void saveFakeProduct(ProductDTO fakeProduct);
}
