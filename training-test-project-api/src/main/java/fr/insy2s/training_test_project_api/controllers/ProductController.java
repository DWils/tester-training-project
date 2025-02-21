package fr.insy2s.training_test_project_api.controllers;

import fr.insy2s.training_test_project_api.entities.Product;
import fr.insy2s.training_test_project_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello";
    }


    @GetMapping
    public List<Product> getProductList() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable("id") Long id) {
        return productService.getProduct(id);
    }


    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable("id") Long id) {
        productService.deleteProductById(id);
    }


    @PutMapping("/{id}")
    public Product updateProduct(@RequestBody Product product, @PathVariable Long id) throws ParseException {
        product.setProductId(id);
        Product p = productService.updateProduct(product);
        return p;
    }

}
