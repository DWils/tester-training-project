package fr.insy2s.backend.repository;

import fr.insy2s.backend.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserId(Long userId);

    @Query("SELECT c FROM Cart c WHERE c.user.id = :userId AND c.status = 'DRAFT'")
    Optional<Cart> findActiveCartByUser(@Param("userId") Long userId);
}
