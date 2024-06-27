

export default function Footer() {
  return (
    <footer className="bg-slate-500 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">

          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Have a Look at Our Unique Selling Propositions</h2>
            <button className="bg-black  text-white py-2 px-4 rounded-full hover:bg-blue-700">
              Read more
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:w-1/2 lg:justify-end">
            <div className="mb-8 lg:mb-0 lg:mr-16 text-center lg:text-left">
              <p className="text-sm text-gray-400 mb-2">E-commerce web application .</p>
              <h3 className="text-4xl font-bold">99%</h3>
              <p className="text-lg">Customer satisfaction</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-400 mb-2">E-commerce web application .</p>
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="text-lg">Quality assurance</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
