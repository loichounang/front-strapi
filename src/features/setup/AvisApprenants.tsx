import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const AvisApprenants = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Laura',
      comment: "Je suis ravie d'avoir suivi la formation en esthétique au spa Betuole. Les instructeurs étaient très compétents et l'atmosphère était propice à l'apprentissage. Je recommande cette formation à tous ceux qui cherchent à se lancer dans l'industrie de la beauté.",
      date: '2 Mai 2024'
    },
    {
      id: 2,
      name: 'Alexandre',
      comment: "La formation en massage proposée par le spa Betuole a dépassé mes attentes. J'ai appris des techniques avancées et j'ai eu l'opportunité de pratiquer dans un environnement professionnel. C'est une expérience que je recommande vivement à tous les aspirants masseurs.",
      date: '5 Mai 2024'
    },
    {
      id: 3,
      name: 'Sophie',
      comment: "Je suis très satisfaite de la formation en maquillage artistique que j'ai suivie au spa Betuole. Les formateurs étaient passionnés et les cours étaient très complets. Grâce à cette formation, j'ai pu perfectionner mes compétences et je me sens prête à me lancer dans ma carrière de maquilleuse professionnelle.",
      date: '8 Mai 2024'
    },
    {
      id: 4,
      name: 'Martin',
      comment: "La formation en soins du visage était tout simplement incroyable. J'ai appris tellement de choses utiles et j'ai eu la chance de mettre en pratique mes compétences sous la supervision d'experts. Merci au spa Betuole pour cette expérience enrichissante.",
      date: '10 Mai 2024'
    },
    {
      id: 5,
      name: 'Clara',
      comment: "La formation en manucure et pédicure était très instructive et amusante. J'ai beaucoup appris sur les techniques de soins des ongles et j'ai eu l'occasion de perfectionner mes compétences en travaillant sur de vrais clients. Je recommande cette formation à tous les passionnés de la beauté.",
      date: '12 Mai 2024'
    },
    {
      id: 6,
      name: 'Antoine',
      comment: "La formation en coiffure était vraiment complète. J'ai appris à maîtriser différentes techniques de coupe, de coloration et de coiffage. Les formateurs étaient très professionnels et toujours disponibles pour répondre à mes questions. Je suis reconnaissant d'avoir eu l'opportunité de suivre cette formation au spa Betuole.",
      date: '15 Mai 2024'
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
        prevTestimonials[5],
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
                Nos Apprenants nous font confiance
              </Typography>
              <Typography variant="h6" color="white" fontFamily="Poppins">
                Découvrez ce que nos élèves ont à dire sur leurs expériences de formation au spa Betuole.
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
                <Typography variant="subtitle1" color="black" fontFamily="Poppins">
                  - {testimonial.name}, {testimonial.date}
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
