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

import Popper from '@mui/material/Popper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon  from '@mui/icons-material/Instagram';
import TwitterIcon  from '@mui/icons-material/Twitter';
import LinkedInIcon  from '@mui/icons-material/LinkedIn';

import ClickAwayListener from '@mui/material/ClickAwayListener';

import { flexBetweenCenter, fullWidthFlex, justifyCenter, typographyBigGroupBoxStyling, typographyGroupBoxStyling } from 'themes/commonStyles';

import { isExportBoxShowAtom, isDesktopPublishingBoxShowAtom ,currentUserSessionAtom } from 'library/store';
import { Divider, Grid, TextField, Typography } from '@mui/material';

import { globalConfig } from 'config';

import useUtils from 'library/utils';

import { IGaleryPhoto, IMainInformation, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { useQuery } from 'react-query';
import { isFalsy } from 'utility-types';
import { Link } from 'react-router-dom';



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
        background: 'linear-gradient(to right, #371F07, #E4B33F)'
      }}
    >
      <Grid container rowSpacing={0.5} columnSpacing={0.1}>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ borderRadius: 2, ml: 0,  }} >
          <Stack flexDirection='column' alignItems='center' >
            <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center' }} > 
              <Link style={{ fontFamily: 'Poppins', textDecoration: 'none', marginRight: '25px' }} to='/'>
                <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} alt="Logo" style={{ width: 120, borderRadius: '5%' }} />
              </Link>                                                       
            </Box>
           
          </Stack>
        </Grid>
        
       
        <Grid item xs={6} sm={12} md={4} lg={3} sx={{ borderRadius: 2, ml: 0, }} >
          <Stack flexDirection='column'  >
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography  variant='h5'  sx={{ fontFamily: 'Poppins', fontWeight:'bold' }} id="tableTitle" color="white" noWrap >
                {`${t(('NAVIGATION'))} `}
              </Typography>                                                       
            </Box>

            <Typography sx={{marginTop:'6px'}}></Typography>

            <Box sx={{ mt: 0.25, width: '100%' }} > 
            <Link to="/" style={{ fontFamily: 'Poppins', fontWeight: '500', color: 'white', textDecoration:'none' }}>
                {`${t(('Accueil'))} `}
              </Link> 
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Link to='/aboutUs'  style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}} >
              {`${t(('Betuole SPA'))} `}
              </Link>   
            </Box>
          
            <Box sx={{ mt: 0.25, width: '100%' }} > 
            <Link to='/les-resultats-de-nos-soins'   style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}  >
              {`${t(('Résultats de nos soins'))} `}
              </Link>   
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Link to='/le-spa-en-image'  style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}  >
              {`${t(('SPA en image'))} `}
              </Link>   
            </Box>

            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Link to='/contact'  style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}  >
              {`${t(('Contact'))} `}
              </Link>   
            </Box>

            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Link to='/formation'  style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}  >
              {`${t(('Formations'))} `}
              </Link>   
            </Box>
          </Stack>
        </Grid>
        
        <Grid item xs={6} sm={12} md={4} lg={3} sx={{ borderRadius: 2, ml: 0, }} >
          <Stack flexDirection='column'  >
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography  variant='h5'  sx={{ fontFamily: 'Poppins', fontWeight:'bold',color: 'white' }} >
                {`${t(('NOS PRESTATIONS'))} `}
              </Typography>                                                       
            </Box>

            <Typography sx={{marginTop:'6px'}}></Typography>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
            <Link to='/mains-et-pieds'   style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}  >
              {`${t(('Soins de visage'))} `}
              </Link>   
            </Box>
            
            
            <Box sx={{ mt: 0.25, width: '100%' }} > 
            <Link to='/soins-de-corps'  style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}   >
              {`${t(('Soins de corps'))} `}
              </Link>   
            </Box>

            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Link to='/soins-de-visage' style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}   >
              {`${t(('Mains et pieds'))} `}
              </Link>   
            </Box>
           
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Link to='/bien-être'  style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}   >
              {`${t(('Bien être et Spa'))} `}
              </Link>   
            </Box>

            <Box sx={{ mt: 0.25, width: '100%' }} > 
            <Link to='/relooking-micropigmentation'   style={{ fontFamily:'Poppins', fontWeight:'500', color: 'white', textDecoration:'none'}}  >
              {`${t(('Relooking visage et micro pigmentation'))} `}
              </Link>   
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} sx={{ borderRadius: 2, ml: 0, }} >
          <Stack flexDirection='column'  >
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography  variant='h5'  sx={{ fontFamily: 'Poppins', fontWeight:'bold' }} id="tableTitle" color="white" noWrap >
                {`${t(('CONTACT'))} `}
              </Typography>                                                       
            </Box>

            <Typography sx={{marginTop:'6px'}}></Typography>

            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  sx={{ fontFamily:'Poppins', fontWeight:'500'}}  id="tableTitle" color="white" noWrap >
               Horaire : {mainInformation.horaire1}
              </Typography>   
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3" sx={{ fontFamily:'Poppins', fontWeight:'500'}} id="tableTitle" color="white" noWrap >
                Téléphone :{mainInformation.portable1}
              </Typography>   
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  sx={{ fontFamily:'Poppins', fontWeight:'500'}}  id="tableTitle" color="white" noWrap >
                Email : {mainInformation.email1}
              </Typography>   
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  sx={{ fontFamily:'Poppins', fontWeight:'500'}} id="tableTitle" color="white" >
                {mainInformation.localisation}
              </Typography>   
            </Box>
          </Stack>
        </Grid>
        <Divider />
        <Grid item xs={12} sx={{ borderRadius: 2, ml: 0, }} >
          <Stack flexDirection='column'  textAlign="center">
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  sx={{ fontFamily:'Poppins', fontWeight:'500'}}  id="tableTitle" color="white" noWrap >
                {`${t(('Copyright © 2024 BetuoleSpa tous droits réservés'))} `}
              </Typography>                                                       
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
