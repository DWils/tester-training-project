package fr.insy2s.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String category;
    private String image;
    private RatingDTO rating;

    @Getter
    @Setter
    public static class RatingDTO {
        private Double rate;
        private Integer count;
    }
}
