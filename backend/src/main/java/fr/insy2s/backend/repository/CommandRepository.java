package fr.insy2s.backend.repository;

import fr.insy2s.backend.domain.Command;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandRepository extends JpaRepository<Command, Long> {
}
