import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';
import { IDefMainPied,  defaultMainPied } from 'features/setup/models/MainInformation';
import { globalConfig } from 'config';
import { Box, Container, Grid, Typography } from '@mui/material';
import PrestationMainPied from 'components/PrestationMainPied';


const MainEtPied = () => {
    const { getDefMainPied } = useMainInformation();
    const {data: MainsPieds} = useQuery<IDefMainPied[]>( ['MainPied'], () => getDefMainPied());

    
  const [MainPied, setSoinsVisage] = useState<IDefMainPied>(defaultMainPied);
  useEffect(() => {
    console.log(MainsPieds);
      if(!isFalsy(MainsPieds) && MainsPieds?.length>0)
        setSoinsVisage(MainsPieds[0]);
}, [MainsPieds]);

  return (
    <Box>
    <Container maxWidth='xl'>
    <Grid container sx={{marginTop:'40px'}}>
      <Grid item xs={12} md={6}>
      <img src={`${globalConfig.get().apiUrl}/download/${MainPied.image_Url}`} height={520} width={600} alt='soins de corps' /> 
      </Grid>
      <Grid xs={12} md={6} >
        <Typography variant='h3' sx={{marginTop:'110px', fontFamily:'Poppins'}}>{MainPied.titrePrincipal}</Typography>
        <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{MainPied.titreSecondaire}</Typography>

      </Grid>
    </Grid>
    </Container>
    <PrestationMainPied/>
    </Box>
  )
}

export default MainEtPied
