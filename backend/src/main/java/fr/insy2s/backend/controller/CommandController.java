package fr.insy2s.backend.controller;

import fr.insy2s.backend.domain.Command;
import fr.insy2s.backend.dto.CommandRequest;
import fr.insy2s.backend.service.CommandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class CommandController {

    private final CommandService commandService;

    public CommandController(CommandService commandService) {
        this.commandService = commandService;
    }

    public ResponseEntity<Command> createOrder(@RequestBody CommandRequest commandRequest) {
        Command command = commandService.createOrder(commandRequest.getUserId(), commandRequest.getCommandLines());
        return ResponseEntity.ok(command);
    }
}
