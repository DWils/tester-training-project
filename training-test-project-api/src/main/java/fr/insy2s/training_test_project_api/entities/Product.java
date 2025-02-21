package fr.insy2s.training_test_project_api.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
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

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(Double productPrice) {
		this.productPrice = productPrice;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getProductImageUrl() {
		return productImageUrl;
	}

	public void setProductImageUrl(String productImageUrl) {
		this.productImageUrl = productImageUrl;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
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
