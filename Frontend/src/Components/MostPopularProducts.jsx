import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Double Bed & Side Tables', price: '$800.00', description: 'A luxurious double bed with matching side tables.', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
  { id: 2, name: 'Double Bed & Side Tables', price: '$800.00', description: 'A luxurious double bed with matching side tables.', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
  { id: 3, name: 'Double Bed & Side Tables', price: '$800.00', description: 'A luxurious double bed with matching side tables.', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
  { id: 4, name: 'Double Bed & Side Tables', price: '$800.00', description: 'A luxurious double bed with matching side tables.', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
  { id: 5, name: 'Double Bed & Side Tables', price: '$800.00', description: 'A luxurious double bed with matching side tables.', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
  { id: 6, name: 'Double Bed & Side Tables', price: '$800.00', description: 'A luxurious double bed with matching side tables.', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
  { id: 7, name: 'Double Bed & Side Tables', price: '$800.00', description: 'A luxurious double bed with matching side tables.', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
  { id: 8, name: 'Double Bed & Side Tables', price: '$800.00', description: 'A luxurious double bed with matching side tables.', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
];

export default function MostPopularProducts() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold">Most Popular Products</h2>
            <p className="text-md text-gray-600">Check out some of our most popular items. These top sellers are loved by our customers!</p>
          </div>
          <Link to="/all-products">
            <button className="text-md bg-black text-white py-2 px-4 hover:bg-blue-700 rounded-lg">
              View All
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
             <Link>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
             </Link>
                <p className="text-lg font-bold text-blue-600">{product.price}</p>
                <p className="text-md text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
