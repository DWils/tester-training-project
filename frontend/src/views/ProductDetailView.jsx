import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import apiBackend from "../api/apiBackend.js";
import './ProductDetailView.css'; // Import the CSS file

const ProductDetailView = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        apiBackend.get(`/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            {product.productImageUrl && (
                <img
                    src={product.productImageUrl}
                    className="card-img-top product-image"
                    alt={product.productName}
                />
            )}
            <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                {product.productPrice !== undefined && (
                    <p className="card-text product-price">
                        💰 {product.productPrice.toFixed(2)} €
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductDetailView;