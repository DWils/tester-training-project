import { useState, useEffect } from 'react';

const AddProduct = () => {
  // Définition des états pour chaque champ
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);  // Tableau des catégories récupérées

  // Récupérer les catégories depuis le backend au montage du composant
  useEffect(() => {
    fetch('http://localhost:8080/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
      });
  }, []);

  // Fonction handleSubmit pour envoyer les données à l'API
  const handleSubmit = (e) => {
    e.preventDefault();

    // Création de l'objet produit
    const newProduct = {
      productName: name,
      productDescription: description,
      productPrice: parseFloat(price),
      creationDate: new Date().toISOString().split('T')[0],  // Date actuelle au format yyyy-MM-dd
      category: { categoryId: categoryId },  // ID de la catégorie sélectionnée
      productImageUrl: imageUrl,
    };

    // Requête POST avec fetch
    fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
        // 'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de l\'ajout du produit');
        }
        return res.json();
      })
      .then(() => {
        window.location.href = '/products';
      })
      .catch((error) => {
        console.error('Erreur:', error.message);
        alert('Une erreur est survenue lors de l\'ajout du produit');
      });
  };

  return (
    <div>
      <h2>Ajouter un Produit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom du produit</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Prix</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label>URL de l&apos;image</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
