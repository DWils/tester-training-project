package fr.insy2s.backend.initializer;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.domain.Product;
import fr.insy2s.backend.repository.CategoryRepository;
import fr.insy2s.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;


    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Add categories if the table is empty
        if (categoryRepository.count() == 0) {
            System.out.println("Adding categories");
            categoryRepository.save(new Category("Informatique", "Informatique"));
            categoryRepository.save(new Category("Electroménager", "Electroménager"));
            categoryRepository.save(new Category("Vêtement", "Vêtement"));
        }

        // Add products if the table is empty
        if (productRepository.count() == 0) {
            // Récupérer les catégories pour associer aux produits
            System.out.println("Adding products");
            Category informatique = categoryRepository.findByCategoryName("Informatique");
            Category electromenager = categoryRepository.findByCategoryName("Electroménager");
            Category vetement = categoryRepository.findByCategoryName("Vêtement");

            productRepository.save(new Product("Laptop", "Portable puissant", 999.99, informatique, "https://placehold.co/600x400"));
            productRepository.save(new Product("Télévision", "Télévision 4K", 499.99, electromenager, "https://placehold.co/600x400"));
            productRepository.save(new Product("T-shirt", "T-shirt en coton", 19.99, vetement, "https://placehold.co/600x400"));
        }


        // Add users if the table is empty
        /*if (userRepository.count() == 0) {
            System.out.println("Adding users");

            userRepository.save(new User("admin1", passwordEncoder.encode("password"), "ADMIN"));
            userRepository.save(new User("admin2", passwordEncoder.encode("password"), "ADMIN"));
            userRepository.save(new User("admin3", passwordEncoder.encode("password"), "ADMIN"));

            userRepository.save(new User("vendor1", passwordEncoder.encode("password"), "VENDOR"));
            userRepository.save(new User("vendor2", passwordEncoder.encode("password"), "VENDOR"));
            userRepository.save(new User("vendor3", passwordEncoder.encode("password"), "VENDOR"));

            userRepository.save(new User("customer1", passwordEncoder.encode("password"), "CUSTOMER"));
            userRepository.save(new User("customer2", passwordEncoder.encode("password"), "CUSTOMER"));
            userRepository.save(new User("customer3", passwordEncoder.encode("password"), "CUSTOMER"));
        }*/
    }
}
