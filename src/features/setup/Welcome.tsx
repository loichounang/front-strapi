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

const Welcome = () => {
 

  const { t, i18n } = useTranslation();  // TitreBienvenue

  const { getSlideImages } = useMainInformation();
  const {data: slideImages} = useQuery<ISlideImage[]>( ['SlideImage'], () => getSlideImages());

  

console.log(t('Welcome to'));



  return (
    <Box bgcolor="#F7F7F7" color="back" py={0.25} px={2} textAlign="center" mt={5}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'justify'}}>
                <Typography variant="h5" sx={{fontFamily:'Poppins', fontWeight:'bold'}}> 
                  {t('Nouveaux')}
                </Typography>                
              </Box>
              <Typography sx={{marginTop:'10px'}}></Typography>
              <SlideImages images={ (slideImages || []).map(x => ({ description : x.description,
                        src: `${globalConfig.get().apiUrl}/download/${x.image_Url}`}) ) } />
            </Stack>
          </Grid>          
        </Grid>
    </Box>
  );
};


export default Welcome;
