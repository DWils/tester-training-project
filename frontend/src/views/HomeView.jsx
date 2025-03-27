import { useState, useContext, useEffect } from "react";
import Banner from "../assets/banner.png";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import ProductSearch from "../components/ProductSearch.jsx";
import CategoryDropdown from "../components/CategoryDropdown.jsx";
import useProductSearch from "../hooks/useProductSearch.js";
import useProductFilterByCategory from "../hooks/useProductFilterByCategory.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

const HomeView = () => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // État global pour la recherche et le filtre
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const { filteredProducts, handleSearch } = useProductSearch();
    const { filterByCategory, filteredProductsByCategory } = useProductFilterByCategory();

    // Filtrage combiné : recherche + catégorie
    const [displayedProducts, setDisplayedProducts] = useState([]);

    useEffect(() => {
        let products = (filteredProductsByCategory || []).length > 0
            ? filteredProductsByCategory
            : filteredProducts;

        if (searchQuery) {
            products = products.filter(product =>
                product.productName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setDisplayedProducts(products);
        console.log("Produits affichés :", products);
    }, [filteredProducts, filteredProductsByCategory, searchQuery]);

    return (
        <div className="product-list-container">
            <div className="jumbotron" style={{
                backgroundImage: `url(${Banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                color: "white",
                textAlign: "center",
                width: "100%",
                height: "75vh",
                minHeight: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }} id="home">
                <h1 className="title">Bienvenue dans notre magasin !</h1>
                <p className="subtitle">Découvrez notre large gamme de produits.</p>
                <p className="subtitle">Parcourez notre collection et trouvez ce dont vous avez besoin.</p>
            </div>
            <div className="body-view">
                <Breadcrumb />
                <h2 className="mb-4" id="products">🛍️ Liste des Produits</h2>

                {/* Recherche et Filtrage */}
                <ProductSearch onSearch={(query) => setSearchQuery(query)} />
                <CategoryDropdown onCategoryChange={(categoryId) => {
                    setSelectedCategory(categoryId);
                    filterByCategory(categoryId);
                }} />

                <div className="row">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                            <div key={product.id} className="col-md-4">
                                <div className="card shadow-sm mb-4">
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            className="card-img-top"
                                            alt={product.title}
                                            style={{
                                                width: "100%",        // Prend toute la largeur du conteneur
                                                height: "200px",      // Hauteur fixe pour uniformiser les cartes
                                                objectFit: "contain", // Affiche toute l'image sans la couper
                                                backgroundColor: "#f8f9fa" // Ajoute un fond si l’image ne remplit pas la hauteur
                                            }}
                                            onClick={() => navigate("/products/" + product.id)}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title click-to-detail"
                                            onClick={() => navigate("/products/" + product.id)}>{product.title}</h5>
                                       
                                        <p className="card-text">🏷️ {product.category}</p>
                                        <p className="card-text description">{product.description}</p>
                                        {product.quantity !== undefined && (
                                            <p className="card-text">📦 Stock disponible : {product.quantity}</p>
                                        )}
                                        <p className="card-text fw-bold text-danger">
                                            💰 {product.price.toFixed(2)} €
                                        </p>
                                        <button onClick={() => addToCart(product)} className="btn btn-primary">
                                            🛒 Ajouter au panier
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">Aucun produit trouvé dans cette catégorie.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeView;
