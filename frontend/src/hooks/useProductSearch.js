import { useState, useEffect } from 'react';
import apiBackend from '../api/apiBackend.js';

/**
 * Custom hook to handle product search functionality.
 * Fetches products from the backend and filters them based on the search term.
 *
 * @returns {Object} - An object containing the filtered products and the search handler function.
 */
const useProductSearch = () => {
    // State to store all products
    const [products, setProducts] = useState([]);
    // State to store filtered products based on search term
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products from the backend on component mount
    useEffect(() => {
        apiBackend.get('/api/products').then(response => {
            setProducts(response.data);
            setFilteredProducts(response.data);
        });
    }, []);

    // Function to filter products based on search term
    const handleSearch = (searchTerm) => {
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return { filteredProducts, handleSearch };
};

export default useProductSearch;