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

import { AppBar,  Divider,  Drawer,  IconButton,List,ListItem,ListItemIcon,Toolbar,Accordion, AccordionSummary, AccordionDetails, ListItemText } from '@mui/material';

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
import SousMenus from './SousMenus';
import { SubCategory, CategoryMap } from './ui/Types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



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
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleSubMenuOpen = () => {
    setSubMenuOpen(true);
  };
  
  const handleSubMenuClose = () => {
    setSubMenuOpen(false);
  };
  
  const [categories, setCategories] = useState<CategoryMap>({});

  useEffect(() => {
    // Fonction pour récupérer les catégories et sous-catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://skrapi-api.univ-soft.com/api/production/content/v1/uivso3e8mh70hadagairiyamswx/subCategory/get-contents'
        );
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data: SubCategory[] = await response.json();
        console.log('Données récupérées:', data); // Ajoutez cette ligne pour vérifier les données récupérées
        const categoriesMap: CategoryMap = {};

        data.forEach((item) => {
          const { sousCategorie_ParentText, sousCategorie_Text, sousCategorie, sousCategorie_Parent } = item;
          if (!categoriesMap[sousCategorie_ParentText]) {
            categoriesMap[sousCategorie_ParentText] = [];
          }
          categoriesMap[sousCategorie_ParentText].push({
            id: item.id,
            sousCategorie,
            sousCategorie_Text,
            sousCategorie_Parent,
            sousCategorie_ParentText,
          });
        });

        console.log('Categories map:', categoriesMap); // Ajoutez cette ligne pour vérifier la structure de categoriesMap
        setCategories(categoriesMap);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchCategories();
  }, []);

 
    return (
      <AppBar position="static" sx={{ backgroundColor: 'white', height:'75px' }}>
      <Toolbar>
      <Grid container alignItems="center" justifyContent={"space-around"}>
  <Grid item xs={10} container justifyContent="space-around" sx={{ display: { xs: 'none', md: 'flex' } }}>
  <Button color="inherit" component={Link} to="/" sx={{ color: 'black', fontWeight: '500', fontSize: '0.95rem', fontFamily:'Poppins', '&:hover': { color: '#922790' }, margin: '0 ' }}>{t("Accueil").toUpperCase()}</Button>
  <Button
  color="inherit"
  onMouseEnter={handleSubMenuOpen}
  onMouseLeave={handleSubMenuClose}
  sx={{
    color: 'black',
    fontWeight: '500',
    fontSize: '0.95rem', 
    fontFamily:'Poppins',
    '&:hover': { color: '#DBA82F' }
  }}
>
  {t('Produits').toUpperCase()}
  {subMenuOpen && (
    <Box sx={{ position: 'absolute', top: '100%', left: 0 }}>
      <SousMenus onClose={handleSubMenuClose} open={true} />
    </Box>
  )}
</Button>

    <Button color="inherit" component={Link} to="/aboutUs" sx={{ color: 'black', fontWeight: '500', fontSize: '0.95rem', fontFamily:'Poppins', '&:hover': { color: '#922790' }, margin: '0 ' }}>{t(" A Propos de nous").toUpperCase()}</Button>
    <Button color="inherit" component={Link} to="/services" sx={{ color: 'black', fontWeight: '500', fontSize: '0.95rem', fontFamily:'Poppins', '&:hover': { color: '#922790' }, margin: '0 ' }}>{t("Nos Services ").toUpperCase()}</Button>
    <Button
    component={Link} to="/contact"
      color="inherit"
      sx={{
        color: 'black',
        fontWeight: '500',
        fontSize: '0.95rem', 
        fontFamily:'Poppins',
        '&:hover': { color: '#922790' },
        margin: '0'
      }}
    >
      {t('Contact').toUpperCase()}
    </Button>
  </Grid>


  <Grid item xs={10} container justifyContent="flex-end" sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton onClick={handleClick} edge="start" sx={{ color: '#000', fontSize: '45px' }} aria-label="menu">
        <MenuIcon sx={{ color: '#000', fontSize: '55px' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(event) => event.stopPropagation()}
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
       <MenuItem onClick={() => navigate('/')}>
  <Typography variant="body1" fontWeight="500" fontFamily="Poppins" color="black">
    {t('Accueil').toUpperCase()}
  </Typography>
</MenuItem>
<Divider />
<MenuItem onClick={(event) => event.stopPropagation()}>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
    >
      <Typography variant="body1" fontWeight="500" fontFamily="Poppins" color="black">
        {t('Produits').toUpperCase()}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <List>
        {Object.keys(categories).length === 0 ? (
          <ListItem>
            <ListItemText primary={t('Aucune catégorie trouvée')} />
          </ListItem>
        ) : (
          Object.keys(categories).map((categoryName) => (
            <Accordion key={categoryName}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${categoryName}-content`}
                id={`${categoryName}-header`}
                onClick={(event) => event.stopPropagation()}
              >
                <Typography onClick={() => {
                  if (categoryName === 'Surveillance') {
                    navigate('/surveillance');
                  } else {
                    // Mettez ici la logique pour afficher les sous-catégories de la catégorie cliquée
                  }
                }}>{categoryName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component="div" disablePadding>
                  {categories[categoryName].map((subcategory) => (
                    <ListItem key={subcategory.id} sx={{ pl: 4 }}>
                      <ListItemText primary={subcategory.sousCategorie_Text} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </List>
    </AccordionDetails>
  </Accordion>
</MenuItem>

        <Divider />
        <MenuItem onClick={() => navigate('aboutUs')}>
          <Typography variant="body1" fontWeight="500" fontFamily="Poppins" color="black">
            {t('A propos de nous').toUpperCase()}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('services')}>
          <Typography variant="body1" fontWeight="500" fontFamily="Poppins" color="black">
            {t('Nos services').toUpperCase()}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('contact')}>
          <Typography variant="body1" fontWeight="500" fontFamily="Poppins" color="black">
            {t('Contact').toUpperCase()}
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
