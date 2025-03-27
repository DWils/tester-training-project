package fr.insy2s.backend.dto;

import fr.insy2s.backend.domain.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String category;
    private String image;
    private RatingDto rating;

    @Getter
    @Setter
    public static class RatingDto {
        private Double rate;
        private Integer count;
    }

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.title = product.getTitle();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.category = product.getCategory() != null ? product.getCategory().getName() : null;
        this.image = product.getImage();

        if (product.getRating() != null) {
            this.rating = new RatingDto();
            this.rating.setRate(product.getRating().getRate());
            this.rating.setCount(product.getRating().getCount());
        }
    }



}
