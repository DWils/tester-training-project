package fr.insy2s.training_test_project_api.initializer;



import fr.insy2s.training_test_project_api.entities.Category;
import fr.insy2s.training_test_project_api.entities.Product;
import fr.insy2s.training_test_project_api.entities.User;
import fr.insy2s.training_test_project_api.repositories.CategoryRepository;
import fr.insy2s.training_test_project_api.repositories.ProductRepository;
import fr.insy2s.training_test_project_api.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component  // Assurez-vous que la classe est un composant Spring
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Ajoutez des catégories si elles n'existent pas déjà
        if (categoryRepository.count() == 0) {
            System.out.println("Adding categories");
            categoryRepository.save(new Category("Informatique", "Informatique"));
            categoryRepository.save(new Category("Electroménager", "Electroménager"));
            categoryRepository.save(new Category("Vêtement", "Vêtement"));
        }

        // Ajoutez des produits si la table est vide
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
        if (userRepository.count() == 0) {
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
        }
    }
}


