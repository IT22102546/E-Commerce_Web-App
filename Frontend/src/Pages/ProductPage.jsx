import { useState, useEffect } from 'react';
//import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProductPage() {
  //const { currentUser } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, selectedPriceRange]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products/getproducts?searchTerm=${searchTerm}&page=${currentPage}&category=${selectedCategory}&priceRange=${selectedPriceRange}`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex">
        <aside className="w-1/4 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Categories</h2>
            <ul>
              {['BedRoomFurniture', 'LivingRoomFurniture', 'DinningRoomFurniture', 'SofaSets'].map(category => (
                <li
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`cursor-pointer mb-2 ${selectedCategory === category ? 'bg-gray-200' : ''}`}
                >
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Price Range</h2>
            <ul>
              {['3000-5000', '5001-10000', '10001-50000', '50001-100000'].map(range => (
                <li
                  key={range}
                  onClick={() => handlePriceRangeChange(range)}
                  className={`cursor-pointer mb-2 ${selectedPriceRange === range ? 'bg-gray-200' : ''}`}
                >
                  Rs. {range.split('-')[0]} - Rs. {range.split('-')[1]}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <span className="text-lg font-semibold">Total Products: {totalProducts}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
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
          <div className="flex justify-center mt-6">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mx-2 px-4 py-2 bg-gray-200 rounded">
              Previous
            </button>
            <span className="mx-2 px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="mx-2 px-4 py-2 bg-gray-200 rounded">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
