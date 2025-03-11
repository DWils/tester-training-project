package fr.insy2s.backend.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private Long productId;


    @NotNull
    @Column(name="product_name")
    private String productName;

    @Column(name="product_price")
    private Double productPrice;

    @Temporal(TemporalType.DATE)
    @Column(name="creation_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date creationDate;

    @Column(name = "product_description", columnDefinition = "TEXT")
    private String productDescription;


    @Column(name = "product_image_url")
    private String productImageUrl;


    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<CommandLine> commandLines;

    public Product(String productName, String productDescription, Double productPrice,  Category category, String imageUrl) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.creationDate = new Date();
        this.category = category;
        this.productImageUrl = imageUrl;
    }

    public Product() {
    }

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", creationDate=" + creationDate +
                ", categoryId=" + (category != null ? category.getCategoryId() : "null") +
                ", productImageUrl='" + productImageUrl + '\'' +
                ", productDescription='" + productDescription + '\'' +
                '}';
    }

}

