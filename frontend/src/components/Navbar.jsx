import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavItem from "./NavItem.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { CartContext } from "../context/CartContext.jsx"; // 🔥 Importation du contexte du panier

const Navbar = () => {
    const { user, handleLogout } = useContext(UserContext);
    const { cart = [] } = useContext(CartContext); // 🔥 Ajout d'une valeur par défaut

    // Calcul du nombre total d'articles dans le panier
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0); // 🔥 Évite aussi les erreurs si `quantity` est undefined

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <Link className="navbar-brand" to="/">Accueil</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {(user && user.role === 'CUSTOMER') || !user && (
                        <NavItem linkDirection="/" linkName="Nos produits"/>
                    )}

                    {user && (
                        <NavItem linkDirection="/add-product" linkName="Ajouter Produit"/>
                    )}

                    <li className="nav-item">
                        <Link className="nav-link btn btn-warning" to="/cart">
                            🛒 Panier
                            {totalItems > 0 && <span className="badge bg-danger ms-2">{totalItems}</span>} {/* 🔥 Affichage du compteur */}
                        </Link>
                    </li>

                    {!user && (
                        <NavItem linkDirection="/register" linkName="Inscription"/>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {user ? (
                        <>
                            <li className="nav-item">
                                <span className="navbar-text">Bonjour {user.username}</span>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link nav-link"
                                        onClick={handleLogout}>Déconnexion
                                </button>
                            </li>
                        </>
                    ) : (
                        <NavItem linkDirection="/login" linkName="Connexion"/>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
