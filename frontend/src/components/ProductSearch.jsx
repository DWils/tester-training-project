
import { useState } from 'react';

/**
 * Component for searching products.
 * Renders an input field for the search term and calls the onSearch function when the input changes.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onSearch - The function to call when the search term changes.
 */
// eslint-disable-next-line react/prop-types
const ProductSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Handle input change
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default ProductSearch;