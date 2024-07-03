import Carousel from '../Components/Carousel';
import Categories from '../Components/Categories';
import FeaturedProducts from '../Components/FeaturedProducts';
import MostPopularProducts from '../Components/MostPopularProducts';


export default function Home() {
  return (
    <div className="flex flex-col w-full">
     
     <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Carousel />
        </div>
      </div>
    
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
        
          <FeaturedProducts/>
    
        </div>
      </div>


      <Categories />

      <MostPopularProducts/>
      <div className="bg-white py-16">
      
      </div>
    </div>
  );
}
