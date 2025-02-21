package fr.insy2s.training_test_project_api.repositories;

import fr.insy2s.training_test_project_api.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}