package fr.insy2s.backend.initializer;

import fr.insy2s.backend.domain.Category;
import fr.insy2s.backend.domain.Product;
import fr.insy2s.backend.domain.User;
import fr.insy2s.backend.repository.CategoryRepository;
import fr.insy2s.backend.repository.ProductRepository;
import fr.insy2s.backend.repository.UserRepository;
import fr.insy2s.backend.service.FakeStoreService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final FakeStoreService fakeStoreService;
    private final UserRepository userRepository;



    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository, UserRepository userRepository, FakeStoreService fakeStoreService) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.fakeStoreService = fakeStoreService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Fetch and save fake products
        // Add categories if the table is empty
//        if (categoryRepository.count() == 0) {
//            System.out.println("Adding categories");
//            categoryRepository.save(new Category("Informatique", "Informatique"));
//            categoryRepository.save(new Category("Electroménager", "Electroménager"));
//            categoryRepository.save(new Category("Vêtement", "Vêtement"));
//        }

        // Add products if the table is empty
//        if (productRepository.count() == 0) {
//            // get categories for set products
//            System.out.println("Adding products");
//            Category informatique = categoryRepository.findByCategoryName("Informatique").get();
//            Category electromenager = categoryRepository.findByCategoryName("Electroménager").get();
//            Category vetement = categoryRepository.findByCategoryName("Vêtement").get();
//
//            productRepository.save(new Product("Laptop", "Portable puissant", 999.99, informatique, "https://placehold.co/600x400"));
//            productRepository.save(new Product("Télévision", "Télévision 4K", 499.99, electromenager, "https://placehold.co/600x400"));
//            productRepository.save(new Product("T-shirt", "T-shirt en coton", 19.99, vetement, "https://placehold.co/600x400"));
//        }


        // Add users if the table is empty
        if (userRepository.count() == 0) {
            System.out.println("Adding users");

            userRepository.save(new User("admin1", "admin1@email.com", "password", "ADMIN"));
            userRepository.save(new User("admin2", "admin2@email.com", "password", "ADMIN"));
            userRepository.save(new User("admin3", "admin3@email.com","password", "ADMIN"));

            userRepository.save(new User("vendor1", "vendor1@email.com","password", "VENDOR"));
            userRepository.save(new User("vendor2", "vendor2@email.com","password", "VENDOR"));
            userRepository.save(new User("vendor3", "vendor3@email.com","password", "VENDOR"));

            userRepository.save(new User("customer1", "customer1@email.com","password", "CUSTOMER"));
            userRepository.save(new User("customer2", "customer2@email.com","password", "CUSTOMER"));
            userRepository.save(new User("customer3", "customer3@email.com","password", "CUSTOMER"));
        }
    }
}
