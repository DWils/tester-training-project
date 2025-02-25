package fr.insy2s.training_test_project_api.services;

import fr.insy2s.training_test_project_api.entities.User;

import java.util.List;

public interface UserService {
    User findByUsername(String username);
    List<User> getAllUsers();

    User getUser(Long id);

    User createUser(User user);

    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
