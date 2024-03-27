import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Logo from './ui/Logo';
import Contact from './Contact';
import NewLetters from './NewLetters';
import Copyrigth from './Copyrigth';
import TermsConditions from './TermsConditions';
import Gallery from './Gallery';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#0F1515', color: '#fff' }}>
      <Container maxWidth='xl' sx={{ marginTop:'200px'}}>
        <Grid container spacing={3} >
          {/* Organisez vos composants dans une grille */}
        
            <Logo />
            <Contact />
            
            <NewLetters />
          
            
           
         
        </Grid>

        
            <Copyrigth />
            <TermsConditions />
        
      </Container>
    </Box>
  );
}

export default Footer;
