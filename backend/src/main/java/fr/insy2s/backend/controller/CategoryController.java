package fr.insy2s.backend.controller;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/categories")
public class CategoryController {

    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<List<Category>> getCategoryList() {
        return ResponseEntity.ok(productService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getCategoryById(id));
    }



}