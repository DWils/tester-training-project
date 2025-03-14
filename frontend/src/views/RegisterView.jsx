import React from 'react';
import { useFormik } from 'formik';
import apiBackend from "../api/apiBackend.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

const RegisterView = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
            apiBackend.post('/api/register', values)
                .then(response => {
                    alert('Inscription réussie');
                    window.location.href = '/login';
                })
                .catch(error => {
                    console.error('Erreur lors de l\'inscription:', error);
                    alert('Une erreur est survenue lors de l\'inscription');
                });
        },
    });

    return (
        <div className="body-view">
            <Breadcrumb/>
            <h2>Inscription</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Nom d'utilisateur</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">S'inscrire</button>
            </form>
        </div>
    );
};

export default RegisterView;