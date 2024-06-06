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

import { AppBar,  ClickAwayListener,  Divider,  Drawer,  IconButton,List,ListItem,ListItemIcon,Toolbar } from '@mui/material';

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showPrestationsSubMenu, setShowPrestationsSubMenu] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const togglePrestationsSubMenu = () => {
    setShowPrestationsSubMenu(!showPrestationsSubMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowPrestationsSubMenu(false); // Assurez-vous de masquer le sous-menu lorsque le menu principal est fermé
  };
  

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
<Button color="inherit" component={Link} to="/les-resultats-de-nos-soins" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' }}}>{t('Résultats de nos soins').toUpperCase()}</Button>
      <Button color="inherit" component={Link} to="/le-spa-en-image" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' }}}>{t('Spa en image').toUpperCase()}</Button>
      <Button color="inherit" component={Link} to="/contact" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' } }}>{t('Contact').toUpperCase()}</Button>
      <Button color="inherit" component={Link} to="/formation" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' } }}>{t('Formations').toUpperCase()}</Button>
      <Button color="inherit" component={Link} to="/reservation" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.75rem', fontFamily:'Poppins', '&:hover': { color: '#DBA82F' } }}>{t('Reservation').toUpperCase()}</Button>
    </Grid>  

    <Grid item xs={10} container justifyContent="flex-end" sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton onClick={handleClick} edge="start" sx={{ color: '#000', fontSize: '45px' }} aria-label="menu">
        <MenuIcon sx={{ color: '#000', fontSize: '55px' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { navigate('/'); handleClose(); }}>
          <Typography variant="body1" fontWeight="bold" color="black">Accueil</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { navigate('aboutUs'); handleClose(); }}>
          <Typography variant="body1" fontWeight="bold" color="black">Betuole Spa</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={togglePrestationsSubMenu}>
          <Typography variant="body1" fontWeight="bold" color="black">Prestations</Typography>
        </MenuItem>
        <Divider />
        {showPrestationsSubMenu && (
          <>
            <MenuItem onClick={() => { navigate('soins-de-visage'); handleClose(); }}>
              <Typography variant="body1" fontWeight="bold" color="black">Soins du visage</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { navigate('soins-de-corps'); handleClose(); }}>
              <Typography variant="body1" fontWeight="bold" color="black">Soins de corps</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { navigate('mains-et-pieds'); handleClose(); }}>
              <Typography variant="body1" fontWeight="bold" color="black">Mains et Pieds</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { navigate('bien-être'); handleClose(); }}>
              <Typography variant="body1" fontWeight="bold" color="black">Bien être et Spa</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { navigate('relooking-micropigmentation'); handleClose(); }}>
              <Typography variant="body1" fontWeight="bold" color="black">Relooking visage et micro pigmentation</Typography>
            </MenuItem>
            <Divider />
          </>
        )}
        
        <MenuItem onClick={() => { navigate('les-resultats-de-nos-soins'); handleClose(); }}>
          <Typography variant="body1" fontWeight="bold" color="black">Résultats de nos soins</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { navigate('le-spa-en-image'); handleClose(); }}>
          <Typography variant="body1" fontWeight="bold" color="black">Spa en image</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { navigate('contact'); handleClose(); }}>
          <Typography variant="body1" fontWeight="bold" color="black">Contact</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { navigate('formation'); handleClose(); }}>
          <Typography variant="body1" fontWeight="bold" color="black">Formations</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { navigate('reservation'); handleClose(); }}>
          <Typography variant="body1" fontWeight="bold" color="black">Réservation</Typography>
        </MenuItem>
        <Divider />
      </Menu>
    </Grid>

        </Grid>
        
      </Toolbar>
    </AppBar>
    );
  }
