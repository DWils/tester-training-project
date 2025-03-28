package fr.insy2s.backend.repository;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);

    boolean existsByTitle(String title);

    Optional<Product> findByCategoryId(Long categoryId);
}
