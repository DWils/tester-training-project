import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Accueil</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Produits</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-product">Ajouter Produit</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Inscription</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Connexion</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;