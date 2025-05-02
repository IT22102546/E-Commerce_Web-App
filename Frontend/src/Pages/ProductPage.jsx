import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Modal } from 'flowbite-react';

export default function ProductPage() {
  const location = useLocation();
  const { category } = queryString.parse(location.search);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [showColorModal, setShowColorModal] = useState(true);
  const [roofColor, setRoofColor] = useState('#ffffff');
  const [wallColor, setWallColor] = useState('#f0f0f0');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Expanded color palette with 100+ options
  const colorPalette = {
    roof: [
      // Whites and neutrals (25)
      '#FFFFFF', '#F8F8F8', '#F5F5F5', '#F0F0F0', '#EAEAEA',
      '#E0E0E0', '#D5D5D5', '#CCCCCC', '#C0C0C0', '#B5B5B5',
      '#FFF8E7', '#FFF0D4', '#FFE8C2', '#FFE0B0', '#FFD8A0',
      '#FFD092', '#FFC885', '#FFC078', '#FFB86C', '#FFB061',
      '#F0F8FF', '#E6F0FA', '#DCE8F5', '#D2E0F0', '#C8D8EB',
      
      // Light colors (25)
      '#FFFACD', '#FAFAD2', '#FFF5EE', '#FDF5E6', '#FFEFD5',
      '#FFE4B5', '#FFDAB9', '#FFDEAD', '#F5DEB3', '#F0E68C',
      '#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#DA70D6',
      '#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C',
      '#98FB98', '#90EE90', '#00FA9A', '#00FF7F', '#3CB371'
    ],
    wall: [
      // Earth tones (25)
      '#D2B48C', '#BC8F8F', '#A0522D', '#8B4513', '#CD853F',
      '#D2691E', '#B8860B', '#DAA520', '#F4A460', '#DEB887',
      '#F5DEB3', '#F5F5DC', '#FAF0E6', '#FDF5E6', '#FFF8DC',
      '#F0E68C', '#EEE8AA', '#BDB76B', '#F0E68C', '#DAA520',
      '#C0C0C0', '#A9A9A9', '#808080', '#696969', '#778899',
      
      // Cool colors (25)
      '#ADD8E6', '#87CEEB', '#87CEFA', '#00BFFF', '#1E90FF',
      '#6495ED', '#4682B4', '#5F9EA0', '#20B2AA', '#008B8B',
      '#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#DA70D6',
      '#9370DB', '#8A2BE2', '#9400D3', '#9932CC', '#8B008B',
      '#7FFFD4', '#66CDAA', '#00FA9A', '#00FF7F', '#3CB371',
      
      // Warm colors (25)
      '#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C',
      '#DC143C', '#FF0000', '#B22222', '#8B0000', '#FF6347',
      '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FFFFE0',
      '#FFFACD', '#FAFAD2', '#FFF5EE', '#FDF5E6', '#FFEFD5',
      '#FFE4B5', '#FFDAB9', '#FFDEAD', '#F5DEB3', '#F0E68C',
      
      // Greens and blues (25)
      '#98FB98', '#90EE90', '#00FA9A', '#00FF7F', '#3CB371',
      '#2E8B57', '#228B22', '#008000', '#006400', '#9ACD32',
      '#7FFFD4', '#66CDAA', '#00FA9A', '#00FF7F', '#3CB371',
      '#ADD8E6', '#87CEEB', '#87CEFA', '#00BFFF', '#1E90FF',
      '#6495ED', '#4682B4', '#5F9EA0', '#20B2AA', '#008B8B'
    ]
  };

  // Load saved colors from localStorage
  useEffect(() => {
    const savedColors = localStorage.getItem('roomColors');
    if (savedColors) {
      const { roof, wall } = JSON.parse(savedColors);
      setRoofColor(roof);
      setWallColor(wall);
    }
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, selectedPriceRange]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/products/getproducts?searchTerm=${searchTerm}&page=${currentPage}&category=${selectedCategory}&priceRange=${selectedPriceRange}`
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const getRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Save colors to localStorage
      localStorage.setItem('roomColors', JSON.stringify({
        roof: roofColor,
        wall: wallColor
      }));
      
      const res = await fetch('/api/recommendation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roofColor: roofColor.replace('#', ''),
          wallColor: wallColor.replace('#', ''),
          category: selectedCategory || 'LivingRoomFurniture'
        }),
      });

      const responseText = await res.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Invalid response from server');
      }
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get recommendations');
      }

      // Ensure colors are properly formatted
      const formattedRecs = data.recommendations.map(rec => ({
        ...rec,
        hex: rec.hex.startsWith('#') ? rec.hex : `#${rec.hex}`
      }));
      
      setRecommendations(formattedRecs);
      
    } catch (error) {
      console.error('Recommendation error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
      setShowColorModal(false);
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
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    setCurrentPage(1);
  };

  const resetColors = () => {
    setRoofColor('#ffffff');
    setWallColor('#f0f0f0');
  };

  return (
    <div className="container mx-auto py-6">
      {/* Color Recommendation Modal */}
      <Modal show={showColorModal} onClose={() => setShowColorModal(false)} size="3xl">
        <Modal.Header>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold">Select Your Room Colors</h2>
            <div className="flex items-center">
              <div className="flex mr-4">
                <div 
                  className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                  style={{ backgroundColor: roofColor }}
                />
                <div 
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: wallColor }}
                />
              </div>
              <button
                onClick={resetColors}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Reset
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-8">
            <p className="text-base leading-relaxed text-gray-500">
              Choose colors that match your room to get personalized furniture recommendations.
            </p>
            
            {/* Roof Color Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-900">Ceiling Color</label>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{roofColor}</span>
              </div>
              <div className="grid grid-cols-10 gap-2 mb-4">
                {colorPalette.roof.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full transition-all transform hover:scale-110 ${
                      roofColor === color ? 'ring-4 ring-blue-500 scale-110' : 'ring-1 ring-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setRoofColor(color)}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={roofColor}
                  onChange={(e) => setRoofColor(e.target.value)}
                  className="w-20 h-12 cursor-pointer rounded-lg border border-gray-300"
                />
                <button 
                  onClick={() => setRoofColor('#FFFFFF')}
                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  White
                </button>
              </div>
            </div>

            {/* Wall Color Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-900">Wall Color</label>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{wallColor}</span>
              </div>
              <div className="grid grid-cols-10 gap-2 mb-4">
                {colorPalette.wall.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full transition-all transform hover:scale-110 ${
                      wallColor === color ? 'ring-4 ring-blue-500 scale-110' : 'ring-1 ring-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setWallColor(color)}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={wallColor}
                  onChange={(e) => setWallColor(e.target.value)}
                  className="w-20 h-12 cursor-pointer rounded-lg border border-gray-300"
                />
                <button 
                  onClick={() => setWallColor('#F0F0F0')}
                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Neutral
                </button>
              </div>
            </div>

            {/* Room Preview */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium mb-3 text-gray-700">Room Preview</h4>
              <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-inner">
                <div 
                  className="absolute top-0 left-0 w-full h-1/4 transition-colors duration-300"
                  style={{ backgroundColor: roofColor }}
                />
                <div 
                  className="absolute top-1/4 left-0 w-full h-3/4 transition-colors duration-300"
                  style={{ backgroundColor: wallColor }}
                />
                {/* Sample furniture items */}
                <div 
                  className="absolute bottom-6 left-1/4 w-16 h-16 rounded-md border-2 border-white shadow-lg transition-colors duration-300"
                  style={{ backgroundColor: recommendations[0]?.hex || '#773F1A' }}
                />
                <div 
                  className="absolute bottom-8 right-1/4 w-12 h-12 rounded-md border-2 border-white shadow-lg transition-colors duration-300"
                  style={{ backgroundColor: recommendations[1]?.hex || '#4A3123' }}
                />
              </div>
            </div>

            {isLoading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Analyzing color combinations...</p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded text-sm">
                {error}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <button
            onClick={() => setShowColorModal(false)}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Skip Recommendations
          </button>
          <button
            onClick={getRecommendations}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Get Recommendations'}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mb-8 p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              Recommended Colors For Your Room
              <span className="block text-sm font-normal text-gray-500 mt-1">
                Based on {roofColor} ceiling and {wallColor} walls
              </span>
            </h3>
            <button 
              onClick={() => setShowColorModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Change Colors
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                  {/* Roof section */}
                  <div 
                    className="absolute top-0 left-0 w-full h-1/4 transition-colors duration-300"
                    style={{ backgroundColor: roofColor }}
                  />
                  {/* Wall section */}
                  <div 
                    className="absolute top-1/4 left-0 w-full h-3/4 transition-colors duration-300"
                    style={{ backgroundColor: wallColor }}
                  />
                  {/* Furniture representation */}
                  <div 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-md border-2 border-white shadow-lg transition-colors duration-300"
                    style={{ backgroundColor: rec.hex }}
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-lg">{rec.name}</h4>
                  <div className="flex justify-center items-center mt-2 mb-3">
                    <span 
                      className="inline-block w-5 h-5 rounded-full mr-2 border border-gray-300"
                      style={{ backgroundColor: rec.hex }}
                    />
                    <span className="text-sm font-mono">{rec.hex}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Match: {rec.score}%</span>
                    <span>Harmony: {rec.harmony}%</span>
                  </div>
                  <div className="mt-3 flex justify-center space-x-1">
                    {[roofColor, wallColor, rec.hex].map((color, i) => (
                      <span 
                        key={i}
                        className="inline-block w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                        title={i === 0 ? 'Ceiling' : i === 1 ? 'Wall' : 'Furniture'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Product Page Content */}
      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-1/4 p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Categories</h2>
            <ul>
              {['BedRoomFurniture', 'LivingRoomFurniture', 'DinningRoomFurniture', 'SofaSets'].map((cat) => (
                <li
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`cursor-pointer mb-2 p-2 rounded transition-colors ${
                    selectedCategory === cat ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {cat.replace(/([A-Z])/g, ' $1').trim()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Price Range</h2>
            <ul>
              {['3000-5000', '5001-10000', '10001-50000', '50001-100000'].map((range) => (
                <li
                  key={range}
                  onClick={() => handlePriceRangeChange(range)}
                  className={`cursor-pointer mb-2 p-2 rounded transition-colors ${
                    selectedPriceRange === range ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Rs. {range.split('-')[0]} - Rs. {range.split('-')[1]}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="w-full md:w-3/4 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0"
            />
            <span className="text-lg font-semibold">
              {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.slug}?roofColor=${roofColor.replace('#', '')}&wallColor=${wallColor.replace('#', '')}`}>
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link 
                      to={`/product/${product.slug}?roofColor=${roofColor.replace('#', '')}&wallColor=${wallColor.replace('#', '')}`}
                      className="hover:text-blue-600"
                    >
                      {product.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-1 capitalize">
                    {product.category.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <p className={product.quantity < 5 ? 'text-red-500' : 'text-green-500'}>
                      {product.quantity < 5 ? 'Low Stock' : 'In Stock'}
                    </p>
                    <p className="text-xl font-bold">Rs. {product.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}