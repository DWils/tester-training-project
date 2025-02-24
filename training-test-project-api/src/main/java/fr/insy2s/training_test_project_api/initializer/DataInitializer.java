package fr.insy2s.training_test_project_api.initializer;



import fr.insy2s.training_test_project_api.entities.Category;
import fr.insy2s.training_test_project_api.entities.Product;
import fr.insy2s.training_test_project_api.repositories.CategoryRepository;
import fr.insy2s.training_test_project_api.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component  // Assurez-vous que la classe est un composant Spring
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    // Injectez vos repositories pour accéder aux données
    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Ajoutez des catégories si elles n'existent pas déjà
        if (categoryRepository.count() == 0) {
            categoryRepository.save(new Category("Informatique", "Informatique"));
            categoryRepository.save(new Category("Electroménager", "Electroménager"));
            categoryRepository.save(new Category("Vêtement", "Vêtement"));
        }

        // Ajoutez des produits si la table est vide
        if (productRepository.count() == 0) {
            // Récupérer les catégories pour associer aux produits
            Category informatique = categoryRepository.findByCategoryName("Informatique");
            Category electromenager = categoryRepository.findByCategoryName("Electroménager");
            Category vetement = categoryRepository.findByCategoryName("Vêtement");

            productRepository.save(new Product("Laptop", "Portable puissant", 999.99, informatique, "https://placehold.co/600x400"));
            productRepository.save(new Product("Télévision", "Télévision 4K", 499.99, electromenager, "https://placehold.co/600x400"));
            productRepository.save(new Product("T-shirt", "T-shirt en coton", 19.99, vetement, "https://placehold.co/600x400"));
        }
    }
}


