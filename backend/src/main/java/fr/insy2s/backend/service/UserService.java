package fr.insy2s.backend.service;

import fr.insy2s.backend.domain.User;
import fr.insy2s.backend.payload.LoginRequest;

import java.util.List;

public interface UserService {
    User findByUsername(String username);
    List<User> getAllUsers();

    User getUser(Long id);

    User createUser(User user);

    User updateUser(Long id, User user);
    void deleteUser(Long id);

    void saveUser(User user);

    User authenticateUserByEmail(LoginRequest loginRequest);
}
