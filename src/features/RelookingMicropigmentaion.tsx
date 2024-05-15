import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';
import { IDefRelooking,  defaultRelookingMicropigmentation} from 'features/setup/models/MainInformation';
import { globalConfig } from 'config';
import { Box, Container, Grid, Typography } from '@mui/material';
import PrestationRelookingMicropigmentation from 'components/PrestationRelookingMicropigmentation';


const RelookingMicropigmentaion = () => {

    const { getDefRelooking } = useMainInformation();
    const {data: relookings} = useQuery<IDefRelooking[]>( ['Relooking'], () => getDefRelooking ());

    
  const [Relooking, setSoinsVisage] = useState<IDefRelooking>(defaultRelookingMicropigmentation);
  useEffect(() => {
    console.log(relookings);
      if(!isFalsy(relookings) && relookings?.length>0)
        setSoinsVisage(relookings[0]);
}, [relookings]);

  return (
    <Container maxWidth='xl'>     
    <Box> 
    <Grid container sx={{marginTop:'40px'}}>
      <Grid item xs={12} md={6}>
      <img src={`${globalConfig.get().apiUrl}/download/${Relooking.image_Url}`} height={520} width={620} alt='Relooking' /> 
      </Grid>
      <Grid xs={12} md={6} >
        <Typography variant='h3' sx={{marginTop:'110px', fontFamily:'Poppins'}}>{Relooking.titrePrincipal}</Typography>
        <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{Relooking.titreSecondaire}</Typography>

      </Grid>
    </Grid>
    </Box>
  <PrestationRelookingMicropigmentation/>
    </Container>
  )
}

export default RelookingMicropigmentaion
