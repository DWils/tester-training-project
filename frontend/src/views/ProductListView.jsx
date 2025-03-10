import React, { useState, useEffect } from 'react';
import apiBackend from "../api/apiBackend.js";

const ProductListView = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        apiBackend.get("/api/products").then(response => {
            setProducts(response.data);
        });
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

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
        <div>
            <h2>Liste des Produits</h2>
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
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{editingProduct && editingProduct.id === product.id ? (
                            <input
                                type="text"
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            />
                        ) : product.productName}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.price}</td>
                        <td>
                            {editingProduct && editingProduct.id === product.id ? (
                                <button className="btn btn-success" onClick={handleSave}>Enregistrer</button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => handleEdit(product)}>Modifier</button>
                            )}
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