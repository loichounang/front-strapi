
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "./setup/services/MainInformation";
import { IAboutPage, defaultABoutPage } from './setup/models/MainInformation';
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
  const {  getAboutsPage} = useMainInformation();
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
                  {t('Faites vos soins chez nous')}
                </Typography>                
              </Box>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{t('Ambiance feutrée, cadre intimistes, senteurs envoûtantes : abandonnez-vous au plaisir des sens. Ici, seul l’instant présent compte !')}</Typography>
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
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('Professional Care')}</Typography>
      <Typography variant='body1' sx={{ fontFamily:'Poppins', textAlign:'justify'}}>{t('Tous les produits que nous utilisons sont professionnels et ont une efficacité prouvée. Non compromis.')}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>
    <Typography sx={{marginTop:'30px'}}></Typography> 

    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Typography sx={{marginTop:'20px' }}></Typography>
    <LaboratoryIcon sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('Formule non-toxique')}</Typography>
      <Typography variant='body1' sx={{ fontFamily:'Poppins', textAlign:'justify'}}>{t('Ne vous inquiétez pas, tous nos vernis à ongles et autres produits autres produits sont non-toxiques. Nous nous nous nous soucions de vous et de nos spécialistes.')}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>

    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography sx={{marginTop:'20px' }}></Typography>
    <FilterVintageIcon sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('Green Beauty')}</Typography>
      <Typography variant='body1' sx={{ fontFamily:'Poppins', textAlign:'justify'}}>{t('Toutes les formules de cosmétiques sont biologiques. La majorité de tous les ingrédients sont naturels.')}</Typography>
      <Typography sx={{marginTop:'20px' }}></Typography>
    </Grid>

    <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography sx={{marginTop:'20px' }}></Typography>
    <FavoriteIcon sx={{ fontSize: 45, marginBottom: '10px' }} />
      <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight:'bold'}}>{t('Nous aimons ce que nous faisons')}</Typography>
      <Typography variant='body1' sx={{ fontFamily:'Poppins', textAlign:'justify'}}>{t("Les gens que vous rencontrerez dans notre studio font un travail qu'ils aiment. Venez et assurez-vous qu'il y a une différence.")}</Typography>
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
<Typography variant='h6' sx={{fontFamily:'Poppins', marginTop:'100px'}}>Pourquoi ai-je créé {aboutInformation.titreGlobal}?</Typography>
  <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{aboutInformation.description}</Typography>

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
                  {t('Questions fréquemment posées')}
                </Typography>                
              </Box>
              <Typography sx={{marginTop:'15px'}}></Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{t('Vous trouverez ici les réponses aux questions les plus fréquemment posées. Si vous ne trouvez pas la réponse, n’hésitez pas à nous contacter par courriel ou par téléphone.')}</Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        
      </Container>
      <Typography sx={{marginTop:'30px'}}></Typography>
    <Grid container justifyContent="center" spacing={2}  >
      <Grid item xs={12} md={6}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography variant="h6">Soins du visage</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
            <Typography variant="h6">Soins du corps</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
            <Typography variant="h6">Manucure et pédicure</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
            <Typography variant="h6">Massage et relaxation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
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
