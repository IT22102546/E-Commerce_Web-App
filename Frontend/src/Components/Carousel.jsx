import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

const CarouselComponent = () => {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div>
        <img src="https://shop.gkwretail.com/cdn/shop/files/14_1.jpg?v=1689256953&width=3840" alt="Slide 1" />
      </div>
      <div>
        <img src="https://shop.gkwretail.com/cdn/shop/files/18_1.jpg?v=1689347058&width=3840" alt="Slide 2" />
      </div>
      <div>
        <img src="https://shop.gkwretail.com/cdn/shop/files/17.1.jpg?v=1690794706&width=3840" alt="Slide 3" />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
