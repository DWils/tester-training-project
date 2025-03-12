import React from 'react'
import {Link} from 'react-router-dom';
import NavItem from "./NavItem.jsx";

const Navbar = ({user, handleLogout}) => {

    const [links, setLinks] = React.useState([
        // {linkDirection: "/#home", linkName: "Accueil"},
        // {linkDirection: "/#products", linkName: "Liste des produits"},
        // {linkDirection: "/add-product", linkName: "Ajouter Produit"},
        {linkDirection: "/products", linkName: "Liste des produits"},
        {linkDirection: "/add-product", linkName: "Ajouter un produit"},
        {linkDirection: "/users", linkName: "Liste des utilisateurs"},
        // {linkDirection: "/cart", linkName: "Cart"},
        // {linkDirection: "/register", linkName: "Inscription"},
        // {linkDirection: "/login", linkName: "Connexion"},
    ]);


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <Link className="navbar-brand" to="/#home">Accueil</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <NavItem linkDirection="/#products" linkName="Liste des produits"/>
                    {user && user.role === 'CUSTOMER' && (
                        <NavItem linkDirection="/add-product" linkName="Ajouter Produit"/>
                    )}
                    {
                        user && (user.role === 'VENDOR' || user.role === 'ADMIN') && links.map((link, index) =>
                        <NavItem key={index} linkDirection={link.linkDirection} linkName={link.linkName}/>)
                    }
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">Cart</Link>
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
    )
}
export default Navbar;
