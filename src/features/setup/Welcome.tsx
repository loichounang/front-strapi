import React, { useEffect, useState } from 'react';

import { Box, Typography, Button, Stack, Divider,Container,CardMedia } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Grid, IconButton } from '@mui/material';


import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import {  ISlideImage,  } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';

import { globalConfig } from 'config';
import SlideImages from 'components/ui/SlideImages';
import {  typographySmallHandWriting } from 'themes/commonStyles';
import { Link } from 'react-router-dom';

const Welcome = () => {
 
  const [showAllProducts, setShowAllProducts] = useState(false);

 
  const { t, i18n } = useTranslation();  // TitreBienvenue

  const { getSlideImages } = useMainInformation();
  const {data: slideImages} = useQuery<ISlideImage[]>( ['SlideImage'], () => getSlideImages());

  

console.log(t('Welcome to'));

      return (
        <Box bgcolor="#F7F7F7" color="back" py={0.25} px={2} textAlign="center" mt={5} sx={{ height: '540px' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
              <Stack flexDirection='column' textAlign="center">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                    {t('Nouveaux')}
                  </Typography>
                  <Link to={'/all-products'} style={{ fontFamily: 'Poppins', fontWeight: '500' }} onClick={() => setShowAllProducts(true)}>
                    {t('Voir plus')}
                  </Link>
                </Box>
                <Typography sx={{ marginTop: '10px' }}></Typography>
                <SlideImages images={(slideImages || []).map(x => ({ description: x.description, nom: x.nom, prix: x.prix, src: `${globalConfig.get().apiUrl}/download/${x.image_Url}` }))} showAllProducts={showAllProducts} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      );
    };

export default Welcome