import { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(AuthService.getUser());

    useEffect(() => {
        const handleStorageChange = () => setUser(AuthService.getUser());
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const login = (token) => {
        AuthService.login(token);
        setUser(AuthService.getUser());
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
