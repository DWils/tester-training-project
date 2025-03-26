package fr.insy2s.backend.repository;

import fr.insy2s.backend.domain.ProductRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRatingRepository extends JpaRepository<ProductRating, Long> {
}
