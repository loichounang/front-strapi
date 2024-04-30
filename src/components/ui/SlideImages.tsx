import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface SlideImagesProps {
  images: { src: string; description: string }[];
}

const SlideImages = (props: SlideImagesProps) => {
  const { images } = props;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 572,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {images.map((image, idx) => (
        <div key={`card-${idx}`}>
          <Card style={{ width: '200px', height: '200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={image.src} alt={image.description} style={{ width: '75%', height: 'auto', objectFit: 'cover', marginTop:'20px' }} />
          </Card>
          <Box sx={{ textAlign: 'center', padding: '20px', borderRadius: '5px' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }} align="center">
              {image.description}
            </Typography>
          </Box>
        </div>
      ))}
    </Slider>
  );
};

export default SlideImages;
