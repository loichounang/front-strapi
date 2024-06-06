import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';
import { IDefBienEtre,  defaultBienEtre } from 'features/setup/models/MainInformation';
import { globalConfig } from 'config';
import { Box, Container, Grid, Typography } from '@mui/material';
import PrestationBienEtre from 'components/PrestationBienEtre';



const BienEtre = () => {
    const { getDefBienEtre } = useMainInformation();
    const {data: BienEtre} = useQuery<IDefBienEtre[]>( ['BienEtre'], () => getDefBienEtre());

    
  const [bien, setBienEtre] = useState<IDefBienEtre>(defaultBienEtre);
  useEffect(() => {
    console.log(BienEtre);
      if(!isFalsy(BienEtre) && BienEtre?.length>0)
        setBienEtre(BienEtre[0]);
}, [BienEtre]);

  return (
    <Box>
    <Container maxWidth='xl'>
    <Grid container sx={{marginTop:'40px'}}>
      <Grid item xs={12} md={6}>
      <img src={`${globalConfig.get().apiUrl}/download/${bien.image_Url}`} height={520} style={{width:'100%'}} alt='soins de corps' /> 
      </Grid>
      <Grid xs={12} md={6} >
        <Typography variant='h3' sx={{marginTop:'110px', fontFamily:'Poppins'}}>{bien.titrePrincipal}</Typography>
        <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{bien.titreSecondaire}</Typography>

      </Grid>
    </Grid>
    </Container>
    <PrestationBienEtre/>
    </Box>
  )
}


export default BienEtre
