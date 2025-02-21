import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const ProductCard = ({ key, product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div key={key} className="product-card p-4 border rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-green-500 font-semibold">Price: ${product.price}</p>
            <button 
                onClick={handleClick} 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
                View Details
            </button>
        </div>
    );
};
export default ProductCard;