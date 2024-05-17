import { defaultDefFormation, IAvis, IDefFormation } from './models/MainInformation';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "./services/MainInformation";
import { Typography, Box, Container, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';
import { isFalsy } from 'utility-types';



const AvisApprenants = () => {
  const {  getAvisApprenants,getDefFormations} = useMainInformation();
  const {data: AvisInformation} = useQuery<IAvis[]>( ['Avis'], () =>  getAvisApprenants());
  const {data: FormationInformations} = useQuery<IDefFormation[]>( ['DefFormation'], () => getDefFormations());
  const [formations, setDefFormations] = useState<IDefFormation>(defaultDefFormation );

  useEffect(() => {
    if(!isFalsy(FormationInformations) && FormationInformations?.length>0)
        setDefFormations(FormationInformations[0]);
  }, [FormationInformations]);

  return (
    <Box py={8} bgcolor='#784828'>
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box textAlign="justify">
              <Typography variant="h4" gutterBottom sx={{fontSize: '45px', color:'white'}} {...typographySmallHandWriting}>
              {formations.titre2}
              </Typography>
              <Typography variant="h6" color="white" fontFamily="Poppins">
              {formations.sousTitre2}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}></Grid>
        </Grid>
        <Typography sx={{marginTop:'5px'}}></Typography>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          interval={5000}
          transitionTime={500}
        >
         {AvisInformation && AvisInformation.map(avis => (
  <div key={avis.id}>
    <Box p={3} bgcolor="white" borderRadius={4} boxShadow={3} textAlign="center">
      <Typography variant="h6" color="black" fontFamily="Poppins">
        {avis.commentaires} 
      </Typography>
      <Typography variant="h6" color="black" fontFamily="Poppins">
        {avis.nom} {avis.date}
      </Typography>
    
    </Box>
  </div>
))}
        </Carousel>
      </Container>
      <Typography sx={{marginTop:'6px'}}></Typography>
    </Box>
  );
};

export default AvisApprenants;
