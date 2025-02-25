import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const AuthButton = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        axios.get('/api/auth/me', { withCredentials: true })
            .then(response => {
                setIsAuthenticated(true);
                setUsername(response.data.username);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    const handleLogin = () => {
        // Redirect to the login page
        navigate('/login');
    };

    const handleLogout = () => {
        // Handle logout logic here
        axios.post('/api/auth/logout', {}, { withCredentials: true })
            .then(() => {
                setIsAuthenticated(false);
                setUsername('');
            });
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <span>Welcome, {username}!</span>
                    <button onClick={handleLogout}>Déconnexion</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Connexion</button>
            )}
        </div>
    );
};

export default AuthButton;