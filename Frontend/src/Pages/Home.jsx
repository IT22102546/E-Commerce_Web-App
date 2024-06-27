import Categories from '../Components/Categories';
import FeaturedProducts from '../Components/FeaturedProducts';


export default function Home() {
  return (
    <div className="flex flex-col w-full">
     
      <div className="min-h-screen w-full flex flex-col items-center justify-center py-20 bg-slate-500">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4 text-white">Crafting Comfort, Redefining Spaces.</h1>
          <p className="text4-xl mb-8 font-bold text-white">Your Home, Your Signature Style!</p>
          <p className="text-md text-black mb-8">
            Explore our latest arrivals and give your home a unique look. Crafted with precision and style, our products are designed to enhance your living space.
          </p>
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for items"
              className="w-full border border-gray-300 rounded-full py-3 px-4 pr-16 focus:outline-none focus:ring-2  "
            />
            <button className="absolute right-1 top-1 bottom-1 text-white bg-black hover:bg-blue-700 rounded-full px-4 py-2">
              Search
            </button>
          </div>
        </div>
      </div>

    
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
        
          <FeaturedProducts/>
    
        </div>
      </div>


      <Categories />

      {/* Other Sections (Placeholder for now) */}
      <div className="bg-white py-16">
      
      </div>
    </div>
  );
}
