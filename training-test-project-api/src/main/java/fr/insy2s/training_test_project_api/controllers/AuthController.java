package fr.insy2s.training_test_project_api.controllers;

import fr.insy2s.training_test_project_api.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Simuler l'authentification (remplace par ta logique réelle)
        if ("vendor".equals(username) && "vendorpass".equals(password)) {
            String token = jwtUtil.generateToken(username, "VENDOR");
            return ResponseEntity.ok(Map.of("token", token, "role", "VENDOR"));
        } else if ("admin".equals(username) && "adminpass".equals(password)) {
            String token = jwtUtil.generateToken(username, "ADMIN");
            return ResponseEntity.ok(Map.of("token", token, "role", "ADMIN"));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Identifiants incorrects"));
    }
}

