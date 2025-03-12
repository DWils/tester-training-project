package fr.insy2s.backend.service;

import fr.insy2s.backend.domain.User;
import fr.insy2s.backend.payload.LoginRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    User findByUsername(String username);
    Page<User> getAllUsers(Pageable pageable);

    User getUser(Long id);

    User createUser(User user);

    User updateUser(Long id, User user);
    void deleteUser(Long id);

    void saveUser(User user);

    User authenticateUserByEmail(LoginRequest loginRequest);
}
