import React, {useState, useEffect} from 'react';
import apiBackend from "../api/apiBackend.js";
import {useFormik} from 'formik';

const AddProductView = () => {

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImageUrl: '',
        category: {
            categoryId: ''
        },
    });

    useEffect(() => {
        apiBackend.get("/api/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories:', error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            imageUrl: '',
            categoryId: ''
        },
        onSubmit: values => {
            const newProduct = {
                productName: values.name,
                productDescription: values.description,
                productPrice: parseFloat(values.price),
                creationDate: new Date().toISOString().split('T')[0],
                category: { categoryId: values.categoryId },
                productImageUrl: values.imageUrl
            };

            apiBackend.post('/api/products', newProduct)
                .then(() => {
                    window.location.href = '/products';
                })
                .catch(error => {
                    console.error('Erreur:', error.message);
                    alert('Une erreur est survenue lors de l\'ajout du produit');
                });
        }
    });

    return (
        <div>
            <h2>Ajouter un Produit</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Nom du produit</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Prix</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        required
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label>URL de l'image</label>
                    <input
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Catégorie</label>
                    <select
                        className="form-control"
                        name="categoryId"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                        required
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(category => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Ajouter
                </button>
            </form>
        </div>
    );

}
export default AddProductView
