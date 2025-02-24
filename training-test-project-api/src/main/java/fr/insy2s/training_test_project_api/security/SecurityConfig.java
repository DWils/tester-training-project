package fr.insy2s.training_test_project_api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Désactiver CSRF pour les tests
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("GET", "/api/products/**").permitAll() // ✅ Tout le monde peut voir les produits
                        .requestMatchers("GET", "/api/categories/**").permitAll() // ✅ Tout le monde peut voir les catégories
                        .requestMatchers("POST", "/api/products/**").hasAnyRole("VENDOR", "ADMIN") // ➕ Ajouter produit
                        .requestMatchers("PUT", "/api/products/**").hasAnyRole("VENDOR", "ADMIN") // ✏️ Modifier produit
                        .requestMatchers("DELETE", "/api/products/**").hasAnyRole("VENDOR", "ADMIN") // ❌ Supprimer produit
                        .requestMatchers("/api/users/**").hasRole("ADMIN") // 👤 Admin gère les utilisateurs
                        .requestMatchers("/api/auth/login").permitAll() // Autoriser CORS pour /api/auth/login
                        .anyRequest().authenticated() // 🔐 Tout le reste nécessite une authentification
                )
                .httpBasic(Customizer.withDefaults()); // Basic Auth

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("user")
                .password("{noop}userpass") // Noop = pas de hashage (pour test)
                .roles("USER") // 🔍 Peut voir les produits
                .build();

        UserDetails vendor = User.withUsername("vendor")
                .password("{noop}vendorpass")
                .roles("VENDOR") // ➕ Peut gérer les produits
                .build();

        UserDetails admin = User.withUsername("admin")
                .password("{noop}adminpass")
                .roles("ADMIN") // 👑 Peut tout faire
                .build();

        return new InMemoryUserDetailsManager(user, vendor, admin);
    }

    // Configuration CORS
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Appliquer CORS sur tous les endpoints
                .allowedOrigins("http://localhost:5173", "http://anotherdomain.com")  // Ajouter les domaines autorisés (pas de "*")
                .allowCredentials(true)  // Autoriser les cookies
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Ajouter les méthodes autorisées
                .allowedHeaders("*") ; // Ajouter les en-têtes autorisés
                //.maxAge(3600);  // Cache les résultats CORS pour 1 heure
    }
}
