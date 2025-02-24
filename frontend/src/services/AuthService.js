import { jwtDecode } from "jwt-decode";  // ✅ Pour les versions récentes de jwt-decode


const TOKEN_KEY = "token";

export const AuthService = {
    login: (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    getUser: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return {
                username: decoded.sub, // Ou autre champ selon ton backend
                role: decoded.role, // Assurez-vous que le rôle est bien dans le token
            };
        } catch (error) {
            console.error("Erreur de décodage du token", error);
            return null;
        }
    },

    isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};
