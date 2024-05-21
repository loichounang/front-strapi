import React, { useState } from 'react';
import { Box, Typography, Card, Modal } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface SlideImagesProps {
  images: { src: string; description: string, nom:string,prix:string }[];
}

const SlideImages = (props: SlideImagesProps & { showAllProducts: boolean }) => {
  const { images, showAllProducts } = props;
  const [selectedImage, setSelectedImage] = useState<{ src: string; description: string; nom:string; prix:string } | null>(null);

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

  const handleImageClick = (image: { src: string; description: string; nom:string; prix:string }) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Filtrer les images en fonction de showAllProducts
  const filteredImages = showAllProducts ? images : images.slice(0, 10);

  // Utiliser les images filtrées pour le carrousel
  return (
    <>
      <Slider {...sliderSettings}>
        {filteredImages.map((image, idx) => (
          <div key={`card-${idx}`} onClick={() => handleImageClick(image)}>
            <Card sx={{ position: 'relative',  margin: '0 auto', cursor: 'pointer', width: '95%', height: '400px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.05)'} }}>
              <img src={image.src} alt={image.description} style={{width: '100%', height: '200px', objectFit: 'contain',display: 'flex',justifyContent: 'center' }} />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '14px' }}>
                  {image.nom}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '14px' }}>
                  {image.description}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 'bolder', fontSize: '14px' }}>
                  {image.prix}
                </Typography>
              </Box>
            </Card>
          </div>
        ))}
      </Slider>
      <Modal open={selectedImage !== null} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px' }}>
          {selectedImage && (
            <>
              <img src={selectedImage.src} alt={selectedImage.description} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }} />
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center', mt: 2, fontSize: '18px' }}>
                {selectedImage.nom}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center', mt: 2, fontSize: '18px' }}>
                {selectedImage.description}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center', mt: 2, fontSize: '18px' }}>
                {selectedImage.prix}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default SlideImages;
