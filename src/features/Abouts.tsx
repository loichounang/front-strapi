import OurValues from './setup/News';
import Reservation from './setup/Reservation';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "./setup/services/MainInformation";
import { IArrierePlan, defaultArrierePlan, IAboutPage, defaultABoutPage } from './setup/models/MainInformation';
import { isFalsy } from 'utility-types';
import { Typography, Box, Link, Divider, Container } from '@mui/material';
import { globalConfig } from 'config';
import { IMainInformation, defaultMainInformation } from './setup/models/MainInformation';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const Abouts: React.FC = () => {
  const { getArrierePlan, getMainInformations, getAboutsPage } = useMainInformation();
  const { data: mainInformations } = useQuery<IArrierePlan[]>(['ArrierePlan'], () => getArrierePlan());
  const [main, setMainInformation] = useState<IArrierePlan>(defaultArrierePlan);
  const { data: mainInformationData } = useQuery<IMainInformation[]>(['MainInformation'], () => getMainInformations());
  const [mainInformation, setMainInformations] = useState<IMainInformation>(defaultMainInformation);
  const { data: AboutInformations } = useQuery<IAboutPage[]>(['AboutPage'], () => getAboutsPage());
  const [AboutInformation, setAboutInformations] = useState<IAboutPage>(defaultABoutPage);

  useEffect(() => {
    if (!isFalsy(mainInformationData) && mainInformationData.length > 0)
      setMainInformations(mainInformationData[0]);
  }, [mainInformationData]);

  useEffect(() => {
    if (!isFalsy(mainInformations) && mainInformations.length > 0)
      setMainInformation(mainInformations[0]);
  }, [mainInformations]);

  useEffect(() => {
    if (!isFalsy(AboutInformations) && AboutInformations.length > 0)
      setAboutInformations(AboutInformations[0]);
  }, [AboutInformations]);

  return (
    <Box>

      <Box sx={{  position: 'relative', width: '100%', height: '100%' }}>
        <img src={`${globalConfig.get().apiUrl}/download/${main.arrierePlan_Url}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt='Logo' />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '100%', zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
            {main.titrePrincipal}
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>
            <Link href="/" sx={{ fontWeight: 'bold', color: '#fff' }}>Home</Link> | {main.titreSecondaire}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center', marginTop:'30px'}}>
        <Typography variant="h3" {...typographySmallHandWriting} >
          {main.titreGlobal} 
        </Typography>                
      </Box>

      <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography component="h1" sx={ {p: 0.25} }  {...typographyBigGroupBoxStyling}>
          {main.titre} 
        </Typography>
      </Box>

      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Divider sx={{ borderColor: 'primary.main', mx: 2, width: '20%' }} />
        <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} height={20} width={20} alt='Logo' />
        <Divider sx={{ borderColor: 'primary.main', mx: 2, width: '20%' }} />
      </Box>

      <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center' , marginTop:'20px'}}>
        <Typography component="h1" sx={ {p: 0.25} }  {...typographyBigGroupBoxStyling}>
          {AboutInformation.titrePrincipal} 
        </Typography>
      </Box>

      <Container maxWidth='xl' sx={{marginTop:'15px', textAlign:'justify'}} >
        <Typography variant='body1' sx={ {p: 0.25} } {...typographySmallHandWriting}>{AboutInformation.titreSecondaire}</Typography>
      </Container>

      <Container maxWidth='xl' sx={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
        <img src={`${globalConfig.get().apiUrl}/download/${AboutInformation.imageLocaux_Url}`} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} alt='Logo' />
      </Container>

      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center', marginTop:'50px'}}>
        <Typography variant="h3" {...typographySmallHandWriting} >
          {AboutInformation.titreGlobal} 
        </Typography>                
      </Box>

      <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Typography component="h1" sx={ {p: 0.25} }  {...typographyBigGroupBoxStyling}>
          {AboutInformation.titre} 
        </Typography>
      </Box>

      <Box sx={{ mt: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Divider sx={{ borderColor: 'primary.main', mx: 2, width: '20%' }} />
        <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} height={20} width={20} alt='Logo' />
        <Divider sx={{ borderColor: 'primary.main', mx: 2, width: '20%' }} />
      </Box>

      <Container maxWidth='xl' sx={{marginTop:'30px'}}>
        <Typography variant='body1' textAlign='justify' sx={ {p: 0.25} }   {...typographySmallHandWriting} >{AboutInformation.titreSecondaire1}</Typography>
      </Container>

      <OurValues />
      <Reservation />
    </Box>
  );
}

export default Abouts;
