import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Marie',
      comment: 'J\'ai passé un moment incroyable au spa Betuole! Le personnel était très accueillant et les soins étaient divins. Je me sens détendue et rajeunie. Je reviendrai certainement!',
    },
    {
      id: 2,
      name: 'Luc',
      comment: 'Un endroit fantastique pour se détendre et se ressourcer. Les installations sont impeccables et le personnel est très professionnel. Je recommande vivement le spa Betuole à tous ceux qui recherchent une expérience de spa de qualité.',
    },
    {
      id: 3,
      name: 'Sophie',
      comment: 'Je suis une habituée du spa Betuole et je ne suis jamais déçue. Les services sont toujours exceptionnels et l\'ambiance est apaisante. C\'est mon lieu de prédilection pour une escapade bien-être.',
    },
    {
      id: 4,
      name: 'Pierre',
      comment: 'Une expérience inoubliable! J\'ai été impressionné par la qualité des soins et l\'attention portée aux détails. Je recommande vivement le spa Betuole à tous ceux qui cherchent à se faire chouchouter.',
    },
    {
      id: 5,
      name: 'Julie',
      comment: 'Le meilleur spa de la ville! J\'ai été accueillie chaleureusement dès mon arrivée et j\'ai été traitée comme une reine pendant tout mon séjour. Je suis ressortie complètement détendue et revitalisée. Merci à toute l\'équipe!',
    },
  ]);

  // Effet pour faire défiler automatiquement les témoignages toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonials(prevTestimonials => [
        prevTestimonials[1],
        prevTestimonials[2],
        prevTestimonials[3],
        prevTestimonials[4],
        prevTestimonials[0],
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box py={8} bgcolor='#784828'>
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box textAlign="justify">
              <Typography variant="h4" gutterBottom sx={{fontSize: '45px', color:'white'}} {...typographySmallHandWriting}>
                Nos clients nous adorent
              </Typography>
              <Typography variant="h6" color="white" fontFamily="Poppins">
                Nos clients sont toujours ravis de partager leurs expériences de spa avec nous. Voici quelques témoignages de personnes qui ont récemment visité notre spa.
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
          {testimonials.map(testimonial => (
            <div key={testimonial.id}>
              <Box p={3} bgcolor="white" borderRadius={4} boxShadow={3} textAlign="center">
                <Typography variant="h6" color="black" fontFamily="Poppins">
                  "{testimonial.comment}"
                </Typography>
                <Typography variant="h6" color="black" fontFamily="Poppins">
                  - {testimonial.name}
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
