import React, { useEffect, useState } from 'react';

import { Box, Typography, Button, Stack, Divider,Card } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Grid, IconButton } from '@mui/material';


import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import {  ICategoryProduct } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';

import { globalConfig } from 'config';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';



const CategoryStack = (category: ICategoryProduct ) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Stack
      flexDirection='column'
      textAlign="center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Card
          sx={{
            mt: 1,
            width: '100%',
            background: 'rgba(84, 151, 209, 0.5)',
            backgroundImage: `url('${globalConfig.get().apiUrl}/download/${category.image_Url}')`,
            padding: '1rem',
            height: '200px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            
          }}

          
        >
          <Typography sx={{  color: 'white', marginTop:'150px' }} {...typographyGroupBoxStyling} >
            {category.nom}
          </Typography>
         
        </Card>
      ) : (
        <Card
          sx={{
            mt: 1,
            width: '100%',
            backgroundImage: `url('${globalConfig.get().apiUrl}/download/${category.image_Url}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '1rem',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            borderRadius: '2%',
            objectFit:'cover'
            
          }}
        >
          <Typography sx={{ background: 'rgba(0, 0, 0, 0.5)', color: 'white' }} {...typographyGroupBoxStyling} >
            {category.nom}
          </Typography>
        </Card>
      )}
    </Stack>
  );
};

const OurServices = () => {

  const { t, i18n } = useTranslation();  // TitreBienvenue

  const {  getCategories} = useMainInformation();

  
  const {data: categories} = useQuery<ICategoryProduct[]>( ['Category'], () => getCategories());

  


  return (
    <Box bgcolor="#F7F7F7" color="back" py={0.25} px={2} textAlign="center" mt={5}>
        <Grid container justifyContent="space-between" alignItems="center">
            
          { (categories || []).map( (category, idx) =>    
          (<Grid item xs={6}  sm={6} md={2} key={` ke ${idx} ${category.nom}`}>
                   
            <CategoryStack {...category}/> 
            
          </Grid>)  
          )}
        </Grid>
    </Box>
  );
};

export default OurServices;
