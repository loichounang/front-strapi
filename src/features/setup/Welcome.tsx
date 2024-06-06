import React, { useEffect, useState } from 'react';

import { Box, Typography, Button, Stack, Divider,Container,CardMedia } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Grid, IconButton } from '@mui/material';


import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { IMainInformation, ISlideImage, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';

import { globalConfig } from 'config';
import SlideImages from 'components/ui/SlideImages';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const Welcome = () => {
 

  const { t, i18n } = useTranslation();  // TitreBienvenue

  const { getMainInformations, getSlideImages } = useMainInformation();
  const {data: mainInformations} = useQuery<IMainInformation[]>( ['MainInformation'], () => getMainInformations());
  const {data: slideImages} = useQuery<ISlideImage[]>( ['SlideImage'], () => getSlideImages());

  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
  useEffect(() => {
    console.log(mainInformations);
      if(!isFalsy(mainInformations) && mainInformations?.length>0)
        setMainInformation(mainInformations[0]);
}, [mainInformations]);

console.log(t('Welcome to'));



  return (
    <Box bgcolor="white" color="back" py={0.25} px={2} textAlign="center" mt={5}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h3" {...typographySmallHandWriting}> 
                  {t('Welcome to')}
                </Typography>                
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant='h4'  sx={{fontFamily:'Poppins'}}>
                  {mainInformation.titreCentre}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%' }} />                  
                  <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} height={20} width={20} alt='Logo' />                  
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%', }} />
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h4"  sx={{fontFamily:'Poppins'}}>
                  {mainInformation.titreBienvenue}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mb: 2, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h6" sx={{fontFamily:'Poppins'}}>
                  {mainInformation.descriptionBienvenue}
                </Typography>
              </Box>
              <SlideImages images={ (slideImages || []).map(x => ({ description : x.description,
                        src: `${globalConfig.get().apiUrl}/download/${x.image_Url}`}) ) } />
            </Stack>
          </Grid>          
        </Grid>
    </Box>
  );
};


export default Welcome;
