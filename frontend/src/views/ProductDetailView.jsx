import React from 'react'
import { useState } from 'react'
const ProductDescriptionView = () => {

    const [product, setProduct] = useState([]);


    return (
        {product.map(product => (
            <div key={product.productId} className="col-md-4">
                <div className="card shadow-sm mb-4">
                    {product.productImageUrl && (
                        <img
                            src={product.productImageUrl}
                            className="card-img-top"
                            alt={product.productName}
                            style={{height: "200px", objectFit: "cover"}}
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
            )}
    )
}
export default ProductDescriptionView
