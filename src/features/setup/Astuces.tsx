import React, { useEffect, useState } from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import YouTube from 'react-youtube';
import { useQuery } from 'react-query';

import { IAstuce, defaultAstuce } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

// Style personnalisé pour les titres
const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  fontFamily: 'Poppins',
  textAlign: 'center'
});

// Style personnalisé pour les sous-titres
const Subtitle = styled(Typography)({
  fontSize: '18px',
  marginBottom: '40px',
  fontFamily: 'Poppins',
});



const Astuces = () => {

    const { getAstuces} = useMainInformation();
    const {data: astucesInformations} = useQuery<IAstuce[]>( ['Astuce'], () => getAstuces());
    
  const [astuceInformation, setMainInformation] = useState<IAstuce>(defaultAstuce );


  useEffect(() => {
    console.log(astucesInformations);
      if(!isFalsy(astucesInformations) && astucesInformations?.length>0)
        setMainInformation(astucesInformations[0]);
}, [astucesInformations]);



  const opts = {
    playerVars: {
      // Désactiver les suggestions de vidéos à la fin de la lecture
      rel: 0
    }
  };

  return (
    <Container maxWidth='xl' sx={{marginTop : '10px'}}>
         <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
        <Box  textAlign="justify">
      <Title sx={{fontSize: '45px'}} {...typographySmallHandWriting}>{astuceInformation.titreAstuce}</Title>
      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'justify' }}>
        
          <Subtitle>{astuceInformation.titreSecondaire}</Subtitle>
        
      </Box>
      </Box>
          </Grid>
          <Grid item xs={12} md={5}></Grid>
        </Grid>
      
      <Grid container spacing={2}>
        <Grid item md={6}>
          {/* Vidéo 1 */}
          <YouTube videoId={astuceInformation.lienVideo1} opts={opts} />
        </Grid>
        <Grid item md={6}>
          {/* Vidéo 2 */}
          <YouTube videoId={astuceInformation.lienVideo2} opts={opts} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Astuces;
