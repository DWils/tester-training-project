import { useState, useEffect } from 'react'
import apiBackend from "../api/apiBackend.js";

const HomeView = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        apiBackend.get("/api/products").then(response => {
            setProducts(response.data);
        })
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🛍️ Liste des Produits</h2>
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
                                {/*{currentUser && (currentUser.role === "VENDOR" || currentUser.role === "ADMIN") && (*/}
                                {/*    <>*/}
                                {/*        <button onClick={() => console.log("Modifier", product.productId)}>*/}
                                {/*            ✏️ Modifier*/}
                                {/*        </button>*/}
                                {/*        <button onClick={() => handleDelete(product.productId)}>*/}
                                {/*            ❌ Supprimer*/}
                                {/*        </button>*/}
                                {/*    </>*/}
                                {/*)}*/}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default HomeView
