import { Link } from "react-router-dom";


const categories = [
    { name: 'Bedroom Furniture', imageUrl: 'https://example.com/bedroom.jpg' },
    { name: 'Living Room Furniture', imageUrl: 'https://example.com/livingroom.jpg' },
    { name: 'Dining Room Furniture', imageUrl: 'https://example.com/diningroom.jpg' },
    { name: 'Sofa Sets', imageUrl: 'https://example.com/sofa.jpg' },
];

export default function Categories() {
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">View Our Range Of Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col items-center">
                            <Link>
                                <img src={category.imageUrl} alt={category.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h3 className="text-xl font-semibold">{category.name}</h3>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
