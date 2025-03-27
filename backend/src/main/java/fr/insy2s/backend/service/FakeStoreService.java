package fr.insy2s.backend.service;

import fr.insy2s.backend.dto.ProductDTO;

public interface FakeStoreService {
    void fetchAndSaveFakeProducts();
    void saveFakeProduct(ProductDTO fakeProduct);
}
