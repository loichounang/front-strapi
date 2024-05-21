
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "../setup/services/MainInformation";
import {IAboutPage, defaultABoutPage } from '../setup/models/MainInformation';
import { isFalsy } from 'utility-types';
import { Typography, Box, Link, Divider, Container, Grid } from '@mui/material';
import { globalConfig } from 'config';


const OurStory: React.FC = () => {
  const {  getAboutsPage } = useMainInformation();
  const { data: AboutInformations } = useQuery<IAboutPage[]>(['AboutPage'], () => getAboutsPage());
  const [AboutInformation, setAboutInformations] = useState<IAboutPage>(defaultABoutPage);

  useEffect(() => {
    if (!isFalsy(AboutInformations) && AboutInformations.length > 0)
      setAboutInformations(AboutInformations[0]);
  }, [AboutInformations]);

  return (
    <Container maxWidth='xl' sx={{ marginTop: '15px', textAlign: 'justify' }}>
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
<Typography sx={{ marginTop:'80px'}}></Typography>

  </Container>
  );
}

export default OurStory;
