import { useContext } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import apiBackend from "../api/apiBackend.js";
import { UserContext } from "../context/UserContext.jsx";

const LoginView = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext); // Utilisation correcte de login

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            apiBackend.post('/api/login', values)
                .then(response => {
                    alert('Connexion réussie');
                    console.log("session :", response.data);

                    login(response.data); // Met à jour UserContext immédiatement
                    navigate('/'); // Redirige vers la page d'accueil
                })
                .catch(error => {
                    console.error('Erreur lors de la connexion:', error);
                    alert('Une erreur est survenue lors de la connexion');
                });
        },
    });

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={formik.handleSubmit}>
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
                <button type="submit" className="btn btn-primary mt-3">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginView;

