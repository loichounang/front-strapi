import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ServiceSection from './setup/ServiceSection';
import QuotationForm from './setup/QuotationForm';
import { useQuery } from 'react-query';
import { isFalsy } from 'utility-types';
import { IMainInformation, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { getMainInformations } = useMainInformation();
  const { data: mainInformations } = useQuery<IMainInformation[]>(['MainInformation'], () => getMainInformations());
  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);

  useEffect(() => {
    if (!isFalsy(mainInformations) && mainInformations?.length > 0) {
      setMainInformation(mainInformations[0]);
    }
  }, [mainInformations]);

  return (
    <Grid container spacing={2} sx={{ marginTop:'30px',  background:'#f9f9f9'}}>
    <Grid item xs={12} md={6} style={{ padding: '20px', fontFamily:'Poppins' }}>
      <Typography variant="h5" sx={{ fontFamily:'Poppins'}}>Formulaire de Contact</Typography>
      <form style={{  marginTop:'30px'}}>
        <TextField label="Nom" variant="outlined" fullWidth margin="normal" required style={{  marginTop:'10px'}} />
        <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" required style={{  marginTop:'30px'}}/>
        <TextField label="Message" multiline rows={4} variant="outlined" fullWidth margin="normal" required  style={{  marginTop:'30px'}}/>
        <Button variant="contained" color="primary" type="submit" sx={{ fontFamily:'Poppins', marginTop:'30px'}}>Envoyer</Button>
      </form>
    </Grid>
    <Grid item xs={12} md={6} style={{ padding: '20px', fontFamily:'Poppins' }}>
      <Typography variant="h5" sx={{ fontFamily:'Poppins'}}>Informations de Contact</Typography>
      <Typography sx={{  marginTop:'22px'}}></Typography>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <EmailIcon style={{ marginRight: '10px' }} />
        <Typography variant="h6" sx={{ fontFamily:'Poppins'}}>{mainInformation.email}</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <PhoneIcon style={{ marginRight: '10px' }} />
        <Typography variant="h6" sx={{ fontFamily:'Poppins'}}>{mainInformation.portable}</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon style={{ marginRight: '10px' }} />
        <Typography variant="h6" sx={{ fontFamily:'Poppins'}}>{mainInformation.localisation}</Typography>
      </div>
    </Grid>

  </Grid>
  );
}

export default Contact;
