import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';
import { IDefSoinCorps,  defaultSoinsCorps } from 'features/setup/models/MainInformation';
import { globalConfig } from 'config';
import { Box, Container, Grid, Typography } from '@mui/material';
import PrestationSoinCorps from 'components/PrestationSoinCorps';
import PrestationSoinVisage from 'components/PrestationSoinCorps';

const SoinsDeCorps = () => {
    const { getDefSoinsCorps } = useMainInformation();
    const {data: SoinsCorps} = useQuery<IDefSoinCorps[]>( ['SoinCorps'], () => getDefSoinsCorps());

    
  const [SoinCorps, setSoinsCorps] = useState<IDefSoinCorps>(defaultSoinsCorps);
  useEffect(() => {
    console.log(SoinsCorps);
      if(!isFalsy(SoinsCorps) && SoinsCorps?.length>0)
        setSoinsCorps(SoinsCorps[0]);
}, [SoinsCorps]);

  return (
    <Box>
    <Container maxWidth='xl'>
    <Grid container sx={{marginTop:'40px'}}>
      <Grid item xs={12} md={6}>
      <img src={`${globalConfig.get().apiUrl}/download/${SoinCorps.image_Url}`} height={520} style={{width:'100%'}} alt='soins de corps' /> 
      </Grid>
      <Grid xs={12} md={6} >
        <Typography variant='h3' sx={{marginTop:'110px', fontFamily:'Poppins'}}>{SoinCorps.titrePrincipal}</Typography>
        <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{SoinCorps.titreSecondaire}</Typography>

      </Grid>
    </Grid>
    </Container>
  <PrestationSoinCorps/>
    </Box>
  )
}

export default SoinsDeCorps
