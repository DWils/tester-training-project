// src/utils/auth.js

export const checkAuth = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {
        window.location.href = '/login'; // Redirect to the login page if no token is found
        throw new Error('No token found');
    }

    try {
        const response = await fetch('/api/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const text = await response.text();
        console.log('Response text:', text);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Error in checkAuth:', error);
        throw error;
    }
};

export const handleLogout = async () => {
    await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // 🔥 Supprime la session côté serveur
    });

    localStorage.removeItem('token'); // Clean up the token from local storage
    localStorage.removeItem('role'); // Clean up the role from local storage
    window.location.href = '/login'; // Redirect to the login page
};