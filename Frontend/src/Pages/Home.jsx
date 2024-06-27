

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-500 py-20">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4 text-white">Crafting Comfort, Redefining Spaces.</h1>
          <p className="text-4xl font-bold mb-8  text-white">Your Home, Your Signature Style!</p>
          <p className="text-md text-gray-900 mb-8">
            Explore our latest arrivals and give your home a unique look. Crafted with precision and style, our products are designed to enhance your living space.
          </p>
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for items"
              className="w-full border border-gray-300 rounded-full py-3 px-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-500"
            />
            <button className="absolute right-1 top-1 bottom-1 text-white bg-black hover:bg-blue-700 rounded-full px-4 py-2">
              Search
            </button>
          </div>
        </div>
      </div>

      
      <div className="bg-white py-16">
            Rest of the Home
      </div>
    </div>
  );
}
