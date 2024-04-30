import React from 'react';
import { Box, Typography, Button, Grid, useMediaQuery, Theme } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';


export interface CarouselImagesProps {
  images: {src: string, mainTitle: string, secondaryTitle: string}[]
}

const CarouselImages = (props : CarouselImagesProps) => {

  const {images} = props;
  // Utilisez useMediaQuery pour détecter la taille de l'écran
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Carousel showArrows={true} showStatus={false} showIndicators={true} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={4000} stopOnHover={true} emulateTouch={true}>
      {images.map( (image, idx) => 
        (<div key={`car ${idx} ${image.mainTitle}`}>
          <img src={image.src} alt="..." style={{ height: '350px', objectFit: 'fill', background: 'rgba(0, 0, 0, 0.5)' }}/>
          <Box sx={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', padding: '20px', borderRadius: '5px' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item md={12}>
                <Typography variant="h4" sx={{fontFamily:'Poppins', fontWeight:'bold'}} align="center" color="white">{image.mainTitle}</Typography>
              </Grid>
              {/* Conditionnez l'affichage du titre secondaire en fonction de la taille de l'écran */}
              {!isSmallScreen && (
                <Grid item md={12}>
                  <Typography variant="h6" sx={{fontFamily:'Poppins'}} align="center" color="white">{image.secondaryTitle}</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </div>) 
      )}      
    </Carousel>
  );
};


export default CarouselImages;
