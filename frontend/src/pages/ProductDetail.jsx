// src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/productApi'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    setProduct(getProductById(id))
  }, [id])

  if (!product) return <p>Chargement...</p>

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover mb-4" />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl font-bold">{product.price} €</p>
    </div>
  )
}

export default ProductDetail
