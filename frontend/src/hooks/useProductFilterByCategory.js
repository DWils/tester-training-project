import { useState } from "react";
import apiBackend from "../api/apiBackend.js";

const useProductFilterByCategory = () => {
    const [filteredProductsByCategory, setFilteredProductsByCategory] = useState([]);

    const filterByCategory = (categoryId) => {
        if (!categoryId) {
            setFilteredProductsByCategory([]); // Réinitialiser si aucune catégorie sélectionnée
            return;
        }

        apiBackend.get(`/api/products?categoryId=${categoryId}`)
            .then(response => {
            console.log("Produits filtrés reçus :", response.data);
                setFilteredProductsByCategory(response.data);
            })
            .catch(error => {
                console.error("Erreur lors du filtrage des produits par catégorie:", error);
                setFilteredProductsByCategory([]); // Eviter undefined en cas d'erreur
            });
    };

    return { filteredProductsByCategory, filterByCategory };
};

export default useProductFilterByCategory;
