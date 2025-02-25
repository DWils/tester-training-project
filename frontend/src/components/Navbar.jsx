// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkAuth, handleLogout } from '../utils/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await checkAuth();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Mon Site</Link>
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Nos produits</Link>
              </li>

              {/* Affichage conditionnel pour "Ajouter Produit" */}
              {user && (user.role === "VENDOR" || user.role === "ADMIN") && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-product">Ajouter Produit</Link>
                  </li>
              )}

              {/* Connexion / Inscription ou Déconnexion */}
              {!user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Inscription</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Connexion</Link>
                    </li>
                  </>
              ) : (
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Déconnexion
                    </button>
                  </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
