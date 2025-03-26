import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importation du style des toasts
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from "./context/CartContext.jsx";
import UserProvider from "./context/UserContext.jsx";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {

    return (
        <Router>
            <UserProvider>
                <CartProvider>
                    <div className="app">
                        <ToastContainer position="top-right" autoClose={3000} />
                        <Navbar />
                        <AppRoutes />
                    </div>
                </CartProvider>
            </UserProvider>
        </Router>
    );
}

export default App;
