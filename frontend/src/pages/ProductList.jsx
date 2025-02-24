import {useState, useEffect} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const {user} = useAuth();

    // Vérifier si user est bien défini
    const currentUser = user || JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetch("http://localhost:8080/api/products", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erreur HTTP : ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error("Erreur de chargement :", error));
    }, []);

    const handleDelete = async (productId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

        try {
            const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${currentUser?.token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erreur de suppression");
            }

            setProducts(products.filter((p) => p.productId !== productId));
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🛍️ Liste des Produits</h2>

            {/* Bouton Ajouter (visible pour VENDOR et ADMIN) */}
            {currentUser && (currentUser.role === "VENDOR" || currentUser.role === "ADMIN") && (
                <button onClick={() => console.log("Ajouter produit")}>➕ Ajouter un produit</button>
            )}

            <div className="row">
                {products.map((product) => (
                    <div key={product.productId} className="col-md-4">
                        <div className="card shadow-sm mb-4">
                            {product.productImageUrl && (
                                <img
                                    src={product.productImageUrl}
                                    className="card-img-top"
                                    alt={product.productName}
                                    style={{height: "200px", objectFit: "cover"}}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">{product.productDescription}</p>
                                <p className="card-text fw-bold text-danger">
                                    💰 {product.productPrice.toFixed(2)} €
                                </p>

                                {/* Boutons Modifier/Supprimer (uniquement pour VENDOR et ADMIN) */}
                                {currentUser && (currentUser.role === "VENDOR" || currentUser.role === "ADMIN") && (
                                    <>
                                        <button onClick={() => console.log("Modifier", product.productId)}>
                                            ✏️ Modifier
                                        </button>
                                        <button onClick={() => handleDelete(product.productId)}>
                                            ❌ Supprimer
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
