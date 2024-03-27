import { Box, AppBar, Typography, Link, Toolbar, Hidden } from '@mui/material';
import { Mail, Facebook, Instagram, Twitter, Call } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

export interface TopMenuInfoData {
  id: number;
  attributes: {
    email: string;
    numero: number;
    texte: string;
  };
}

export interface TopMenuInfoResponse {
  data: TopMenuInfoData ;
  meta: Record<string, any>;
}

function TopMenuInfo() {
  const [menuData, setMenuData] = useState<TopMenuInfoData | null>(null);

  useEffect(() => {
    // Supposons que vous utilisez fetch ou axios pour récupérer les données
    fetch('http://localhost:1337/api/menu-navigation')
      .then(response => response.json())
      .then((data: TopMenuInfoResponse) => {
        setMenuData(data.data);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  if (!menuData) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <AppBar position="fixed" className="secondAppBar" sx={{ background:'#EA489E' }}>
        <Toolbar>
          <Hidden smDown>
            <Link href="#" color="inherit" sx={{ marginRight: '1px' }}>
              <Mail sx={{ fontSize: '25px', marginTop: '5px', marginRight: '3px' }} />
            </Link>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '20px', marginRight: '550px' }}>{menuData.attributes.email}</Typography>
          </Hidden>
          <Hidden mdUp>
            <Link href="#" color="inherit" sx={{ marginRight: '1px' }}>
              <Mail sx={{ fontSize: '25px', marginTop: '5px', marginRight: '3px' }} />
            </Link>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '20px', marginRight: '200px' }}>{menuData.attributes.email}</Typography>
          </Hidden>
          <Link href="#" color="inherit">
            <Call sx={{ fontSize: '25px', marginTop: '5px', marginRight: '3px' }} />
          </Link>
          <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '20px', marginRight: 'auto' }}>{menuData.attributes.numero}</Typography>
          <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '20px', marginRight: '100px' }}>{menuData.attributes.texte}</Typography>
          <Link href="#" color="inherit" sx={{ fontFamily: 'Poppins', textDecoration: 'none', color: '#fff', marginRight: '15px' }}><Facebook sx={{ fontSize: '25px', marginTop: '4px' }} /></Link>
          <Link href="#" color="inherit" sx={{ fontFamily: 'Poppins', textDecoration: 'none', color: '#fff', fontSize: '15px', marginRight: '15px' }}><Instagram sx={{ fontSize: '25px', marginTop: '4px' }} /></Link>
          <Link href="#" color="inherit" sx={{ fontFamily: 'Poppins', textDecoration: 'none', color: '#fff', marginRight: '90px' }}><Twitter sx={{ fontSize: '25px', marginTop: '4px' }} /></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopMenuInfo;
