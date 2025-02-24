import { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products", {
      headers: {
        Authorization: "Basic " + btoa("admin:password"), // 🔥 Authentification Basic
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erreur de chargement :", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛍️ Liste des Produits</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.productId} className="col-md-4">
            <div className="card shadow-sm mb-4">
              {product.productImageUrl && (
                <img
                  src={product.productImageUrl}
                  className="card-img-top"
                  alt={product.productName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                <p className="card-text fw-bold text-danger">
                  💰 {product.productPrice.toFixed(2)} €
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
