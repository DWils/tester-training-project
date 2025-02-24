package fr.insy2s.training_test_project_api.repositories;

import fr.insy2s.training_test_project_api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

