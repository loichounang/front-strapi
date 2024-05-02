import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "./setup/services/MainInformation";
import { isFalsy } from 'utility-types';
import { Typography, Box, Link, Divider, Container, Grid, Icon,TextField, Button} from '@mui/material';
import { IMainInformation, defaultMainInformation } from './setup/models/MainInformation';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';
import { useTranslation } from 'react-i18next';
import { Phone, Email, AccessTime } from '@mui/icons-material';
import { styled } from '@mui/material/styles';



const CustomTextField = styled(TextField)({
  '& input': {
    color: '#fff', // Couleur du texte lorsque le champ de texte est en focus
    fontFamily: 'Poppins',
  },
  '& input::placeholder': {
    fontFamily: 'Poppins',
    color: '#fff',
  }
});




const Contact: React.FC = () =>  {
  const { t, i18n } = useTranslation();

  const {  getMainInformations } = useMainInformation();
  const { data: mainInformationData } = useQuery<IMainInformation[]>(['MainInformation'], () => getMainInformations());
  const [mainInformation, setMainInformations] = useState<IMainInformation>(defaultMainInformation);

  useEffect(() => {
    if (!isFalsy(mainInformationData) && mainInformationData.length > 0)
      setMainInformations(mainInformationData[0]);
  }, [mainInformationData]);



 

  return (
    <Box>
      <Container maxWidth='xl' sx={{marginTop:'70px' }}>
        <Grid container>
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px'}} {...typographySmallHandWriting}> 
                  {t('CONTACT')}
                </Typography>                
              </Box>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{t('Nous sommes là pour vous aider à planifier votre prochaine expérience de bien-être. Si vous avez des questions ou souhaitez prendre rendez-vous, n’hésitez pas à nous contacter.')}</Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        
      </Container>

      

<Container maxWidth='xl' sx={{ marginTop: '30px', color: 'white', backgroundColor: '#371F07' }}>

  <Grid container >
 
    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography sx={{marginTop:'20px' }}></Typography>
      <Icon component={Phone} sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('CONTACT TELEPHONIQUE')}</Typography>
      <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{mainInformation.portable1}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>
    

    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Typography sx={{marginTop:'20px' }}></Typography>
      <Icon component={Email} sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('ADRESSE EMAIL')}</Typography>
      <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{mainInformation.email1}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>

    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography sx={{marginTop:'20px' }}></Typography>
      <Icon component={AccessTime} sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('HORAIRE')}</Typography>
      <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{mainInformation.horaire1}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>
   
  </Grid>

</Container>;



<Container maxWidth='xl' sx={{ marginTop: '30px', backgroundColor: 'white' }}>
  <Grid container sx={{ marginTop: '10px' }}>
    <Grid item xs={12} md={3}></Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h3" sx={{ textAlign:'center', fontFamily:'Poppins' }}> {t('Veuillez remplir le formulaire de contact ci-dessous')}</Typography> 
      <Typography variant="h6" sx={{ textAlign:'center', fontFamily:'Poppins' }}>{t('Nous sommes à votre disposition pour vous aider à atteindre votre état de bien-être ultime')}</Typography> 
    </Grid>
    <Grid item xs={12} md={3}></Grid>
  </Grid>
  <Grid container spacing={2} sx={{ p: 3 }}>
    <Grid item xs={12} md={6}>
      <Typography variant="body1" sx={{ color: '#371F07', fontFamily:'Poppins', fontWeight:'bold' }}>{t('VOTRE NOM ?  *')}</Typography>
      <CustomTextField fullWidth placeholder='Ex : Jeanne' sx={{ bgcolor: '#371F07', height:'40px' }} />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="body1" sx={{ color: '#371F07', fontFamily:'Poppins', fontWeight:'bold' }}>{t('VOTRE PRÉNOM ? *')}</Typography>
      <CustomTextField fullWidth placeholder='Ex : Pauline' sx={{ bgcolor: '#371F07', height:'40px' }} />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="body1" sx={{ color: '#371F07', fontFamily:'Poppins', fontWeight:'bold' }}>{t('VOTRE ADRESSE EMAIL ?  *')}</Typography>
      <CustomTextField fullWidth placeholder='Ex : betuole.beauty@yahoo.com' sx={{ bgcolor: '#371F07', height:'40px' }} />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="body1" sx={{ color: '#371F07', fontFamily:'Poppins', fontWeight:'bold' }}>{t('VOTRE NUMERO DE TÉLÉPHONE ? *')}</Typography>
      <CustomTextField fullWidth placeholder='Ex : 6 90 57 69 32' sx={{ bgcolor: '#371F07', height:'40px', borderColor:'#371F07' }} />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body1" sx={{ color: '#371F07', fontFamily:'Poppins', fontWeight:'bold' }}>{t('OBJET DU MESSAGE')}</Typography>
      <CustomTextField fullWidth placeholder='Ex : Demande de devis' sx={{ bgcolor: '#371F07', height:'40px' }} />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body1" sx={{ color: '#371F07', fontFamily:'Poppins', fontWeight:'bold'  }}>{t('LAISSEZ NOUS VOTRE MESSAGE ')}</Typography>
      <TextField fullWidth multiline rows={4} sx={{ bgcolor: '#371F07' }} />
    </Grid>
    <Grid item xs={12} md={4}></Grid>
    <Grid item xs={12} md={4} sx={{ marginTop: '5px' }}>
      <Button fullWidth variant="contained" sx={{ color: 'white', fontFamily: 'Poppins', fontWeight: 'bold', bgcolor: '#784828', height:'45px','&:hover': {bgcolor: '#371F07' } }}>Envoyer</Button>
    </Grid>
    <Grid item xs={12} md={4}></Grid>
  </Grid>
</Container>;


      <Typography sx={{marginTop:'60px'}}></Typography>
    </Box>
  );
};

export default Contact;
