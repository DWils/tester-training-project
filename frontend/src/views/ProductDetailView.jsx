import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiBackend from "../api/apiBackend.js";
import './ProductDetailView.css';
import Breadcrumb from "../components/Breadcrumb.jsx";
import { CartContext } from "../context/CartContext.jsx"; // ✅ Import du contexte

const ProductDetailView = () => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const { addToCart } = useContext(CartContext); // ✅ Récupérer la fonction d'ajout au panier
    const navigate = useNavigate();

    useEffect(() => {
        apiBackend.get(`/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('❌ Erreur lors de la récupération du produit:', error);
                setError(true);
            });
    }, [id]);

    if (error) {
        return (
            <div className="body-view text-center">
                <Breadcrumb />
                <h2 className="text-danger">❌ Ce produit n'est plus disponible.</h2>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
                    Retour à la boutique
                </button>
            </div>
        );
    }

    if (!product) {
        return <div className="body-view text-center">Loading...</div>;
    }

    return (
        <div className="body-view">
            <Breadcrumb />
            <div className="product-detail-container">
                {product.image && (
                    <img
                        src={product.image}
                        className="card-img-top product-image"
                        alt={product.title}
                    />
                )}
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    {product.quantity !== undefined && (
                        <p className="card-text">📦 Stock disponible : {product.quantity}</p>
                    )}
                    {product.productPrice !== undefined && (
                        <p className="card-text product-price">
                            💰 {product.price.toFixed(2)} €
                        </p>
                    )}
                    <button className="btn btn-success mt-3" onClick={() => addToCart(product)}>
                        🛒 Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailView;
