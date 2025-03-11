package fr.insy2s.backend.service;

import fr.insy2s.backend.domain.Command;
import fr.insy2s.backend.dto.CommandLineDto;

import java.util.List;

public interface CommandService {
    Command createOrder(Long userId, List<CommandLineDto> commandLineDtos);
}
