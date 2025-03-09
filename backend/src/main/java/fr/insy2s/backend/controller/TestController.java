package fr.insy2s.backend.controller;

import fr.insy2s.backend.domain.Test;
import fr.insy2s.backend.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {
    private final TestRepository testRepository;

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("test");
    }

    @PostMapping("/test")
    public ResponseEntity<Test> createTest(@RequestBody Test test){
        return ResponseEntity.ok(testRepository.save(test));
    }

    @GetMapping("/test/{id}")
    public ResponseEntity<Test> getTest(Long id){
        return ResponseEntity.ok(testRepository.findById(id).get());
    }

}
