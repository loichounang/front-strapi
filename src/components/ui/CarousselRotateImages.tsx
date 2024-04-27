import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Paper, Grid, styled } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export interface CarouselRotateImagesProps {
  images: {src: string}[]
}


// Define the CSSProperties type for keyframe animations
type KeyframeCSSProperties = {
  [key: string]: React.CSSProperties;
};

// Define keyframes separately
// const keyframes: KeyframeCSSProperties = {
//   '@keyframes rotate': {
//     '0%': {
//       transform: 'rotateY(0deg)',
//     },
//     '100%': {
//       transform: 'rotateY(360deg)',
//     },
//   },
// };

// Define styles
const styles: KeyframeCSSProperties = {
  carousel: {
    position: 'relative',
    width: '200px',
    height: '200px',
    perspective: '1000px',
    animation: '$rotate 10s linear infinite',
  },
  carouselItem: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
  },
};


const CarouselRotateImages = (props : CarouselRotateImagesProps) => {

  const {images} = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);


  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Paper elevation={3} sx={styles.carousel}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              ...styles.carouselItem,
              transform: `rotateY(${currentIndex * (360 / images.length) - 90 + index * (360 / images.length)}deg)
                          translateZ(100px)`,
            }}
          >
            <img src={image.src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Paper>
      
    </Box>
  );
};


export default CarouselRotateImages;
