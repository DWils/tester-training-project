import { useState, useEffect } from 'react';
import apiBackend from '../api/apiBackend.js';

const useProductSearch = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        apiBackend.get('/api/products').then(response => {
            setProducts(response.data);
            setFilteredProducts(response.data);
        });
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return { filteredProducts, handleSearch };
};

export default useProductSearch;