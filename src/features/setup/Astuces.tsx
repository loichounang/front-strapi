import React, { useEffect, useState } from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import YouTube from 'react-youtube';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IAstuce, defaultAstuce } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

// Style personnalisé pour les titres
const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  fontFamily: 'Poppins',
  textAlign: 'center'
});

// Style personnalisé pour les sous-titres
const Subtitle = styled(Typography)({
  fontSize: '18px',
  marginBottom: '40px',
  fontFamily: 'Poppins',
});

const Astuces = () => {
  const { getAstuces} = useMainInformation();
  const {data: astucesInformations} = useQuery<IAstuce[]>( ['Astuce'], () => getAstuces());
  const [astuceInformation, setMainInformation] = useState<IAstuce>(defaultAstuce );

  useEffect(() => {
    if(!isFalsy(astucesInformations) && astucesInformations?.length>0)
      setMainInformation(astucesInformations[0]);
  }, [astucesInformations]);

  const opts = {
    playerVars: {
      // Désactiver les suggestions de vidéos à la fin de la lecture
      rel: 0
    }
  };

  // Configuration du slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 572,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth='xl' sx={{marginTop : '10px'}}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Box  textAlign="justify">
          <Title sx={{fontSize: '45px'}} {...typographySmallHandWriting}>{astuceInformation.titreAstuce}</Title>
          <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'justify' }}>
            <Subtitle>{astuceInformation.titreSecondaire}</Subtitle>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}></Grid>
    </Grid>

    <Slider {...sliderSettings} >
      {/* Filtrer et mapper les vidéos non vides */}
      {[
        astuceInformation.lienVideo1,
        astuceInformation.lienVideo2,
        astuceInformation.lienVideo3,
        astuceInformation.lienVideo4,
        astuceInformation.lienVideo5,
        astuceInformation.lienVideo6,
        astuceInformation.lienVideo7,
        astuceInformation.lienVideo8
      ].filter(video => video !== '').map((videoId, index) => (
        <div key={index}>
          <YouTube videoId={videoId} opts={opts} />
        </div>
      ))}
    </Slider>
  </Container>
  );
}

export default Astuces;
