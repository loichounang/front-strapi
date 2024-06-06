import React, { useEffect, useState } from 'react';
import {IReservation,defaultReservation, IOnglerie,IMainsPieds } from '../features/setup/models/MainInformation'; 
import { Grid, Container, Typography,Stack,Box, Button } from '@mui/material';
import useMainInformation from 'features/setup/services/MainInformation';
import { useQuery } from 'react-query';
import { isFalsy } from 'utility-types';
import { globalConfig } from 'config';
import { AppointmentFormDialog } from 'components/AppointmentFormDialog';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';
import { useTranslation } from 'react-i18next';

const PrestationMainPied = () => {
  const { t, i18n } = useTranslation();
    const {  getMainsPieds, getReservations, getOnglerie} = useMainInformation();
    const {data: mains} = useQuery<IMainsPieds[]>( ['MainsPieds'], () => getMainsPieds());
    const {data: ongleries} = useQuery<IOnglerie[]>( ['Onglerie'], () => getOnglerie());

    const {data: reservations} = useQuery<IReservation[]>( ['Reservation'], () => getReservations());
    const [openAppointmentForm, setOpenAppointmentForm] = useState<boolean>(false);

    const [reservation, setReservation] = useState<IReservation>(defaultReservation);
    useEffect(() => {
      console.log(reservations);
      if(!isFalsy(reservations) && reservations?.length>0)
        setReservation(reservations[0]);
  }, [reservations]);

  return (
    <Container maxWidth='xl' sx={{marginTop:'100px'}}>
      <Container  maxWidth='xl' sx={{bgcolor:'#DBA82F', color:'white'}}>
      <Grid container >
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px',marginTop:'50px'}} {...typographySmallHandWriting}> 
                  {t('Mains et Pieds')}
                </Typography>                
              </Box>
          </Grid>
          <Typography sx={{marginTop:'150px'}}></Typography>
          <Grid item xs={12} md={4}></Grid>
        </Grid>

    <Grid container item>
      {( mains || []).map( (main, idx) => (
        
        <Grid xs={6} md={4} key={main.id}>
          <Typography variant='h5' sx={{fontFamily:'Poppins', fontWeight:'bold'}}>{main.titre}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{main.duree}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{main.prix}</Typography>
          <Typography sx={{marginTop:'13px'}}></Typography>
        </Grid>
        
      ))}
    </Grid>
  
    <Stack>
    <Grid container>
    
    <Grid item xs={12} md={4}></Grid>
    <Grid item xs={12} md={4} sx={{ mt: 0.5, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={() => {setOpenAppointmentForm(true);}}
                    sx={{
                        background:'#D85352', color:'#fff', 
                        backgroundImage: 'linear-gradient(to right, #371F07, #DBA82F)',
                        marginTop:'15px',fontFamily: 'Poppins !important', 
                        width:'70%', height:'55px', borderRadius:'30px'}} >
                  Faites votre réservation
                </Button>
              </Grid>
              <Grid item xs={12} md={4}></Grid>
              </Grid>
              { openAppointmentForm && <AppointmentFormDialog open={openAppointmentForm} setOpen={setOpenAppointmentForm}  /> } 
          
  </Stack>
  <Typography sx={{marginTop:'50px'}}></Typography>
  </Container> 


  <Container  maxWidth='xl' sx={{bgcolor:'#371F07', color:'white',marginTop:'30px'}}>
      <Grid container >
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px',marginTop:'50px'}} {...typographySmallHandWriting}> 
                  {t('Onglerie')}
                </Typography>                
              </Box>
          </Grid>
          <Typography sx={{marginTop:'150px'}}></Typography>
          <Grid item xs={12} md={4}></Grid>
        </Grid>

    <Grid container item>
      {( ongleries || []).map( (onglerie, idx) => (
        
        <Grid xs={12} md={4} key={onglerie.id}>
          <Typography variant='h5' sx={{fontFamily:'Poppins', fontWeight:'bold'}}>{onglerie.titre}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{onglerie.duree}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{onglerie.prix}</Typography>
          <Typography sx={{marginTop:'13px'}}></Typography>
        </Grid>
        
      ))}
    </Grid>
  
    <Stack>
    <Grid container>
    
    <Grid item xs={12} md={4}></Grid>
    <Grid item xs={12} md={4} sx={{ mt: 0.5, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={() => {setOpenAppointmentForm(true);}}
                    sx={{
                        background:'#D85352', color:'#fff', 
                        backgroundImage: 'linear-gradient(to right, #371F07, #DBA82F)',
                        marginTop:'15px',fontFamily: 'Poppins !important', 
                        width:'70%', height:'55px', borderRadius:'30px'}} >
                  Faites votre réservation
                </Button>
              </Grid>
              <Grid item xs={12} md={4}></Grid>
              </Grid>
              { openAppointmentForm && <AppointmentFormDialog open={openAppointmentForm} setOpen={setOpenAppointmentForm}  /> } 
          
  </Stack>
  <Typography sx={{marginTop:'50px'}}></Typography>
  </Container> 



    <Grid container>
        <Grid item xs={12} md={6}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, p: 2, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                <img src={`${globalConfig.get().apiUrl}/download/${reservation.image_Url}`} alt="..." style={{ height: '450px', objectFit: 'cover', borderRadius: '2%', width: '100%' }}/>
              </Box>              
            </Stack>
          </Grid>  
          <Grid item xs={12} md={6}> </Grid> 
    </Grid>   
    <Typography sx={{marginTop:'30px'}}></Typography>
    </Container>
  );
};

export default PrestationMainPied
