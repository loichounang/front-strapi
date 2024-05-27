import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Paper, Grid, styled } from '@mui/material';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export interface SlideImagesProps {
  images: {src: string, description: string}[]
}



const SlideImages = (props : SlideImagesProps) => {

  const {images} = props;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
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
          slidesToShow: 1,
        },
      },
    ],
  };

  

  return (
    <Slider {...sliderSettings}>
      {images.map( (image, idx) => 
        (<div key={`car ${idx} ${image.description}`}>
          <div style={{
            outline: 'none',
            border: 'none',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto'
          } }>
            <img src={image.src} alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'  }}/>
          </div>
          <Box sx={{ textAlign: 'center', padding: '20px', borderRadius: '5px' }}>            
            <Typography variant="body1" sx={{fontFamily:'Poppins', fontWeight:'bold'}} align="center">{image.description}</Typography>
          </Box>
        </div>) 
      )}      
    </Slider>
  );
};


export default SlideImages;
