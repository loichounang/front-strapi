import { IAboutPage, defaultABoutPage } from './models/MainInformation';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "./services/MainInformation";
import { Typography, Box, Container, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';
import { isFalsy } from 'utility-types';
import { ITestimonial } from './models/MainInformation';


const Testimonials = () => {
  const {  getTestimonials,getAboutsPage} = useMainInformation();
  const {data: testimonialInformation} = useQuery<ITestimonial[]>( ['Testimonial'], () =>  getTestimonials());
  const { data: aboutData } = useQuery<IAboutPage[]>(['AboutPage'], () => getAboutsPage());
  const [aboutInformation, setMainInformations] = useState<IAboutPage>(defaultABoutPage);

  useEffect(() => {
    if (!isFalsy(aboutData ) && aboutData .length > 0)
      setMainInformations(aboutData [0]);
  }, [aboutData ]);

  return (
    <Box py={8} bgcolor='#784828'>
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box textAlign="justify">
              <Typography variant="h4" gutterBottom sx={{fontSize: '45px', color:'white'}} {...typographySmallHandWriting}>
              {aboutInformation.titre8}
              </Typography>
              <Typography variant="h6" color="white" fontFamily="Poppins">
              {aboutInformation.sousTitre8}
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
         {testimonialInformation && testimonialInformation.map(testimonial => (
  <div key={testimonial.id}>
    <Box p={3} bgcolor="white" borderRadius={4} boxShadow={3} textAlign="center">
      <Typography variant="h6" color="black" fontFamily="Poppins">
        {testimonial.nom}
      </Typography>
      <Typography variant="h6" color="black" fontFamily="Poppins">
        {testimonial.commentaires}
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

export default Testimonials;
