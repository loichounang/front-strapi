import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';


export interface CarouselImagesProps {
  images: {src: string, mainTitle: string, secondaryTitle: string}[]
}

const CarouselImages = (props : CarouselImagesProps) => {

  const {images} = props;

  return (
    <Carousel showArrows={true} showStatus={false} showIndicators={true} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={2000} stopOnHover={true} emulateTouch={true}>
      {images.map( (image, idx) => 
        (<div key={`car ${idx} ${image.mainTitle}`}>
          <img src={image.src} alt="..." style={{ height: '570px', objectFit: 'cover' }}/>
          <Box sx={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '5px' }}>
            <Typography variant="h4" sx={{fontFamily:'Poppins', fontWeight:'bolder'}}    align="center" color="white">{image.mainTitle}</Typography>
            <Typography variant="h6" sx={{fontFamily:'Poppins'}}  align="center" color="white">{image.secondaryTitle}</Typography>
          </Box>
        </div>) 
      )}      
    </Carousel>
  );
};


export default CarouselImages;
