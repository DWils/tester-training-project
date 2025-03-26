import { useState, useEffect } from 'react';
import apiBackend from "../api/apiBackend.js";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from "../components/Breadcrumb.jsx";

const AddProductView = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        apiBackend.get("/api/categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories:', error);
            });
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Le nom du produit doit contenir au moins 3 caractères.')
            .max(100, 'Le nom du produit est trop long (max. 100 caractères).')
            .required('Le nom du produit est requis.'),
        description: Yup.string()
            .min(10, 'La description doit contenir au moins 10 caractères.')
            .max(1000, 'La description ne peut pas dépasser 1000 caractères.')
            .required('La description du produit est requise.'),
        price: Yup.number()
            .positive('Le prix doit être supérieur à 0.')
            .required('Le prix est requis.'),
        imageUrl: Yup.string()
            .url('L\'URL de l\'image doit être valide.')
            .required('L’image du produit est requise.'),
        categoryId: Yup.string()
            .required('Veuillez sélectionner une catégorie.')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            imageUrl: '',
            categoryId: ''
        },
        validationSchema: validationSchema,
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
        <div className="body-view">
            <Breadcrumb />
            <h2>Ajouter un Produit</h2>
            <form onSubmit={formik.handleSubmit} className="border-1 p-3">
                <div className="form-group">
                    <label>Nom du produit</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <span style={{ color: 'red' }}>{formik.errors.name}</span>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <span style={{ color: 'red' }}>{formik.errors.description}</span>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Prix</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? (
                        <span style={{ color: 'red' }}>{formik.errors.price}</span>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>URL de l&apos;image</label>
                    <input
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl ? (
                        <span style={{ color: 'red' }}>{formik.errors.imageUrl}</span>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Catégorie</label>
                    <select
                        className="form-control"
                        name="categoryId"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(category => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                    {formik.touched.categoryId && formik.errors.categoryId ? (
                        <span style={{ color: 'red' }}>{formik.errors.categoryId}</span>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={!formik.isValid || formik.isSubmitting}>
                    Ajouter
                </button>
                {formik.errors && Object.keys(formik.errors).length > 0 && (
                    <div style={{ color: 'red' }}>Veuillez corriger les erreurs avant de soumettre le formulaire.</div>
                )}
            </form>
        </div>
    );
}

export default AddProductView;