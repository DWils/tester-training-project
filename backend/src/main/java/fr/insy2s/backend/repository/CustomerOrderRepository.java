package fr.insy2s.backend.repository;

import fr.insy2s.backend.domain.Cart;
import fr.insy2s.backend.domain.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
}
