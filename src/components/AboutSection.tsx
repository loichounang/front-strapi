import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../../src/config/index';
import { Container, Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './aboutGalery.css'; // Importer le fichier CSS contenant les styles personnalisés pour le Slider

interface AboutGalery {
  id: number;
  attributes: {
    nom: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  }
}


export interface AboutData {
  id: number;
  attributes: {
    bienvenue: string;
    noms: string;
    description: string;
    message: string;
  
  };
}

export interface AboutResponse {
  data: AboutData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const settings = {
  dots: false, // Désactiver les points par défaut
  infinite: true,
  speed: 1500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
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

function AboutSection() {
  const [aboutGalery, setAboutGalery] = useState<AboutGalery[]>([]);

  useEffect(() => {
    const fetchAboutGalery = async () => {
      try {
        const response: AxiosResponse<{ data: AboutGalery[] }> = await axios.get(`${defaultConfig.apiUrl}/api/about-galeries?populate=*`);
        setAboutGalery(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAboutGalery();
  }, []);

  const [menuData, setMenuData] = useState<AboutData | null>(null);

useEffect(() => {
  fetch('http://localhost:1337/api/abouts')
    .then(response => response.json())
    .then((data: AboutResponse) => {
      if (data.data.length > 0) {
        setMenuData(data.data[0]); // menuData est maintenant un objet AboutData
      }
    })
    .catch(error => {
      console.error('Error fetching menu data:', error);
    });
}, []);

  if (!menuData) {
    return <div>Loading...</div>;
  }


  return (
    <Box id="a-propos" className='about-section' sx={{marginTop:'70px'}}>
        <Container >
        <Typography variant="h6"  align="center" sx={{fontFamily: 'Poppins, sans-serif'}}>{menuData.attributes.bienvenue}</Typography>
        <Typography variant="h2" align="center" sx={{fontFamily: 'Poppins, sans-serif'}} className="brand-name">{menuData.attributes.noms}</Typography>
        <hr style={{width:'200px',margin:'15px auto', height:'5px !important'}}/>
        <Typography variant="h4" align="center" sx={{fontFamily: 'Poppins, sans-serif', marginTop: '30px'}}>
        {menuData.attributes.description}
        </Typography>
        <Typography variant="h6" align="center" sx={{fontFamily: 'Poppins, sans-serif', marginTop: '10px'}}>
        {menuData.attributes.message}
        </Typography>
      </Container>
     
      <Container > 
      
      <Slider {...settings} className="service-slider">
        {aboutGalery.map((about, index) => (
          <Box key={index}>
            <img className='about-image' src={`http://localhost:1337${about.attributes.image.data.attributes.url}`} />
            <Typography className="title">{about.attributes.nom} </Typography>
          </Box>
        ))}
      </Slider>
      </Container> 
      </Box>
  
  );
}

export default AboutSection;
