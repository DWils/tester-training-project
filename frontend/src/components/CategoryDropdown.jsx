import { useEffect, useState } from 'react';
import apiBackend from '../api/apiBackend.js';

const CategoryDropdown = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        apiBackend.get("/api/categories")
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setCategories([]);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setCategories([]);
            });
    }, []);

    return (
        <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
                id="categoryId"
                name="categoryId"
                className="form-control"
                value={selectedCategory}
                onChange={(event) => {
                    const categoryId = event.target.value;
                    setSelectedCategory(categoryId);
                    onCategoryChange(categoryId);
                }}
            >
                <option value="">All Categories</option>
                {Array.isArray(categories) && categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button
                className="btn btn-secondary mt-2"
                onClick={() => {
                    setSelectedCategory("");
                    onCategoryChange("");
                }}
            >
                Reset
            </button>
        </div>
    );
};

export default CategoryDropdown;