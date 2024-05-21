import React, { useState } from 'react';
import { Box, Typography, Card, Modal } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface PartenersSlideImagesProps {
  images: { src: string;}[];
}

const PartnersSlide= (props: PartenersSlideImagesProps) => {
  const { images } = props;
  const [selectedImage, setSelectedImage] = useState<{ src: string;} | null>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 572,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const handleImageClick = (image: { src: string;}) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Slider {...sliderSettings}>
        {images.map((image, idx) => (
          <div key={`card-${idx}`} onClick={() => handleImageClick(image)}>
           
              <img src={image.src} alt="partenaires" style={{ width: '200px', height: '60px', objectFit: 'contain', display: 'block', margin: '0 auto', marginRight:'2px' }} />
          </div>
        ))}
      </Slider>
      </>
      );
};

export default PartnersSlide;
