package fr.insy2s.training_test_project_api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // 🔥 Active CORS
                .csrf(AbstractHttpConfigurer::disable) // Désactive CSRF pour API REST (ou active avec cookies sécurisés)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("GET", "/api/products/**").permitAll()
                        .requestMatchers("GET", "/api/categories/**").permitAll()
                        .requestMatchers("POST", "/api/products/**").hasAnyRole("VENDOR", "ADMIN", "CUSTOMER")
                        .requestMatchers("PUT", "/api/products/**").hasAnyRole("VENDOR", "ADMIN")
                        .requestMatchers("DELETE", "/api/products/**").hasAnyRole("VENDOR", "ADMIN")
                        .requestMatchers("/api/users/**").hasRole("ADMIN")
                        .requestMatchers("/api/auth/login", "/api/auth/logout", "/api/auth/me").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionFixation().migrateSession()
                )
                .formLogin(Customizer.withDefaults()) // 🔥 Active les sessions HTTP (plus besoin de HTTP Basic)
                .logout(logout -> logout.logoutUrl("/api/auth/logout"));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuration CORS pour autoriser les cookies de session
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173","http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .allowedHeaders("*");
    }
}
