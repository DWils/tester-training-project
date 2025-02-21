package fr.insy2s.training_test_project_api.controllers;

import fr.insy2s.training_test_project_api.entities.Category;
import fr.insy2s.training_test_project_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/categories")
public class CategoryController {

    @Autowired
    ProductService productService;

    @GetMapping
    public List<Category> getCategoryList() {
        return productService.getAllCategories();
    }
}
