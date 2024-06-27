import { useState } from 'react';
import { Link } from 'react-router-dom';


const products = [
    { id: 1, name: 'Double Bed & Side Tables', price: '$800.00', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
    { id: 2, name: 'Double Bed & Side Tables', price: '$800.00', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
    { id: 3, name: 'Double Bed & Side Tables', price: '$800.00', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
    { id: 4, name: 'Double Bed & Side Tables', price: '$800.00', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
    { id: 5, name: 'Double Bed & Side Tables', price: '$800.00', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
    { id: 6, name: 'Double Bed & Side Tables', price: '$800.00', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
    { id: 8, name: 'Double Bed & Side Tables', price: '$800.00', imageUrl: 'https://i1.adis.ws/i/dreams/251-00325_main-shot_01_hart-upholstered-bed' },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 4 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 4 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto mt-8">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 25}%)` }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="w-1/4 flex-shrink-0 p-2">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-lg font-bold text-blue-600">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
                onClick={prevSlide}
            >
                &lt;
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
                onClick={nextSlide}
            >
                &gt;
            </button>
        </div>
    );
};

export default function FeaturedProducts() {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Featured Products</h2>
                    <p className="text-md text-gray-600 max-w-md">
                        Discover our featured products selected for their outstanding quality and design. These items are sure to enhance your home decor.
                    </p>
                    
                </div>
                <Link>
                    <Carousel />
                </Link>
               
            </div>
        </div>
    );
}
