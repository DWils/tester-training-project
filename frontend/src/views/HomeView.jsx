import {useContext} from 'react';
import Banner from "../assets/banner.png";
import {useNavigate} from 'react-router-dom';
import {CartContext} from "../context/CartContext.jsx";
import ProductSearch from "../components/ProductSearch.jsx";
import useProductSearch from "../hooks/useProductSearch.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

/**
 * Home view component.
 * Displays a banner, a product search input, and a list of filtered products.
 */
const HomeView = () => {
    const {filteredProducts, handleSearch} = useProductSearch();
    const {addToCart} = useContext(CartContext);
    const navigate = useNavigate();

    const bannerStyle = {
        backgroundImage: `url(${Banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        textAlign: 'center',
        width: '100%',
        height: '75vh',
        minHeight: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    return (
        <div className="product-list-container">
            <div className="jumbotron" style={bannerStyle} id="home">
                <h1 className="title">Bienvenue dans notre magasin !</h1>
                <p className="subtitle">Découvrez notre large gamme de produits.</p>
                <p className="subtitle">Parcourez notre collection et trouvez ce dont vous avez besoin.</p>
            </div>
            <div className="body-view">
                <Breadcrumb/>
                <h2 className="mb-4" id="products">🛍️ Liste des Produits</h2>
                <ProductSearch onSearch={handleSearch}/>
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div key={product.productId} className="col-md-4">
                            <div className="card shadow-sm mb-4">
                                {product.productImageUrl && (
                                    <img
                                        src={product.productImageUrl}
                                        className="card-img-top"
                                        alt={product.productName}
                                        style={{height: "200px", objectFit: "cover"}}
                                        onClick={() => navigate("/products/" + product.productId)}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title click-to-detail"
                                        onClick={() => navigate("/products/" + product.productId)}>{product.productName}</h5>
                                    <p className="card-text">{product.productDescription}</p>
                                    <p className="card-text fw-bold text-danger">
                                        💰 {product.productPrice.toFixed(2)} €
                                    </p>
                                    <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeView;