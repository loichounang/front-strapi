import React, {useState,useRef, useEffect} from 'react';

import { useTranslation  } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { useNavigate } from 'react-router-dom';

import {  useRecoilValue, useRecoilState } from 'recoil';

import {Language as LanguageIcon, TranslateOutlined as TranslateOutlinedIcon,  } from '@mui/icons-material';

import { BsGlobe } from 'react-icons/bs';
import { IoChevronUpOutline } from 'react-icons/io5';
import { FaFileExport } from 'react-icons/fa';
import { TbLayoutDashboard } from 'react-icons/tb';


import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon  from '@mui/icons-material/Instagram';
import TwitterIcon  from '@mui/icons-material/Twitter';
import LinkedInIcon  from '@mui/icons-material/LinkedIn';

import ClickAwayListener from '@mui/material/ClickAwayListener';

import { flexBetweenCenter, fullWidthFlex, justifyCenter, typographyBigGroupBoxStyling, typographyGroupBoxStyling } from 'themes/commonStyles';

import { isExportBoxShowAtom, isDesktopPublishingBoxShowAtom ,currentUserSessionAtom } from 'library/store';
import { Divider, Grid, Link, TextField, Typography } from '@mui/material';

import { globalConfig } from 'config';

import useUtils from 'library/utils';

