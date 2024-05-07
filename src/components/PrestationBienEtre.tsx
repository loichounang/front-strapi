import React, { useEffect, useState } from 'react';
import {IReservation,defaultReservation, IMassage,IRelaxation,IEpilation,ISoinAmincissant,IVajacial } from '../features/setup/models/MainInformation'; 
import { Grid, Container, Typography,Stack,Box, Button } from '@mui/material';
import useMainInformation from 'features/setup/services/MainInformation';
import { useQuery } from 'react-query';
import { isFalsy } from 'utility-types';
import { globalConfig } from 'config';
import { AppointmentFormDialog } from 'components/AppointmentFormDialog';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';
import { useTranslation } from 'react-i18next';


const PrestationBienEtre = () => {
    const { t, i18n } = useTranslation();
    const {  getReservations, getMassage, getEpilationCire, getSoinAmincissant, getRelaxation,getVajacial } = useMainInformation();
    const {data: massages} = useQuery<IMassage[]>( ['Massage'], () => getMassage());
    const {data: epilations} = useQuery<IEpilation[]>( ['Epilation'], () => getEpilationCire());
    const {data: soinsAmincissants} = useQuery<IRelaxation[]>( ['SoinMinceur'], () => getSoinAmincissant());
    const {data: relaxations} = useQuery<ISoinAmincissant[]>( ['PackageSoinCorps'], () => getRelaxation());
    const {data: vajacials} = useQuery<IVajacial[]>( ['PackageSoinCorps'], () => getVajacial());

    const {data: reservations} = useQuery<IReservation[]>( ['Reservation'], () => getReservations());
    const [openAppointmentForm, setOpenAppointmentForm] = useState<boolean>(false);

    const [reservation, setReservation] = useState<IReservation>(defaultReservation);
    useEffect(() => {
      console.log(reservations);
      if(!isFalsy(reservations) && reservations?.length>0)
        setReservation(reservations[0]);
  }, [reservations]);

  return (
    <Container maxWidth='xl'sx={{marginTop:'100px'}}>
    <Container  maxWidth='xl' sx={{bgcolor:'#DBA82F', color:'white'}}>
   <Grid container >
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px',marginTop:'50px'}} {...typographySmallHandWriting}> 
                  {t('Bien-être & rélaxation')}
                </Typography>                
              </Box>
          </Grid>
          <Typography sx={{marginTop:'150px'}}></Typography>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      
    <Grid container spacing={1}>
      {( relaxations || []).map( (relaxation, idx) => (
        
        <Grid xs={12}  md={4} key={relaxation.id}>
          <Typography variant='h6' sx={{fontFamily:'Poppins', fontWeight:'bold'}}>{relaxation.titre}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{relaxation.duree}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{relaxation.prix}</Typography>
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

 <Container maxWidth='xl' sx={{bgcolor:'#371F07', color:'white'}}>   
  <Grid container sx={{marginTop:'100px'}}>
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px',marginTop:'50px'}} {...typographySmallHandWriting}> 
                  {t('Épilation à la cire')}
                </Typography>                
              </Box>
          </Grid>
          <Typography sx={{marginTop:'150px'}}></Typography>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
    
    <Grid container item>
      {( epilations || []).map( (epilation, idx) => (
        
        <Grid xs={6} md={6} key={epilation.id}>
          <Typography variant='h6' sx={{fontFamily:'Poppins', fontWeight:'bold'}}>{epilation.titre}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{epilation.duree}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{epilation.prix}</Typography>
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

  <Container maxWidth='xl' sx={{bgcolor:'#DBA82F', color:'white'}}>
  <Grid container sx={{marginTop:'100px'}}>
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px',marginTop:'50px'}} {...typographySmallHandWriting}> 
                  {t('Massage')}
                </Typography>                
              </Box>
          </Grid>
          <Typography sx={{marginTop:'150px'}}></Typography>
          <Grid item xs={12} md={4}></Grid>
        </Grid>

    <Grid container item>
      {( massages || []).map( (massage, idx) => (
        
        <Grid xs={6} md={4} key={massage.id}>
          <Typography variant='h6' sx={{fontFamily:'Poppins', fontWeight:'bold'}}>{massage.titre}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{massage.duree}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{massage.prix}</Typography>
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

  <Container  maxWidth='xl' sx={{bgcolor:'#371F07', color:'white'}}>
  <Grid container sx={{marginTop:'100px'}}>
          <Grid item xs={12} md={7}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px',marginTop:'50px'}} {...typographySmallHandWriting}> 
                  {t('Soin amincissant sauna couverture chauffante')}
                </Typography>                
              </Box>
          </Grid>
          <Typography sx={{marginTop:'150px'}}></Typography>
          <Grid item xs={12} md={5}></Grid>
        </Grid>

    <Grid container item>
      {( soinsAmincissants || []).map( (soinAmincissant, idx) => (
        
        <Grid xs={12} md={6} key={soinAmincissant.id}>
          <Typography variant='h5' sx={{fontFamily:'Poppins', fontWeight:'bold'}}>{soinAmincissant.titre}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{soinAmincissant.duree}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{soinAmincissant.prix}</Typography>
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

<Container maxWidth='xl' sx={{bgcolor:'#DBA82F', color:'white'}}>
  <Grid container sx={{marginTop:'100px'}}>
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px'}} {...typographySmallHandWriting}> 
                  {t('Vajacial')}
                </Typography>                
              </Box>
          </Grid>
          <Typography sx={{marginTop:'150px'}}></Typography>
          <Grid item xs={12} md={4}></Grid>
        </Grid>

    <Grid container item>
      {( vajacials || []).map( (vajacial, idx) => (
        
        <Grid xs={12} md={6} key={vajacial.id}>
          <Typography variant='h6' sx={{fontFamily:'Poppins', fontWeight:'bold'}}>{vajacial.titre}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{vajacial.duree}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{vajacial.prix}</Typography>
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
            <Stack flexDirection='column' >
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

export default PrestationBienEtre
