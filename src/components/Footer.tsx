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
        background: 'linear-gradient(to right, #371F07, #E4B33F)'
      }}
    >
      <Grid container rowSpacing={0.5} columnSpacing={0.1}>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ borderRadius: 2, ml: 0,  }} >
          <Stack flexDirection='column' alignItems='center' >
            <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center' }} > 
              <Link sx={{fontFamily:'Poppins', textDecoration:'none',  marginRight:'25px'}}>
                <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} alt="Logo" style={{ width: 120, borderRadius: '5%' }} />
              </Link>                                                       
            </Box>
            <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center' }} > 
              <Typography >
                  <Link href={mainInformation.lienFacebook} target="_blank" sx={{fontFamily:'Poppins', textDecoration:'none', color:'#fff', marginRight:'15px'}}>
                      <FacebookIcon  sx={{fontSize:'40px'}}/>
                  </Link>  
                  <Link href={mainInformation.lienInstagram} target="_blank" sx={{fontFamily:'Poppins', textDecoration:'none', color:'#fff', fontSize:'30px', marginRight:'15px'}}>
                      <InstagramIcon sx={{fontSize:'40px'}}/>
                  </Link>  
                  <Link href={mainInformation.lienTwitter} target="_blank" sx={{fontFamily:'Poppins', textDecoration:'none', color:'#fff', marginRight:'15px'}}>
                    <TwitterIcon sx={{fontSize:'40px', color:'#AE'}}/>
                  </Link>
                  <Link href={mainInformation.lienLinkedin} target="_blank" sx={{fontFamily:'Poppins', textDecoration:'none', color:'#fff'}}>
                    <LinkedInIcon sx={{fontSize:'40px', color:'#AE'}}/>
                  </Link>
                </Typography>
            </Box>
          </Stack>
        </Grid>
        
        <Grid item xs={12} sm={12} md={4} lg={3} sx={{ borderRadius: 2, ml: 0, }} >
          <Stack flexDirection='column'  >
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography  component="h2"  {...typographyBigGroupBoxStyling} id="tableTitle" color="white" noWrap >
                {`${t(('CONTACT'))} `}
              </Typography>                                                       
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  {...typographyGroupBoxStyling} id="tableTitle" color="white" noWrap >
                {mainInformation.horaire1}
              </Typography>   
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  {...typographyGroupBoxStyling} id="tableTitle" color="white" noWrap >
                {mainInformation.portable1}
              </Typography>   
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  {...typographyGroupBoxStyling} id="tableTitle" color="white" noWrap >
                {mainInformation.email1}
              </Typography>   
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  {...typographyGroupBoxStyling} id="tableTitle" color="white" >
                {mainInformation.localisation}
              </Typography>   
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}  sx={{ borderRadius: 2, ml: 0, }} >
          <Stack flexDirection='column'  >
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography  component="h2"  {...typographyBigGroupBoxStyling} id="tableTitle" color="white" noWrap >
                {`${t(('NOTRE NEWSLETTER'))} `}
              </Typography>                                                       
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  {...typographyGroupBoxStyling} id="tableTitle" color="white" >
                {`${t(('Abonnez-vous à notre newsletter et recevez toute notre actualité'))} `}
              </Typography>                                                       
            </Box>
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <TextField sx={{width:'calc(100% - 8px)' , border: "#E4B33F", background: 'white'}}  id="email" label=''
                placeholder='Votre adresse e-mail' variant="outlined" 
                inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } autoFocus 
                
              />                                                       
            </Box>
            <Box sx={{ mt: 0.25, width: '100%', display: 'flex', justifyContent: 'center' }} > 
              <Button variant="contained" sx={{background:'linear-gradient(to right, #371F07, #DBA82F)', color:'#fff',
                marginTop:'15px',fontFamily: 'Poppins !important', width:'80%', height:'55px', borderRadius:'30px'}} >
                INSCRIVEZ VOUS
              </Button>                                                       
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} sx={{ borderRadius: 2, ml: 0, }} >
          <Stack flexDirection='column'  >
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography  component="h2"  {...typographyBigGroupBoxStyling} id="tableTitle" color="white" noWrap >
                {`${t(('Galerie'))} `}
              </Typography>                                                       
            </Box>
            {  range(0, ( photos.length+2)/3).map( (ix) => {
                                                    
              return (
                <Box sx={{ mt: 0.25, width: '100%' , display: 'flex',  flexDirection: 'row' }} key={` box-ii- ${ix}`}> 
                  {range(0, Math.min(3, photos.length-3*ix) ).map( (iy) => { // Math.max(getValues().policyExtensions.length, 3*(ix+1))
                    const index = 3*ix + iy;
                    const galaryPhoyo = photos[index];
                    
                    return (
                      <Box sx={{ m : 1, width: '30%' }} > 
                        <img src={`${globalConfig.get().apiUrl}/download/${galaryPhoyo.image_Url}`} alt="..." key={` img ${galaryPhoyo.image_Url}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2%'  }}/>                                                    
                      </Box> )
                      } )
                    }                                                    
                </Box>)
            }) }           
            
          </Stack>
        </Grid>
        <Divider />
        <Grid item xs={12} sx={{ borderRadius: 2, ml: 0, }} >
          <Stack flexDirection='column'  textAlign="center">
            <Box sx={{ mt: 0.25, width: '100%' }} > 
              <Typography component="h3"  sx={{fontFamily:'Poppins', fontWeight:'bold'}} id="tableTitle" color="white" noWrap >
                {`${t(('Copyright © 2024 BetuoleSpa tous droits réservés'))} `}
              </Typography>                                                       
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
