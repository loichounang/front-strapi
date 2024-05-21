import React, { useState } from 'react';
import { Box, Typography, Card, Modal, Grid } from '@mui/material'; // Import de Grid depuis @mui/material

export interface ProductsImagesProps {
  images: { src: string; description: string; nom: string; prix: string }[];
}

const News = (props:  ProductsImagesProps) => {
  const { images } = props;

  const [selectedImage, setSelectedImage] = useState<{ src: string; description: string; nom: string; prix: string } | null>(null);

  const handleImageClick = (image: { src: string; description: string; nom: string; prix: string }) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Grid container spacing={2} > {/* Utilisation de Grid container pour créer une grille */}
        {images.map((image, idx) => ( // Mapping à travers les images
          <Grid item xs={6}  md={2} key={`card-${idx}`}> {/* Chaque image est placée dans un Grid item */}
            <Card onClick={() => handleImageClick(image)} sx={{ cursor: 'pointer', width: '100%', height: '400px', borderRadius:'8px',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.05)'} }}>
              <img src={image.src} alt={image.description} style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
              <Box sx={{ p: 2}}>
                <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '14px' }}>
                  {image.nom}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '14px' }}>
                  {image.description}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '14px' }}>
                  {image.prix}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
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
      <Typography sx={{marginTop:'50px'}}></Typography>
    </>
  );
};

export default News;
