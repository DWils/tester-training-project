import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import {useState, useEffect} from 'react';
import apiBackend from "./api/apiBackend.js";
import CartProvider from "./context/CartContext.jsx";
import UserProvider from "./context/UserContext.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

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
                        <Navbar user={user} handleLogout={handleLogout}/>
                        <Breadcrumb/>
                        <AppRoutes user={user} setUser={setUser}/>
                    </div>
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;