import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiBackend from "../api/apiBackend.js";
import useProductSearch from '../hooks/useProductSearch.js';
import ProductSearch from '../components/ProductSearch.jsx';
import Breadcrumb from "../components/Breadcrumb.jsx";

/**
 * Product list view component.
 * Displays a product search input and a table of filtered products.
 */
const ProductListView = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    const { filteredProducts, handleSearch } = useProductSearch();

    useEffect(() => {
        let url = "/api/products";
        if (category) {
            url += `?category=${category}`;
        }
        apiBackend.get(url).then(response => {
            setProducts(response.data);
        });
    }, [category]);

    const handleDelete = (productId) => {
        apiBackend.delete(`/api/products/${productId}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== productId));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    const handleSave = () => {
        apiBackend.put(`/api/products/${editingProduct.id}`, editingProduct)
            .then(() => {
                setProducts(products.map(product => product.id === editingProduct.id ? editingProduct : product));
                setEditingProduct(null);
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className="body-view">
            <Breadcrumb/>
            <h2>Liste des Produits</h2>
            <ProductSearch onSearch={handleSearch} />
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map((product) => (
                    <tr key={product.productId}>
                        <td>{product.productId}</td>
                        <td>{product.productName}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.productPrice}</td>
                        <td>
                            <button className="btn btn-primary">Modifier</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListView;