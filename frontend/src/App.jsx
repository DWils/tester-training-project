import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
import HomeView from "./views/HomeView";
import AddProductView from "./views/AddProductView.jsx";
import UserListView from "./views/UserListView.jsx";
import RegisterView from "./views/RegisterView.jsx";
import LoginView from "./views/LoginView.jsx";
import ProductListView from "./views/ProductListView.jsx";
import ProductDetailView from "./views/ProductDetailView.jsx";
import CartView from './views/CartView';
import {useState, useEffect} from 'react';
import apiBackend from "./api/apiBackend.js";
import CartProvider from "./CartContext.jsx";
import UserProvider from "./UserContext.jsx";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <li key={to} className="breadcrumb-item">
                            <Link to={to}>{value}</Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (!user) {
            apiBackend.get('/api/current-user')
                .then(response => {
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                })
                .catch(error => {
                    console.error('Error fetching current user:', error);
                });
        }
    }, [user]);

    const handleLogout = () => {
        apiBackend.post('/api/logout')
            .then(() => {
                setUser(null);
                localStorage.removeItem('user');
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    };

    return (
        <UserProvider>
            <CartProvider>
                <Router>
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
                            <Link className="navbar-brand" to="/">Accueil</Link>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/#products">Nos produits</Link>
                                    </li>
                                    {user && user.role === 'CUSTOMER' && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/add-product">Ajouter Produit</Link>
                                        </li>
                                    )}
                                    {user && (user.role === 'VENDOR' || user.role === 'ADMIN') && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/products">Liste des produits</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/add-product">Ajouter un produit</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/users">Liste des utilisateurs</Link>
                                            </li>
                                        </>
                                    )}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">Cart</Link>
                                    </li>
                                    {!user && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">Inscription</Link>
                                        </li>
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
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Connexion</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </nav>

                        <Breadcrumb/>

                        <Routes>
                            <Route path="/" element={<HomeView/>}/>
                            <Route path="/products"
                                   element={(user && user.role === 'CUSTOMER') || !user ? <HomeView/> :
                                       <ProductListView/>}/>
                            <Route path="/products/:id" element={<ProductDetailView/>}/>
                            <Route path="/add-product" element={user ? <AddProductView/> : <HomeView/>}/>
                            <Route path="/users" element={user ? <UserListView/> : <HomeView/>}/>
                            <Route path="/register" element={<RegisterView/>}/>
                            <Route path="/login" element={<LoginView setUser={setUser}/>}/>
                            <Route path="/cart" element={<CartView/>}/>
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;