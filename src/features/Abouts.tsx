
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "./setup/services/MainInformation";
import { IAboutPage, defaultABoutPage, IQuestions } from './setup/models/MainInformation';
import { isFalsy } from 'utility-types';
import { Typography, Box, Link, Divider, Container, Icon,Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { globalConfig } from 'config';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';
import Testimonials from './setup/Testimonials';
import {  } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SocialMedia from './setup/SocialMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaboratoryIcon from '@mui/icons-material/Science';
import TeamsIcon from '@mui/icons-material/Group';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';


const Abouts: React.FC = () => {

  const [expanded, setExpanded] = useState<string | false>('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { t, i18n } = useTranslation();
  const {  getAboutsPage, getQuestions} = useMainInformation();
  const {data: questionInformation} = useQuery<IQuestions[]>( ['Questions'], () =>  getQuestions());
  const { data: aboutData } = useQuery<IAboutPage[]>(['AboutPage'], () => getAboutsPage());
  const [aboutInformation, setMainInformations] = useState<IAboutPage>(defaultABoutPage);

  useEffect(() => {
    if (!isFalsy(aboutData ) && aboutData .length > 0)
      setMainInformations(aboutData [0]);
  }, [aboutData ]);

  
  return (
    <Box sx={{bgcolor:'#F7F7F7'}}>

<Grid container spacing={2}>
<Grid item xs={12} md={6}>
<Box sx={{ mt: 1, p: 2, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                <img src={`${globalConfig.get().apiUrl}/download/${aboutInformation.profil1_Url}`} alt="..." style={{ height: '550px', objectFit: 'cover', borderRadius: '2%', width: '100%' }}/>
              </Box>  
</Grid>
<Grid item xs={12} md={6}>
  <Typography variant='h3' sx={{fontFamily:'Poppins', marginTop:'130px'}}>{aboutInformation.titreGlobal}</Typography>
  <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{aboutInformation.titrePrincipal}</Typography>
  <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{aboutInformation.titreSecondaire}</Typography>

</Grid>
</Grid>


<Container maxWidth='xl' sx={{marginTop:'70px' }}>
        <Grid container>
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px'}} {...typographySmallHandWriting}> 
                {aboutInformation.titre3}
                </Typography>                
              </Box>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{aboutInformation.sousTitre3}</Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>  
      </Container>
      <Typography sx={{marginTop:'30px'}}></Typography>

<Container maxWidth='xl' sx={{ marginTop: '30px', color: 'white', backgroundColor: '#371F07' }}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography sx={{marginTop:'20px' }}></Typography>
    <TeamsIcon sx={{ fontSize: 45, marginBottom: '10px' }}/>
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{aboutInformation.titre4}</Typography>
      <Typography variant='body1' sx={{ fontFamily:'Poppins', textAlign:'justify'}}>{aboutInformation.sousTitre4}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>
    <Typography sx={{marginTop:'30px'}}></Typography> 

    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Typography sx={{marginTop:'20px' }}></Typography>
    <LaboratoryIcon sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{aboutInformation.titre5}</Typography>
      <Typography variant='body1' sx={{ fontFamily:'Poppins', textAlign:'justify'}}>{aboutInformation.sousTitre5}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>

    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography sx={{marginTop:'20px' }}></Typography>
    <FilterVintageIcon sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{aboutInformation.titre6}</Typography>
      <Typography variant='body1' sx={{ fontFamily:'Poppins', textAlign:'justify'}}>{aboutInformation.sousTitre6}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>

    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography sx={{marginTop:'20px' }}></Typography>
    <FavoriteIcon sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{aboutInformation.titre7}</Typography>
      <Typography variant='body1' sx={{ fontFamily:'Poppins', textAlign:'justify'}}>{aboutInformation.sousTitre7}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>
   
  </Grid>

</Container>;
<Typography sx={{marginTop:'30px'}}></Typography>

<Grid container spacing={2}>
<Grid item xs={12} md={6}>
<Box sx={{ mt: 1, p: 2, width: '100%', display: 'flex', justifyContent: 'center'}}> 
                <img src={`${globalConfig.get().apiUrl}/download/${aboutInformation.profil2_Url}`} alt="..." style={{ height: '550px', objectFit: 'cover', borderRadius: '2%', width: '100%' }}/>
              </Box>  
</Grid>
<Grid item xs={12} md={6}>
<Typography variant='h6' sx={{fontFamily:'Poppins', marginTop:'60px'}}>{aboutInformation.titre}</Typography>
  <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{aboutInformation.description}</Typography>
  <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{aboutInformation.titre1}</Typography>
  <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{aboutInformation.titre2}</Typography>

</Grid>
</Grid>
<Typography sx={{marginTop:'30px'}}></Typography>

    <Testimonials/>
    <Typography sx={{marginTop:'30px'}} ></Typography>

<Container maxWidth='xl'>
<Container maxWidth='xl' sx={{marginTop:'30px' }}>
        <Grid container>
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px'}} {...typographySmallHandWriting}> 
                {aboutInformation.titre9}
                </Typography>                
              </Box>
              <Typography sx={{marginTop:'15px'}}></Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{aboutInformation.sousTitre9}</Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        
      </Container>
      <Typography sx={{marginTop:'30px'}}></Typography>
    <Grid container justifyContent="center" spacing={2}  >
    <Grid container spacing={3}>
      {questionInformation && questionInformation.map(question => (
        <Grid item xs={12} md={6} key={question.id}>
          <Accordion expanded={expanded === `panel${question.id}`} onChange={handleChange(`panel${question.id}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${question.id}bh-content`} id={`panel${question.id}bh-header`}>
              <Typography variant="h6">{question.titreQuestion}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {question.question}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
    </Grid>
    </Container>
    <Typography sx={{marginTop:'30px'}}></Typography>

    <SocialMedia/>

    <Typography sx={{marginTop:'30px'}}></Typography>
    </Box>
  );
}

export default Abouts;
