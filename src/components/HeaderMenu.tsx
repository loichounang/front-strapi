import React, { useEffect, useState } from 'react';

import Box  from '@mui/material/Box';

import MenuIcon from '@mui/icons-material/Menu';

import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import Typography from '@mui/material/Typography';


import {
  flexBetweenCenter,
  dFlex,
  displayOnDesktop,
  displayOnMobile,
} from 'themes/commonStyles';

import { AppBar,  Divider,  Drawer,  IconButton,List,ListItem,ListItemIcon,Toolbar } from '@mui/material';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PersonIcon from '@mui/icons-material/Person';



import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { isFalsy } from 'utility-types';

import { globalConfig } from 'config';

import { IMainInformation, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import SousMenus from './SousMenus';

export const HeaderMenu = () => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();  

  const { getMainInformations } = useMainInformation();

  const {data: mainInformations} = useQuery<IMainInformation[]>( ['MainInformation'], () => getMainInformations());

  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event : any) => {    
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }


  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
  useEffect(() => {
    console.log(mainInformations);
      if(!isFalsy(mainInformations) && mainInformations?.length>0)
        setMainInformation(mainInformations[0]);
}, [mainInformations]);


const [subMenuOpen, setSubMenuOpen] = useState(false);

const handleSubMenuOpen = () => {
  setSubMenuOpen(true);
};

const handleSubMenuClose = () => {
  setSubMenuOpen(false);
};



  

    return (
      <AppBar position="static" sx={{ backgroundColor: 'white', height:'75px' }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent={"space-around"}>
          <Grid item xs={2}>            
              <Link to="/">
                <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo1_Url}`} alt="Logo" style={{ marginRight: '10px', width: 130, height:'75px', marginTop:'7px' }} />
              </Link>   
          </Grid>
          <Grid item xs={10} container justifyContent="space-around" sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button color="inherit" component={Link} to="/" sx={{ color: '#DBA82F', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' }}}>{t('Home').toUpperCase()}</Button>
      <Button color="inherit" component={Link} to="/aboutUs" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' } }}>{t(" Betuole Spa").toUpperCase()}</Button>
      <Button
  color="inherit"
  onMouseEnter={handleSubMenuOpen}
  onMouseLeave={handleSubMenuClose}
  sx={{
    color: 'black',
    fontWeight: 'bold',
    fontSize: '0.75rem', 
    fontFamily:'Poppins',
    '&:hover': { color: '#DBA82F' }
  }}
>
  {t('Prestations').toUpperCase()}
  {subMenuOpen && (
    <Box sx={{ position: 'absolute', top: '100%', left: 0 }}>
      <SousMenus onClose={handleSubMenuClose} open={true} />
    </Box>
  )}
</Button>
<Button color="inherit" component={Link} to="/boutique" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' }}}>{t('Résultats de nos soins').toUpperCase()}</Button>
      <Button color="inherit" component={Link} to="/boutique" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' }}}>{t('Spa en image').toUpperCase()}</Button>
      <Button color="inherit" component={Link} to="/contact" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' } }}>{t('Contact').toUpperCase()}</Button>
      <Button color="inherit" component={Link} to="/reservation" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' } }}>{t('Reservation').toUpperCase()}</Button>
    </Grid>   

          <Grid item xs={10} container justifyContent="flex-end" sx={ {display: { xs: 'flex', md: 'none' }} }>
            <IconButton onClick={handleClick} edge="start" sx={{ color: '#000', fontSize: '45px' }} aria-label="menu">
              <MenuIcon sx={{ color: '#000', fontSize: '55px' }} />
            </IconButton>
            <Menu anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >        
            <MenuItem onClick={() => {navigate('/')}}>
              <ListItemIcon color="primary">
                <HomeIcon fontSize="small" sx={{color:"#DBA82F"}} />
              </ListItemIcon>
              <Typography variant="body1" fontWeight="bold" color="black">{t('Home').toUpperCase()}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {navigate('aboutUs')}}>
              <ListItemIcon color="primary">
                <PersonIcon fontSize="small" sx={{color:"#DBA82F"}}/>
              </ListItemIcon>
              <Typography variant="body1" fontWeight="bold" color="black">{t('About us').toUpperCase()}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {navigate('service')}}>
              <ListItemIcon color="primary">
                <RoomServiceIcon fontSize="small" sx={{color:"#DBA82F"}}/>
              </ListItemIcon>
              <Typography variant="body1" fontWeight="bold" color="black">{t('Service').toUpperCase()}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {navigate('reservation')}}>
              <ListItemIcon color="primary">
                <EventSeatIcon fontSize="small" sx={{color:"#DBA82F"}}/>
              </ListItemIcon>
              <Typography variant="body1" fontWeight="bold" color="black">
                {t('Reservation').toUpperCase()}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {navigate('shop')}}>
              <ListItemIcon color="primary">
                <StorefrontIcon fontSize="small" sx={{color:"#DBA82F"}}/>
              </ListItemIcon>
              <Typography variant="body1" fontWeight="bold" color="black">{t('Shop').toUpperCase()}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {navigate('contact')}}>
              <ListItemIcon color="primary">
                <ContactMailIcon fontSize="small" sx={{color:"#DBA82F"}}/>
              </ListItemIcon>
              <Typography variant="body1" fontWeight="bold" color="black">{t('Contact').toUpperCase()}</Typography>
            </MenuItem>
      </Menu>
          </Grid>
        </Grid>
        
      </Toolbar>
    </AppBar>
    );
  }