import { IGaleryPhoto, IMainInformation, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { useQuery } from 'react-query';
import { isFalsy } from 'utility-types';




export const Footer = () => {

  const { getMainInformations, getGaleryPhotos } = useMainInformation();

  const {data: mainInformations} = useQuery<IMainInformation[]>( ['MainInformation'], () => getMainInformations());
  const {data: galeryPhotos} = useQuery<IGaleryPhoto[]>( ['GaleryPhoto'], () => getGaleryPhotos());

  const {capitalizeFirstLetter, range} = useUtils();

  const { t, i18n } = useTranslation(); 

  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
  useEffect(() => {
    
      if(!isFalsy(mainInformations) && mainInformations?.length>0)
        setMainInformation(mainInformations[0]);
}, [mainInformations]);

const [photos, setPhotos] = useState<IGaleryPhoto[]>([]);
  useEffect(() => {
    setPhotos(galeryPhotos || []);
}, [galeryPhotos]);
  

  return (
    <Box
      sx={{
        ...fullWidthFlex,
        borderTop: '1px solid #ddd',
        background: '#231F20'
      }}
    >
      <Container maxWidth='xl'>
      <Grid container spacing={1}>
  <Grid item xs={12} md={3} sx={{ borderRadius: 2, ml: 0 }}>
    <Grid>
      <Stack sx={{ flexDirection: 'column' }}>
        <Box sx={{ mt: 0.25, width: '100%' }}>
          <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }} id="tableTitle" color="white" noWrap>
            {`${t(('PRODUITS'))} `}
          </Typography>
        </Box>

        <Typography sx={{ marginTop: '6px' }}></Typography>

        <Box sx={{ mt: 0.25, width: '100%' }} >
          <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
            {`${t(('IP'))} `}
          </Typography>
        </Box>
        <Box sx={{ mt: 0.25, width: '100%' }} >
          <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
            {`${t(('Intrusion'))} `}
          </Typography>
        </Box>

        <Box sx={{ mt: 0.25, width: '100%' }} >
          <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
            {`${t(('Networking'))} `}
          </Typography>
        </Box>
        <Box sx={{ mt: 0.25, width: '100%' }} >
          <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
            {`${t(("Contrôle d'accès"))} `}
          </Typography>
        </Box>

        <Box sx={{ mt: 0.25, width: '100%' }} >
          <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
            {`${t(('Analyse Vidéo'))} `}
          </Typography>
        </Box>
        <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
          {`${t(('Portiers Vidéos'))} `}
        </Typography>
      </Box>

      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
          {`${t(('Accessoires'))} `}
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
          {`${t(('Contrôle de présence'))} `}
        </Typography>
      </Box>

      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
          {`${t(('Incendie'))} `}
        </Typography>
      </Box>
      </Stack>
    </Grid>
  </Grid>


  <Grid item xs={12} md={2} sx={{ borderRadius: 2, ml: 0 }}>
    <Stack sx={{ flexDirection: 'column' }}>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }} id="tableTitle" color="white" noWrap>
          {`${t(('CATALOGUE'))} `}
        </Typography>
      </Box>

      <Typography sx={{ marginTop: '6px' }}></Typography>

      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
          {`${t(('Liste des tarifs'))} `}
        </Typography>
      </Box>
      
    </Stack>
  </Grid>


  <Grid item xs={12} md={2} sx={{ borderRadius: 2, ml: 0 }}>
    <Stack sx={{ flexDirection: 'column' }}>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }} id="tableTitle" color="white" noWrap>
          {`${t(('SERVICE TECHNIQUE'))} `}
        </Typography>
      </Box>

      <Typography sx={{ marginTop: '6px' }}></Typography>

      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
          {`${t(('Bien être'))} `}
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
          {`${t(('Académie'))} `}
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
          {`${t(('Démos'))} `}
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
          {`${t(('Agenda'))} `}
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
          {`${t(('CCTVDDNS'))} `}
        </Typography>
      </Box>
    </Stack>
  </Grid>


  <Grid item xs={12} md={2} sx={{ borderRadius: 2, ml: 0 }}>
    <Stack sx={{ flexDirection: 'column' }}>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }} id="tableTitle" color="white" noWrap>
          {`${t(('ENTREPRISE'))} `}
        </Typography>
      </Box>

      <Typography sx={{ marginTop: '6px' }}></Typography>

      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
          Qui sommes nous
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
          Rejoignez notre équipe
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
          Prépation de projets
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
          Contact
        </Typography>
      </Box>
    </Stack>
  </Grid>
  <Divider />

  <Grid item xs={12} md={3} sx={{ borderRadius: 2, ml: 0 }}>
    <Stack sx={{ flexDirection: 'column' }}>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }} id="tableTitle" color="white" noWrap>
          {`${t(('NOUVELLES'))} `}
        </Typography>
      </Box>

      <Typography sx={{ marginTop: '6px' }}></Typography>

      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
        Nouveau système d’alarme hybride Ajax, <br/>la combinaison parfaite : filaire et sans fil
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
        Hikvision Motion Detection 2.0, l’Intelligence <br/>Artificielle dans la détection de mouvement
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" noWrap>
        Les dernières mises à jour des <br/>applications iDMSS et gDMSS Plus
        </Typography>
      </Box>
      <Box sx={{ mt: 0.25, width: '100%' }} >
        <Typography component="h3" sx={{ fontFamily: 'Poppins', fontWeight: '500' }} id="tableTitle" color="white" >
        Radioenlaces: Usos y Buenas Prácticas
        </Typography>
      </Box>
    </Stack>
  </Grid>


        <Grid container rowSpacing={0.5} columnSpacing={0.1}>
        <Grid item xs={12}  sx={{ borderRadius: 2, ml: 0,  }} >
          <Stack flexDirection='column'  >
            <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'justify' }} > 
              <Link sx={{fontFamily:'Poppins', textDecoration:'none',  marginRight:'25px'}}>
                <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo_Url}`} alt="Logo" style={{ width: 120, borderRadius: '5%' }} />

              </Link>       
                                                        
            </Box>
            <Typography>
                <Link  target="_blank" style={{ textDecoration: 'none', color: '#3b5998', marginRight: '10px' }}>
                    <FacebookIcon sx={{ fontSize: '30px' }} />
                </Link>
                <Link  target="_blank" style={{ textDecoration: 'none', color: '#e4405f', marginRight: '10px' }}>
                    <InstagramIcon sx={{ fontSize: '30px' }} />
                </Link>
                <Link  target="_blank" style={{ textDecoration: 'none', color: '#1da1f2', marginRight: '10px' }}>
                    <TwitterIcon sx={{ fontSize: '30px' }} />
                </Link>
                <Link  target="_blank" style={{ textDecoration: 'none', color: '#0077b5' }}>
                    <LinkedInIcon sx={{ fontSize: '30px' }} />
                </Link>
            </Typography>  
          </Stack>
        </Grid>
        </Grid>
        </Grid>

        <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  sx={{ fontFamily:'Poppins', fontWeight:'bold', color:'#fff',  textAlign:"center", alignItems:'center'}}  id="tableTitle" noWrap >
                {`${t(('Copyright © 2024 ECDS Sarl tous droits réservés'))} `}
              </Typography>                                                       
            </Box>
</Container>
        
        
     
     
    </Box>
  )
}
