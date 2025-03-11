package fr.insy2s.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommandRequest {
    private Long userId;
    private List<CommandLineDto> commandLines;
}
