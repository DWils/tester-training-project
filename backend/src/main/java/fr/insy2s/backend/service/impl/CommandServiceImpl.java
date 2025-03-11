package fr.insy2s.backend.service.impl;

import fr.insy2s.backend.domain.Command;
import fr.insy2s.backend.domain.CommandLine;
import fr.insy2s.backend.dto.CommandLineDto;
import fr.insy2s.backend.repository.CommandRepository;
import fr.insy2s.backend.repository.ProductRepository;
import fr.insy2s.backend.service.CommandService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommandServiceImpl implements CommandService {

    private final CommandRepository commandRepository;
    private final ProductRepository productRepository;

    public CommandServiceImpl(CommandRepository commandRepository, ProductRepository productRepository) {
        this.commandRepository = commandRepository;
        this.productRepository = productRepository;
    }

    public Command createOrder(Long userId, List<CommandLineDto> commandLineDtos) {
        Command command = new Command();
        List<CommandLine> commandLines = commandLineDtos.stream().map(dto -> {
            CommandLine commandLine = new CommandLine();
            commandLine.setCommand(command);
            commandLine.setProduct(productRepository.findById(dto.getProductId()).orElseThrow());
            commandLine.setQuantity(dto.getQuantity());
            return commandLine;
        }).collect(Collectors.toList());

        command.setCommandLines(commandLines);
        return commandRepository.save(command);
    }
}
