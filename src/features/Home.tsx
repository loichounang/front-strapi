
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';


import { IIMage4Carousel, ISlideImage, defaultIMage4Carousel } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';

import { globalConfig } from 'config';
import { Box, Grid, Stack,Typography } from '@mui/material';
import Welcome from './setup/Welcome';
import CarouselImages from 'components/ui/CarousselImages';
import OurServices from './setup/OurServices';
import Partners from './setup/Partners';
import { useTranslation } from 'react-i18next';
import ServiceSection from './setup/ServiceSection';
import Service from "./setup/Service";
import Customer from './setup/Customer';
import OurStory from './setup/OurStory';
import WhatsApp from './setup/WhatsApp';


function Home() {

 const { getImages4Carousel } = useMainInformation();

 const {data: images} = useQuery<IIMage4Carousel[]>( ['ImageCarousel'], () => getImages4Carousel());

 const { t, i18n } = useTranslation(); 

 useEffect(() => {
    i18n.changeLanguage('fr');
  }, []);


  return (
    <Box sx={{ mx: 0.1 }}>
        <Grid container rowSpacing={1} columnSpacing={3}>
            <Grid item xs={12}  >
                <Stack flexDirection='column' >
                    <CarouselImages  images={ (images || []).map(x => ({
                        src: `${globalConfig.get().apiUrl}/download/${x.image_Url}`, 
                        mainTitle: x.titrePrincipal, secondaryTitle: x.titreSecondaire}) ) }  />
                    <Welcome  />  
                    <Service />                  
                    <OurStory />
                    <Customer />
                
                   
                    <ServiceSection />
                    <Partners  />
                    <Typography sx={{ marginTop:'35px'}}></Typography>
                </Stack>
            </Grid>
        </Grid>  
    </Box>       
    
  )
}

export default Home
