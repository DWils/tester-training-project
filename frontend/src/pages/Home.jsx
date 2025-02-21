// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../api/productApi'


const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
    .then(response => {
      setProducts(response.data)
    })
    .catch(error => {
      console.error(error)
    })
    console.log(products)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Nos Produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products ? products.map(product => (
          <ProductCard key={product.id} product={product} />
        )) : <p>aucun produit disponible</p>}
      </div>
    </div>
  )
}

export default Home
