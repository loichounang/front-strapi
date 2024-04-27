import React, { useEffect, useState } from 'react';

import { Box, Typography, Button, Stack, Divider, } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Grid, IconButton } from '@mui/material';


import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { IMainInformation, ISpecialOffer, ISpecialOfferDefintion, defaultMainInformation, defaultSpecialOfferDefintion } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';

import { globalConfig } from 'config';
import { FormDialog } from 'components/ui/FormDialog';
import { AppointmentForm } from 'features/production/AppointmentForm';
import { defaultAppointment } from 'features/production/models/Appointment';
import { AppointmentFormDialog } from 'components/AppointmentFormDialog';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const SpecialOffers = () => {

  const { t, i18n } = useTranslation();  // TitreBienvenue

  const { getMainInformations, getSpecialOfferDefintions, getSpecialOffers } = useMainInformation();
  const {data: mainInformations} = useQuery<IMainInformation[]>( ['MainInformation'], () => getMainInformations());

  const {data: specialOfferDefintions} = useQuery<ISpecialOfferDefintion[]>( ['SpecialOfferDefintion'], () => getSpecialOfferDefintions());
  const {data: specialOffers} = useQuery<ISpecialOffer[]>( ['SpecialOffer'], () => getSpecialOffers());



  const [openAppointmentForm, setOpenAppointmentForm] = useState<boolean>(false);

  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
  useEffect(() => {
    
      if(!isFalsy(mainInformations) && mainInformations?.length>0)
        setMainInformation(mainInformations[0]);
}, [mainInformations]);


const [specialOfferDefintion, setSpecialOfferDefintion] = useState<ISpecialOfferDefintion>(defaultSpecialOfferDefintion);
  useEffect(() => {
    
      if(!isFalsy(specialOfferDefintions) && specialOfferDefintions?.length>0)
        setSpecialOfferDefintion(specialOfferDefintions[0]);
}, [specialOfferDefintions]);


  return (
    <Box bgcolor="white" color="back" py={0.25} px={2} textAlign="center" mt={5}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
          <Grid item xs={12}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h3" {...typographySmallHandWriting} >
                  {specialOfferDefintion.titreGlobal} 
                </Typography>                
              </Box>
              <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography  sx={ {p: 0.25 ,fontFamily:'Poppins', fontWeight:'700'} }  variant='h5' >
                {specialOfferDefintion.titre} 
                </Typography>
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%' }} />                  
                  <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} height={20} width={20} alt='Logo' />                  
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%', }} />
              </Box> 
              { openAppointmentForm && <AppointmentFormDialog open={openAppointmentForm} setOpen={setOpenAppointmentForm}  /> }             
            </Stack>
          </Grid>    
          { (specialOffers || []).map( (offer, idx) =>
            (<Grid item xs={12} md={6} lg={3} key={`offer ${idx} ${offer.nom}`}>            
              <Stack flexDirection='column' textAlign="center" 
                  sx={ { padding: 2, marging: 2, //borderTopLeftRadius: '15%', borderTopRightRadius: '15%',  
                    borderRadius: '15%',
                    background: '#f5f5f9',
                    backgroundImage: 'none',
                    color: 'black',
                    transition: 'background-image 0.3s ease',
                    height: '550px',
                    '&:hover': {
                      backgroundImage: 'linear-gradient(to right, #371F07, #DBA82F)',
                      color: 'white',
                      '& button': {
                        background: 'white',
                        color: '#DBA82F',
                      },
                    },
                    } }>
                <Box sx={{ mt: 1, p: 2, width: '100%', display: 'flex', justifyContent: 'center', }}> 
                  <div style={{
                    outline: 'none',
                    border: 'none',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto'
                    } }>
                    <img src={`${globalConfig.get().apiUrl}/download/${offer.image_Url}`} alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'  }}/>
                  </div>                
                </Box>
                <Box sx={{ mt: 1, mb: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <Typography variant='h6' sx={{fontFamily:'Poppins', fontWeight:'700'}}>
                    {offer.nom}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5, height: '100px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <Typography component='h1' sx={{fontFamily:'Poppins'}}>
                    {offer.desc1}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5, height: '100px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <Typography component='h1' sx={{fontFamily:'Poppins'}}>
                    {offer.desc2}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5, height: '100px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <Typography component='h1' sx={{fontFamily:'Poppins'}}>
                    {offer.desc3 || ' '}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5, height: '100px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <Typography component='h1' sx={{fontFamily:'Poppins'}}>
                    {offer.desc4 || ' '}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5, height: '100px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <Typography component='h1' sx={{fontFamily:'Poppins'}}>
                    {offer.desc5 || ' '}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Button variant="contained" onClick={() => {setOpenAppointmentForm(true);}}
                      sx={{
                          background:'#DBA82F', 
                          backgroundImage: 'linear-gradient(to right, #371F07, #DBA82F)',
                          color:'#fff', 
                          marginTop:'15px',fontFamily: 'Poppins !important', width:'80%', height:'55px', borderRadius:'30px'}} >
                    PRENEZ RDV
                  </Button>
                </Box>
              </Stack> 
            </Grid>)  
          )}
        </Grid>
         
    </Box>
  );
};


export default SpecialOffers;
