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



export const HeaderMenu = () => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();  

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event : any) => {    
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }


 
    return (
      <AppBar position="static" sx={{ backgroundColor: 'white', height:'75px' }}>
      <Toolbar>
      <Grid container alignItems="center" justifyContent={"space-around"}>
  <Grid item xs={10} container justifyContent="space-around" sx={{ display: { xs: 'none', md: 'flex' } }}>
    <Button color="inherit" component={Link} to="/" sx={{ color: '#922790', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#922790' }, margin: '0' }}>{t('Produits').toUpperCase()}</Button>
    <Button color="inherit" component={Link} to="/aboutUs" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#922790' }, margin: '0 ' }}>{t(" Catalogue").toUpperCase()}</Button>
    <Button color="inherit" component={Link} to="/aboutUs" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#922790' }, margin: '0 ' }}>{t(" Service technique").toUpperCase()}</Button>
    <Button
      color="inherit"
      sx={{
        color: 'black',
        fontWeight: 'bold',
        fontSize: '0.75rem', 
        fontFamily:'Poppins',
        '&:hover': { color: '#922790' },
        margin: '0'
      }}
    >
      {t('Entreprise').toUpperCase()}
    </Button>
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
              
              <Typography variant="body1" fontWeight="bold" color="black">{t('Produits').toUpperCase()}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {navigate('Catalogue')}}>
             
              <Typography variant="body1" fontWeight="bold" color="black">{t('Catalogue').toUpperCase()}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {navigate('service')}}>
             
              <Typography variant="body1" fontWeight="bold" color="black">{t('Service technique').toUpperCase()}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {navigate('entreprise')}}>
             
              <Typography variant="body1" fontWeight="bold" color="black">
                {t('Entreprise').toUpperCase()}
              </Typography>
            </MenuItem>
            <Divider />
            
           
      </Menu>
          </Grid>
        </Grid>
        
      </Toolbar>
    </AppBar>
    );
  }
