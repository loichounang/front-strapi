import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../config/index';
import { Box, Typography, Container } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './herosection.css';

interface ImageData {
  id: number;
  attributes: {
    url: string;
  };
}

interface HeroSectionResponse {
  data: {
    id: number;
    attributes: {
      description: string;
      slider: {
        data: ImageData[];
      };
    };
  };
}

function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Activer le défilement automatique
    autoplaySpeed: 2000, // Définir la vitesse de défilement automatique (en millisecondes)
  };

 

  const [heroSection, setHeroSection] = useState<HeroSectionResponse | null>(null);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const response: AxiosResponse<HeroSectionResponse> = await axios.get(`${defaultConfig.apiUrl}/api/herosection?populate=*`);
        setHeroSection(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroSection();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ marginTop: '150px'}}>
   
      <Slider {...settings}>
        {heroSection && heroSection.data.attributes.slider.data.map((image) => (
          <Box key={image.id}>
            <img  className='slide' src={`http://localhost:1337${image.attributes.url}`}  />
            <Typography color='white'>Description: {heroSection.data.attributes.description}</Typography>
          </Box>
        ))}
      </Slider>
 
  </Container>
  );
}

export default HeroSection;
