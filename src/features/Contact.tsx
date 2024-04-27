import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "./setup/services/MainInformation";
import { IArrierePlan, defaultArrierePlan } from './setup/models/MainInformation';
import { isFalsy } from 'utility-types';
import { Typography, Box, Link, Divider, Container, Grid, TextField, Button } from '@mui/material';
import { globalConfig } from 'config';
import { IMainInformation, defaultMainInformation } from './setup/models/MainInformation';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const Contact: React.FC = () =>  {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = () => {
    console.log('Nom:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    setName('');
    setEmail('');
    setMessage('');
  };

  const { getArrierePlan, getMainInformations } = useMainInformation();
  const { data: mainInformations } = useQuery<IArrierePlan[]>(['ArrierePlan'], () => getArrierePlan());
  const [main, setMainInformation] = useState<IArrierePlan>(defaultArrierePlan);
  const { data: mainInformationData } = useQuery<IMainInformation[]>(['MainInformation'], () => getMainInformations());
  const [mainInformation, setMainInformations] = useState<IMainInformation>(defaultMainInformation);

  useEffect(() => {
    if (!isFalsy(mainInformationData) && mainInformationData.length > 0)
      setMainInformations(mainInformationData[0]);
  }, [mainInformationData]);

  useEffect(() => {
    if (!isFalsy(mainInformations) && mainInformations.length > 0)
      setMainInformation(mainInformations[0]);
  }, [mainInformations]);

  return (
    <Box>
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <img src={`${globalConfig.get().apiUrl}/download/${main.arrierePlan_Url}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt='Logo' />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '100%', zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
            {main.titrePrincipal}
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>
            <Link href="/" sx={{ fontWeight: 'bold', color: '#fff' }}>Home</Link> | {main.titreSecondaire}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center', marginTop:'30px'}}>
        <Typography variant="h3" {...typographySmallHandWriting} >
          {main.titreGlobal} 
        </Typography>                
      </Box>

      <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Typography component="h1" sx={ {p: 0.25} }  {...typographyBigGroupBoxStyling}>
          {main.titre} 
        </Typography>
      </Box>

      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Divider sx={{ borderColor: 'primary.main', mx: 2, width: '20%' }} />
        <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} height={20} width={20} alt='Logo' />
        <Divider sx={{ borderColor: 'primary.main', mx: 2, width: '20%' }} />
      </Box>

      <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center', marginTop:'15px'}}>
        <Typography component="h1" sx={ {p: 0.25} }  {...typographyBigGroupBoxStyling}>
          {main.titreTertiaire} 
        </Typography>
      </Box>

    <Container maxWidth='xl'>
      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center', marginTop:'30px'}}>
        <Typography variant="h3" {...typographySmallHandWriting} >
          {main.infosComplementaires} 
        </Typography>                
      </Box>
      </Container>
      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center', marginTop:'30px'}}>
        <Typography variant="h3" {...typographySmallHandWriting} >
          {main.localisation} 
        </Typography>                
      </Box>

      <Container maxWidth='xl' sx={{marginTop:'70px' }}>
        <Grid container spacing={4} justifyContent="center" >
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center" gutterBottom sx={{fontFamily:'Poppins'}}>
              Contactez-nous
            </Typography>
            <Typography variant="body1" paragraph sx={{fontFamily:'Poppins'}}>
              Pour toute demande d'information supplémentaire ou pour prendre rendez-vous, n'hésitez pas à nous contacter. Notre équipe de professionnels se fera un plaisir de vous aider à sublimer votre beauté.
            </Typography>
            <Typography variant="body1" paragraph sx={{fontFamily:'Poppins'}}>
              Adresse : Rond point maetur bonamoussadi face station OLA
            </Typography>
            <Typography variant="body1" paragraph sx={{fontFamily:'Poppins'}}>
              Téléphone : 6 97 95 04 76 / 6 71 19 12 34. 
            </Typography>
            <Typography variant="body1" paragraph sx={{fontFamily:'Poppins'}}>
              Heures d'ouverture : Ouvert de lundi à dimanche
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
  <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily:'Poppins' }}> 
    Formulaire de Contact
  </Typography>
  <TextField
    fullWidth
    label="Nom"
    value={name}
    onChange={(e) => setName(e.target.value)}
    margin="normal"
  />
  <Box mt={2}>
    <TextField
      fullWidth
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      margin="normal"
    />
  </Box>
  <Box mt={2}>
    <TextField
      fullWidth
      label="Message"
      multiline
      rows={4}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      margin="normal"
    />
  </Box>
  <Button
    variant="contained"
    color="primary"
    onClick={handleContactSubmit}
    sx={{
      fontFamily: 'Poppins',
      height: '45px',
      borderRadius: '3px',
      background: '#FF0088',
      marginTop: '10px'
    }}
  >
    Envoyer
  </Button>
</Grid>


        </Grid>
      </Container>
      <Typography sx={{marginTop:'60px'}}></Typography>
    </Box>
  );
};

export default Contact;
