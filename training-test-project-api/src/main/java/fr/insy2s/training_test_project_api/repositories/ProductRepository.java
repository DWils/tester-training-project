package fr.insy2s.training_test_project_api.repositories;

import fr.insy2s.training_test_project_api.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
