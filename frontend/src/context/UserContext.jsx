import React, { createContext, useState, useEffect } from 'react';
import apiBackend from '../api/apiBackend.js';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiBackend.get('/api/current-user')
            .then(response => {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

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
        <UserContext.Provider value={{ user, setUser, handleLogout, login, loading }}>
            {!loading ? children : <p>Loading...</p>}
        </UserContext.Provider>
    );
};

export default UserProvider;
