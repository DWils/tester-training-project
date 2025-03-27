package fr.insy2s.backend.repository;

import fr.insy2s.backend.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    @Query("SELECT c FROM Category c JOIN c.products p WHERE p.id = :id")
    Optional<Category> findByProductId(Long id);
}
