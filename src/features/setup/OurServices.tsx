import React, { useEffect, useState } from 'react';

import { Box, Typography, Button, Stack, Divider, } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Grid, IconButton } from '@mui/material';


import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { IMainInformation, ISpecialOfferDefintion, ISpeciality, ISpecialityDefinition, defaultMainInformation, defaultSpecialityDefinition } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';

import { globalConfig } from 'config';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';



const SpecialityStack = (speciality: ISpeciality ) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Stack
      flexDirection='column'
      textAlign="center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Box
          sx={{
            mt: 1,
            width: '100%',
            background: '#f5f5f9',
            padding: '1rem',
            height: '350px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            borderRadius: '2%',
          }}
        >
          <Typography sx={{mb: 2}} component="h1"  {...typographyBigGroupBoxStyling}>
            {speciality.nom}
          </Typography>
          <Typography component="h3" {...typographyGroupBoxStyling}>
            {speciality.description}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mt: 1,
            width: '100%',
            backgroundImage: `url('${globalConfig.get().apiUrl}/download/${speciality.image_Url}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '1rem',
            height: '350px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            borderRadius: '2%',
          }}
        >
          <Typography sx={{ background: 'rgba(0, 0, 0, 0.5)', color: 'white' }} {...typographyGroupBoxStyling} >
            {speciality.nom}
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

const OurServices = () => {

  const { t, i18n } = useTranslation();  // TitreBienvenue

  const { getMainInformations, getSpecialityDefinitions, getSpecialities} = useMainInformation();

  const {data: mainInformations} = useQuery<IMainInformation[]>( ['MainInformation'], () => getMainInformations());
  const {data: specialityDefinitions} = useQuery<ISpecialityDefinition[]>( ['SpecialityDefinition'], () => getSpecialityDefinitions());
  const {data: specialities} = useQuery<ISpeciality[]>( ['Speciality'], () => getSpecialities());

  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
  useEffect(() => {
    
      if(!isFalsy(mainInformations) && mainInformations?.length>0)
        setMainInformation(mainInformations[0]);
  }, [mainInformations]);

  const [specialityDefinition, setSpecialityDefinition] = useState<ISpecialityDefinition>(defaultSpecialityDefinition);
    useEffect(() => {
      
        if(!isFalsy(specialityDefinitions) && specialityDefinitions?.length>0)
          setSpecialityDefinition(specialityDefinitions[0]);
  }, [specialityDefinitions]);


  return (
    <Box bgcolor="white" color="back" py={0.25} px={2} textAlign="center" mt={5}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12}>            
            <Stack flexDirection='column' textAlign="center" >
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h3" {...typographySmallHandWriting} >
                  {specialityDefinition.titreGlobal} 
                </Typography>                
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Typography component="h1"  {...typographyBigGroupBoxStyling}>
                  {specialityDefinition.titre}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%' }} />                  
                  <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} height={20} width={20} alt='Logo' />                  
                  <Divider sx={{ borderColor: '#371F07', mx: 2, width: '20%', }} />
              </Box>              
            </Stack>
          </Grid>    
          { (specialities || []).map( (speciality, idx) =>    
          (<Grid item xs={12}  sm={6} md={3} key={` ke ${idx} ${speciality.nom}`}>            
            <SpecialityStack {...speciality}/> 
          </Grid>)  
          )}
        </Grid>
    </Box>
  );
};

export default OurServices;
