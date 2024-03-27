import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, List, ListItem } from '@mui/material';
import Logo from './Logo';

export interface MenuItemAttributes {
  accueil: string;
  about: string;
  services: string;
  reservation: string;
  boutique: string;
  contact: string;
}

export interface MenuItem {
  id: number;
  attributes: MenuItemAttributes;
}

export interface TopMenuResponse {
  data: MenuItem[];
  meta: Record<string, any>;
}

const TopMenuNavigation: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuItem[] | null>(null);
  
  useEffect(() => {
    fetch('http://localhost:1337/api/top-menus')
      .then(response => response.json())
      .then((data: TopMenuResponse) => {
        setMenuData(data.data);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  if (!menuData) {
    return <div>Loading...</div>;
  }

  const menuAttributes = menuData[0].attributes;

  return (
    <Box>
      <AppBar sx={{ marginTop: '60px', backgroundColor:'#fff' }}>
        <Toolbar>
          <Logo />
          <List sx={{ display: 'flex', fontFamily: 'Poppins', fontSize: '25px', color: '#525455', marginLeft: '300px'}}>
  <ListItem sx={{color:'#AE489E'}} button>{menuAttributes.accueil}</ListItem>
  <Box sx={{ width: '30px' }} /> {/* Ajoute un espace de 10px entre les éléments */}
  <ListItem  button>{menuAttributes.about}</ListItem>
  <Box sx={{ width: '30px' }} />
  <ListItem button>{menuAttributes.services}</ListItem>
  <Box sx={{ width: '30px' }} />
  <ListItem button>{menuAttributes.reservation}</ListItem>
  <Box sx={{ width: '30px' }} />
  <ListItem button>{menuAttributes.boutique}</ListItem>
  <Box sx={{ width: '30px' }} />
  <ListItem button>{menuAttributes.contact}</ListItem>
</List>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopMenuNavigation;
