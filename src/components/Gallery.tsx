// Gallery.tsx
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../config/index';
import { Box, Grid, Typography } from '@mui/material';

interface ImageData {
  id: number;
  attributes: {
    url: string;
  };
}

interface GallerySection {
  id: number;
  attributes: {
    galerie: string;
    images: {
      data: ImageData[];
    };
  };
}

interface GalleryResponse {
  data: GallerySection[];
}

function Gallery() {
  const [gallerySections, setGallerySections] = useState<GallerySection[]>([]);

  useEffect(() => {
    const fetchGallerySections = async () => {
      try {
        const response: AxiosResponse<GalleryResponse> = await axios.get(`${defaultConfig.apiUrl}/api/galeries?populate=*`);
        setGallerySections(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGallerySections();
  }, []);

  return (
    <Grid item xs={12}>
      {gallerySections.map((section) => (
        <Grid item xs={12} key={section.id}>
          <Box>
            <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 'bold', color: 'white' }}>{section.attributes.galerie}</Typography>
            <br />
            <Box>
              {section.attributes.images.data.map((image) => (
                <img width='100px' key={image.id} src={`http://localhost:1337${image.attributes.url}`} style={{ marginRight: '10px' }} />
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default Gallery;
