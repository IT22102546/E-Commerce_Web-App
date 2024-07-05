import { Link } from "react-router-dom";

const categories = [
    { name: 'BedRoomFurniture', imageUrl: 'https://mywayneshome.com/cdn/shop/files/media_a713c2af-9e72-4304-8452-ed6f8aca5b86_grande.jpg?v=1712009056' },
    { name: 'LivingRoomFurniture', imageUrl: 'https://d2kz53n3bzvihv.cloudfront.net/resized/790_395_0_255_255_255/media/gbu0/categoryxxl/image/DesktopHeader-P393_LLA005_LLA008_LLA010_A.jpg.jpeg' },
    { name: 'DinningRoomFurniture', imageUrl: 'https://furnituretogocatalogs.com/cdn/shop/products/312a1665-ce0e-4cfe-9567-7d1c55aee59f.jpg?v=1705683723' },
    { name: 'SofaSets', imageUrl: 'https://m.media-amazon.com/images/I/71qKarjtXpL._AC_SL1491_.jpg' },
];

export default function Categories() {
    return (
        <div className="bg-slate-200 py-16 w-full">
            <div className="mx-auto px-4 relative">
                <h2 className="text-3xl font-bold text-center mb-3">View Our Range Of Categories</h2>
                <p className="text-md text-gray-600 text-center mb-8">Check out some of our Categories. These top sellers are loved by our customers!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col items-center">
                            <Link to={`/product-page?category=${category.name}`}>
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
