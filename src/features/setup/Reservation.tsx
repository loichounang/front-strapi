import React, { useEffect, useState } from 'react';

import { Box, Typography, Button, Stack, Divider, } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Grid, IconButton } from '@mui/material';


import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { IMainInformation, IReservation, defaultMainInformation, defaultReservation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';

import { globalConfig } from 'config';
import { FormDialog } from 'components/ui/FormDialog';
import { AppointmentForm } from 'features/production/AppointmentForm';
import { defaultAppointment } from 'features/production/models/Appointment';
import { AppointmentFormDialog } from 'components/AppointmentFormDialog';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const Reservation = () => {

  const { t, i18n } = useTranslation();  // TitreBienvenue

  const { getMainInformations, getReservations } = useMainInformation();

  const {data: mainInformations} = useQuery<IMainInformation[]>( ['MainInformation'], () => getMainInformations());
  const {data: reservations} = useQuery<IReservation[]>( ['Reservation'], () => getReservations());

  const [openAppointmentForm, setOpenAppointmentForm] = useState<boolean>(false);

  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
  useEffect(() => {
    
      if(!isFalsy(mainInformations) && mainInformations?.length>0)
        setMainInformation(mainInformations[0]);
}, [mainInformations]);

const [reservation, setReservation] = useState<IReservation>(defaultReservation);
  useEffect(() => {
    console.log(reservations);
    if(!isFalsy(reservations) && reservations?.length>0)
      setReservation(reservations[0]);
}, [reservations]);


  return (
    <Box bgcolor="white" color="back" py={0.25} px={2} textAlign="center" sx={{marginTop:'30px'}}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>            
            <Stack flexDirection='column' textAlign="center"  alignItems="flex-start">
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h3" {...typographySmallHandWriting}>
                  {reservation.titreGlobal} 
                </Typography>                
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant='h5' sx={{fontFamily:'Poppins', fontWeight:'700'}}>
                  {reservation.titre}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center',}}> 
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%' }} />                  
                  <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} height={20} width={20} alt='Logo' />                  
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%', }} />
              </Box>     
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h6" sx={{fontFamily:'Poppins', fontWeight:'600'}}>
                  {reservation.messageAccueil} 
                </Typography>                
              </Box>         
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h6" sx={{fontFamily:'Poppins'}}>
                  {reservation.messageReservation} 
                </Typography>                
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h6" sx={{fontFamily:'Poppins'}}>
                  {reservation.messageReservationOnline} 
                </Typography>                
              </Box>
              <Box sx={{ mt: 0.5, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={() => {setOpenAppointmentForm(true);}}
                    sx={{
                        background:'#D85352', color:'#fff', 
                        backgroundImage: 'linear-gradient(to right, #371F07, #DBA82F)',
                        marginTop:'15px',fontFamily: 'Poppins !important', 
                        width:'50%', height:'55px', borderRadius:'30px'}} >
                  Faites votre réservation
                </Button>
              </Box>
              { openAppointmentForm && <AppointmentFormDialog open={openAppointmentForm} setOpen={setOpenAppointmentForm}  /> } 
            </Stack>
          </Grid>    
              
          <Grid item xs={12} md={6}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, p: 2, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                <img src={`${globalConfig.get().apiUrl}/download/${reservation.image_Url}`} alt="..." style={{ height: '350px', objectFit: 'cover', borderRadius: '2%' }}/>
              </Box>              
            </Stack>
          </Grid>  
        </Grid>
        <Typography sx={{marginTop:'30px'}}></Typography>
    </Box>
  );
};


export default Reservation;
