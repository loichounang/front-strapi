import React from 'react';
import { Grid, Typography, styled, Container } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReplayIcon from '@mui/icons-material/Replay';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const CircleIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  backgroundColor: '#fff',

});

const ServiceSection: React.FC = () => {
  return (
    <Container maxWidth="xl" style={{ background: '#5497D1' }}>
      <div style={{  padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
            <CircleIcon>
              <LocalShippingIcon style={{ fontSize: 40, color: '#7CC242' }} />
            </CircleIcon>
            <Typography variant="body1" style={{ color: '#fff', fontFamily: 'Poppins', marginLeft: '10px' }}>Livraison gratuite entre 2 et 4 jours</Typography>
          </Grid>
          <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
            <CircleIcon>
              <CreditCardIcon style={{ fontSize: 40, color: 'blue' }} />
            </CircleIcon>
            <Typography variant="body1" style={{ color: '#fff', fontFamily: 'Poppins', marginLeft: '10px' }}>Plusieurs moyens de paiements</Typography>
          </Grid>
          <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
            <CircleIcon>
              <ReplayIcon style={{ fontSize: 40, color: '#7CC242' }} />
            </CircleIcon>
            <Typography variant="body1" style={{ color: '#fff', fontFamily: 'Poppins', marginLeft: '10px' }}>Retour sous 10 jours si le produit a un problème</Typography>
          </Grid>
          <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
            <CircleIcon>
              <ContactSupportIcon style={{ fontSize: 40, color: '#7CC242' }} />
            </CircleIcon>
            <Typography variant="body1" style={{ color: '#fff', fontFamily: 'Poppins', marginLeft: '10px' }}>Service client de qualité</Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default ServiceSection;
