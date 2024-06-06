import React, { useEffect, useState } from 'react';

import { Box, Typography, Button, Stack, Divider, List, ListItem, ListItemText, ListItemIcon, } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Grid, IconButton } from '@mui/material';

import DoneIcon from '@mui/icons-material/Done';


import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { IMainInformation, IValueDefintion, IValueSpa, defaultMainInformation, defaultValueDefintion } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';

import { globalConfig } from 'config';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const OurValues = () => {

  const { t, i18n } = useTranslation();  // TitreBienvenue

  const { getMainInformations, getValueDefinitions, getValueSpas } = useMainInformation();
  const {data: mainInformations} = useQuery<IMainInformation[]>( ['MainInformation'], () => getMainInformations());
  const {data: valueDefinitions} = useQuery<IValueDefintion[]>( ['ValueDefinition'], () => getValueDefinitions());
  const {data: values} = useQuery<IValueSpa[]>( ['Value'], () => getValueSpas());

  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
  useEffect(() => {
    
      if(!isFalsy(mainInformations) && mainInformations?.length>0)
        setMainInformation(mainInformations[0]);
}, [mainInformations]);

const [valueDefinition, setValueDefinition] = useState<IValueDefintion>(defaultValueDefintion);
  useEffect(() => {
    
      if(!isFalsy(valueDefinitions) && valueDefinitions?.length>0)
        setValueDefinition(valueDefinitions[0]);
}, [valueDefinitions]);


  return (
    <Box bgcolor="white" color="back" py={0.25} px={2} textAlign="center" sx={{marginTop:'30px'}}>
        <Grid container justifyContent="space-between">
          <Grid item xs={12}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h3" {...typographySmallHandWriting}>
                  {valueDefinition.titreGlobal} 
                </Typography>                
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant='h5' sx={{fontFamily:'Poppins', fontWeight:'700'}}>
                  {valueDefinition.titreQuestion}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%' }} />                  
                  <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} height={20} width={20} alt='Logo' />                  
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%', }} />
              </Box>              
            </Stack>
          </Grid>    
          <Grid container item xs={12} md={2} ></Grid>
          <Grid container item xs={12} md={4} direction="column" justifyContent="flex-start" alignItems="flex-start">            
            <Stack flexDirection='column' alignItems='flex-start' width='100%' alignContent='flex-start'>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'flex-start'}}>
                <Typography 
                  variant='h5' sx={{fontFamily:'Poppins', fontWeight:'700'}}>
                  {valueDefinition.titreListe} 
                </Typography>
                <List dense={true}>                  
                  {
                    (values || []).map( (val, idx) => 
                      (<ListItem key={` val ${idx} ${val.principale}`}>
                        <ListItemIcon>
                          <DoneIcon sx={{ color: '#DBA82F' }} />
                        </ListItemIcon>
                        <ListItemText> 
                          <Typography variant='h6' sx={{fontFamily:'Poppins', fontWeight:'700'}}>
                            {val.principale}
                          </Typography>
                          
                        </ListItemText>
                    </ListItem> )
                    )}
                                   
                </List>                
              </Box>              
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                
              </Box>              
            </Stack>
          </Grid>     
          <Grid item xs={12} md={4}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, p: 2, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                <img src={`${globalConfig.get().apiUrl}/download/${valueDefinition.image_Url}`} 
                    alt="..." style={{ height: '400px', objectFit: 'cover', borderRadius: '2%', width: '100%'}}/>
              </Box>              
            </Stack>
          </Grid>  
          <Grid container item xs={12} md={2} ></Grid>
        </Grid>
    </Box>
  );
};


export default OurValues;
