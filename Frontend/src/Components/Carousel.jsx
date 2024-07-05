import { useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const carouselRef = useRef(null);

  const handleImageClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
    setTimeout(() => setAutoPlay(true), 3000);
  };

  const imageStyle = {
    height: '500px',
    objectFit: 'cover', 
  };

  return (
    <Carousel 
      showThumbs={false} 
      infiniteLoop 
      autoPlay={autoPlay} 
      interval={3000} 
      showStatus={false}
      ref={carouselRef}
    >
      <div onClick={handleImageClick}>
        <img src="https://shop.gkwretail.com/cdn/shop/files/14_1.jpg?v=1689256953&width=3840" alt="Slide 1" style={imageStyle} />
      </div>
      <div onClick={handleImageClick}>
        <img src="https://shop.gkwretail.com/cdn/shop/files/18_1.jpg?v=1689347058&width=3840" alt="Slide 2" style={imageStyle} />
      </div>
      <div onClick={handleImageClick}>
        <img src="https://shop.gkwretail.com/cdn/shop/files/17.1.jpg?v=1690794706&width=3840" alt="Slide 3" style={imageStyle} />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
