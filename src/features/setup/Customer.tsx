import React, { useEffect, useState } from 'react';

import { Box, Typography, Button, Stack, Divider,Container,CardMedia } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Grid, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import {  ICustomers } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { globalConfig } from 'config';
import CustomersSlide from 'components/ui/CustomerSlide';

const Welcome = () => {
 

  const { t, i18n } = useTranslation();  // TitreBienvenue

  const { getCustumers} = useMainInformation();
  const {data: slideCustomers} = useQuery< ICustomers[]>( ['Customers'], () => getCustumers());

  

console.log(t('Welcome to'));



  return (
    <Box bgcolor="#F7F7F7" color="back" py={0.25} px={2} textAlign="center" mt={5} sx={{  height: '200px'}}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'justify'}}>
                <Typography variant="h5" sx={{fontFamily:'Poppins', fontWeight:'500'}}> 
                  {t('Nos Clients')}
                </Typography>                
              </Box>
              <Typography sx={{marginTop:'10px'}}></Typography>
              <CustomersSlide images={ (slideCustomers || []).map(x => ({ 
                        src: `${globalConfig.get().apiUrl}/download/${x.image_Url}`}) ) } />
            </Stack>
          </Grid>          
        </Grid>
    </Box>
  );
};


export default Welcome;
