import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CategoryPage() {
  const [bedRoomFurniture, setBedRoomFurniture] = useState([]);
  const [livingRoomFurniture, setLivingRoomFurniture] = useState([]);
  const [diningRoomFurniture, setDiningRoomFurniture] = useState([]);
  const [sofaSets, setSofaSets] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async (category, setState) => {
      try {
        const response = await fetch(`/api/products/category?category=${category}`);
        const data = await response.json();
        setState(data.products);
      } catch (error) {
        console.error(`Error fetching ${category} products`, error);
      }
    };

    fetchProductsByCategory('BedRoomFurniture', setBedRoomFurniture);
    fetchProductsByCategory('LivingRoomFurniture', setLivingRoomFurniture);
    fetchProductsByCategory('DiningRoomFurniture', setDiningRoomFurniture);
    fetchProductsByCategory('SofaSets', setSofaSets);
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4 pl-7">Bedroom Furniture</h2>
      <div className="grid grid-cols-3 gap-4 mb-8 pl-7">
        {bedRoomFurniture.map(product => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <Link to={`/product/${product.slug}`}>
              <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover mb-4" />
            </Link>
            <h3 className="text-lg font-semibold mb-2">
              <Link to={`/product/${product.slug}`}>{product.title}</Link>
            </h3>
            <p className="text-gray-600">{product.category}</p>
            <p className={product.quantity < 5 ? 'text-red-500' : 'text-green-500'}>
              {product.quantity < 5 ? 'Low Stock' : 'In Stock'}
            </p>
            <p className="text-xl font-bold">Rs. {product.price}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 pl-7">Living Room Furniture</h2>
      <div className="grid grid-cols-3 gap-4 mb-8 pl-7">
        {livingRoomFurniture.map(product => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <Link to={`/product/${product.slug}`}>
              <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover mb-4" />
            </Link>
            <h3 className="text-lg font-semibold mb-2">
              <Link to={`/product/${product.slug}`}>{product.title}</Link>
            </h3>
            <p className="text-gray-600">{product.category}</p>
            <p className={product.quantity < 5 ? 'text-red-500' : 'text-green-500'}>
              {product.quantity < 5 ? 'Low Stock' : 'In Stock'}
            </p>
            <p className="text-xl font-bold">Rs. {product.price}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 pl-7">Dining Room Furniture</h2>
      <div className="grid grid-cols-3 gap-4 mb-8 pl-7">
        {diningRoomFurniture.map(product => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <Link to={`/product/${product.slug}`}>
              <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover mb-4" />
            </Link>
            <h3 className="text-lg font-semibold mb-2">
              <Link to={`/product/${product.slug}`}>{product.title}</Link>
            </h3>
            <p className="text-gray-600">{product.category}</p>
            <p className={product.quantity < 5 ? 'text-red-500' : 'text-green-500'}>
              {product.quantity < 5 ? 'Low Stock' : 'In Stock'}
            </p>
            <p className="text-xl font-bold">Rs. {product.price}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 pl-7">Sofa Sets</h2>
      <div className="grid grid-cols-3 gap-4 mb-8 pl-7">
        {sofaSets.map(product => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <Link to={`/product/${product.slug}`}>
              <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover mb-4" />
            </Link>
            <h3 className="text-lg font-semibold mb-2">
              <Link to={`/product/${product.slug}`}>{product.title}</Link>
            </h3>
            <p className="text-gray-600">{product.category}</p>
            <p className={product.quantity < 5 ? 'text-red-500' : 'text-green-500'}>
              {product.quantity < 5 ? 'Low Stock' : 'In Stock'}
            </p>
            <p className="text-xl font-bold">Rs. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
