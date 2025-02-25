import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is already logged in
        axios.get('/api/auth/me', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(() => {
                setUser(null);
            });
    }, []);

    const login = (username, password) => {
        return axios.post('/api/auth/login', { username, password }, { withCredentials: true })
            .then(response => {
                setUser(response.data);
                return response.data;
            })
            .catch(error => {
                console.error("Login failed:", error);
                throw error;
            });
    };

    const logout = () => {
        return axios.post('/api/auth/logout', {}, { withCredentials: true })
            .then(() => {
                setUser(null);
            });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};