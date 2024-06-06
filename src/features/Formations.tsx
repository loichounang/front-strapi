import React, { useEffect, useState } from 'react';
import { Typography, Grid, Container, Box, Stack, Divider, Icon } from '@mui/material';
import { useQuery } from 'react-query';
import { IDefFormation, IFormation, defaultDefFormation} from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { isFalsy } from 'utility-types';
import { typographyBigGroupBoxStyling, typographySmallHandWriting , typographyGroupBoxStyling} from 'themes/commonStyles';
import { globalConfig } from 'config';
import AvisApprenants from './setup/AvisApprenants';
import { IMainInformation, defaultMainInformation } from './setup/models/MainInformation';
import { Phone, LocationCity } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';



const SpecialityStack = (formation: IFormation ) => {
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
            {formation.titreGlobal}
          </Typography>
          <Typography component="h3" {...typographyGroupBoxStyling}>
            {formation.description}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mt: 1,
            width: '100%',
            backgroundImage: `url('${globalConfig.get().apiUrl}/download/${formation.image_Url}')`,
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
            {formation.titreGlobal}
          </Typography>
          
        </Box>
       
      )}
    </Stack>
  );
};


const Formations = () => {
    const { t, i18n } = useTranslation();
  const { getDefFormations, getFormations,getMainInformations} = useMainInformation();
  const {data: FormationInformations} = useQuery<IDefFormation[]>( ['DefFormation'], () => getDefFormations());
  const [formations, setDefFormations] = useState<IDefFormation>(defaultDefFormation );
  const {data: formationInformation} = useQuery<IFormation[]>( ['Formation'], () => getFormations());
  const { data: mainInformationData } = useQuery<IMainInformation[]>(['MainInformation'], () => getMainInformations());
  const [mainInformation, setMainInformations] = useState<IMainInformation>(defaultMainInformation);

  useEffect(() => {
    if (!isFalsy(mainInformationData) && mainInformationData.length > 0)
      setMainInformations(mainInformationData[0]);
  }, [mainInformationData]);

  useEffect(() => {
    if(!isFalsy(FormationInformations) && FormationInformations?.length>0)
        setDefFormations(FormationInformations[0]);
  }, [FormationInformations]);




  return (
    <Box sx={{bgcolor:'#F7F7F7'}}>
<Container maxWidth='xl'>
    <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
    <Box sx={{ mt: 1, p: 2, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                    <img src={`${globalConfig.get().apiUrl}/download/${formations.image_Url}`} alt="..." style={{ height: '550px', objectFit: 'cover', borderRadius: '2%', width: '100%' }}/>
                  </Box>  
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant='h3' sx={{fontFamily:'Poppins', marginTop:'130px'}}>{formations.titreGlobal}</Typography>
      <Typography variant='h6' sx={{fontFamily:'Poppins', textAlign:'justify', marginTop:'35px'}}>{formations.description}</Typography>
      
    
    </Grid>
    </Grid>
    
    </Container>
    
    <Typography sx={{marginTop:'40px'}}> </Typography>
    

    <Container maxWidth='xl' sx={{ marginTop: '30px', color: 'white', backgroundColor: '#371F07' }}>

<Grid container >

  <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Typography sx={{marginTop:'20px' }}></Typography>
    <Icon component={Phone} sx={{ fontSize: 45, marginBottom: '10px' }} />
    <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('CONTACT TELEPHONIQUE')}</Typography>
    <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{mainInformation.portable2}</Typography>
    <Typography sx={{marginTop:'20px' }}></Typography>
  </Grid>
  

  <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Typography sx={{marginTop:'20px' }}></Typography>
    <Icon component={LocationCity} sx={{ fontSize: 45, marginBottom: '10px' }} />
    <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('ADRESSE')}</Typography>
    <Typography variant='h6' sx={{ fontFamily:'Poppins'}}>{mainInformation.localisation2}</Typography>
    <Typography sx={{marginTop:'20px' }}></Typography>
  </Grid>
 
</Grid>

</Container>;

    <Typography sx={{marginTop:'40px'}}> </Typography>
    <Container maxWidth='xl' sx={{marginTop:'70px' }}>
        <Grid container>
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px'}} {...typographySmallHandWriting}> 
                {formations.titre1}
                </Typography>                
              </Box>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{formations.sousTitre1}</Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        
      </Container>


    <Box bgcolor="white" color="back" py={0.25} px={2} textAlign="center" mt={5}>
        <Grid container justifyContent="space-between" alignItems="center">   
          { (formationInformation || []).map( (format, idx) =>    
          (<Grid item xs={12}  sm={6} md={3} key={` ke ${idx} ${format.titreGlobal}`}>            
            <SpecialityStack {...format}/> 
          </Grid>)  
          )}
        </Grid>

    </Box>
    <Typography sx={{marginTop:'40px'}}> </Typography>
    <AvisApprenants/>
    <Typography sx={{marginTop:'50px'}}> </Typography>
    </Box>
  )
}

export default Formations
