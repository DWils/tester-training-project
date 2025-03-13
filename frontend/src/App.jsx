import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from "./context/CartContext.jsx";
import UserProvider from "./context/UserContext.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {

    return (
        <UserProvider>
            <CartProvider>
                <Router>
                    <div className="container-fluid">
                        <Navbar/>
                        <Breadcrumb />
                        <AppRoutes />
                    </div>
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;
