import OurValues from './setup/News';
import Reservation from './setup/QuotationForm';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "./setup/services/MainInformation";
import { IArrierePlan, defaultArrierePlan, IAboutPage, defaultABoutPage } from './setup/models/MainInformation';
import { isFalsy } from 'utility-types';
import { Typography, Box, Link, Divider, Container, Grid } from '@mui/material';
import { globalConfig } from 'config';
import { IMainInformation, defaultMainInformation } from './setup/models/MainInformation';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const Abouts: React.FC = () => {
  const {  getAboutsPage } = useMainInformation();
  const { data: AboutInformations } = useQuery<IAboutPage[]>(['AboutPage'], () => getAboutsPage());
  const [AboutInformation, setAboutInformations] = useState<IAboutPage>(defaultABoutPage);

  useEffect(() => {
    if (!isFalsy(AboutInformations) && AboutInformations.length > 0)
      setAboutInformations(AboutInformations[0]);
  }, [AboutInformations]);

  return (
    <Container maxWidth='xl' sx={{ marginTop: '15px', textAlign: 'justify' }}>
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        
          <Typography variant='h3' sx={{fontFamily:'Poppins', marginTop:'80px'}}>
            {AboutInformation.titreGlobal}
          </Typography>
        
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{fontFamily:'Poppins', marginTop:'30px'}}>
            {AboutInformation.titre}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={`${globalConfig.get().apiUrl}/download/${AboutInformation.profil_Url}`}
          style={{ width: '100%', maxHeight: '550px', objectFit: 'fill' }}
          alt='Profil'
        />
      </Grid>
    </Grid>



    <Grid container spacing={2} marginTop='30px'>

    <Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={`${globalConfig.get().apiUrl}/download/${AboutInformation.imageHistoire_Url}`}
          style={{ width: '100%', maxHeight: '550px', objectFit: 'fill' }}
          alt='Profil'
        />
      </Grid>

      <Grid item md={6} xs={12}>
        
          <Typography variant='h3' sx={{fontFamily:'Poppins', marginTop:'80px'}}>
            {AboutInformation.titre1}
          </Typography>
        
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{fontFamily:'Poppins', marginTop:'30px'}}>
            {AboutInformation.sousTitre1}
          </Typography>
        </Box>
      </Grid>
      
    </Grid>


    <Grid container spacing={2} marginTop='30px'>

  <Grid item md={6} xs={12}>
    
      <Typography variant='h3' sx={{fontFamily:'Poppins', marginTop:'80px'}}>
        {AboutInformation.titre2}
      </Typography>
    
    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h5" sx={{fontFamily:'Poppins', marginTop:'30px'}}>
        {AboutInformation.sousTitre2}
      </Typography>
    </Box>
  </Grid>

  
<Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img
      src={`${globalConfig.get().apiUrl}/download/${AboutInformation.imageMission_Url}`}
      style={{ width: '100%', maxHeight: '550px', objectFit: 'fill' }}
      alt='Profil'
    />
  </Grid>
</Grid>


<Grid container spacing={2} marginTop='30px'>

<Grid item md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img
      src={`${globalConfig.get().apiUrl}/download/${AboutInformation.imageQualite_Url}`}
      style={{ width: '100%', maxHeight: '550px', objectFit: 'fill' }}
      alt='Profil'
    />
  </Grid>

  <Grid item md={6} xs={12}>
      <Typography variant='h3' sx={{fontFamily:'Poppins', marginTop:'80px'}}>
        {AboutInformation.titre3}
      </Typography>
    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h5" sx={{fontFamily:'Poppins', marginTop:'30px'}}>
        {AboutInformation.sousTitre3}
      </Typography>
    </Box>
  </Grid>
</Grid>
<Typography sx={{ marginTop:'80px'}}></Typography>

  </Container>
  );
}

export default Abouts;
