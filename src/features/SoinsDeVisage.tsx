import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';
import { IDefSoinVisage,  defaultSoinsVisage } from 'features/setup/models/MainInformation';
import { globalConfig } from 'config';
import { Box, Container, Grid, Typography } from '@mui/material';
import PrestationSoinVisage from 'components/PrestationSoinVisage';

const SoinsDeVisage = () => {
    const { getDefSoinsVisage } = useMainInformation();
    const {data: SoinsVisages} = useQuery<IDefSoinVisage[]>( ['DefSoinVisage'], () => getDefSoinsVisage());

    
  const [SoinVisage, setSoinsVisage] = useState<IDefSoinVisage>(defaultSoinsVisage);
  useEffect(() => {
    console.log(SoinsVisages);
      if(!isFalsy(SoinsVisages) && SoinsVisages?.length>0)
        setSoinsVisage(SoinsVisages[0]);
}, [SoinsVisages]);

  return (
    <Container maxWidth='xl'>     
    <Box> 
    <Grid container sx={{marginTop:'40px'}}>
      <Grid item xs={12} md={6}>
      <img src={`${globalConfig.get().apiUrl}/download/${SoinVisage.image_Url}`} height={520} style={{width:'100%'}}alt='soins de visage' /> 
      </Grid>
      <Grid xs={12} md={6} >
        <Typography variant='h3' sx={{marginTop:'110px', fontFamily:'Poppins'}}>{SoinVisage.titrePrincipal}</Typography>
        <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{SoinVisage.titreSecondaire}</Typography>

      </Grid>
    </Grid>
    </Box>
   <PrestationSoinVisage/>
    </Container>
  )
}

export default SoinsDeVisage
