import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
export interface ContactData {
    id: number;
    attributes: {
      contact: string;
      horaires: string;
      numero : number;
      email : string;
      localisation: string
    
    };
  }
  
  export interface ContactResponse {
    data: ContactData;
    meta: Record<string, any>;
  }

const Contact: React.FC = () => {
  const [menuData, setMenuData] = useState<ContactData | null>(null);

  useEffect(() => {
    // Supposons que vous utilisez fetch ou axios pour récupérer les données
    fetch('http://localhost:1337/api/contact')
      .then(response => response.json())
      .then((data: ContactResponse) => {
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
    <Grid container item xs={12} sm={6} md={4} lg={3}>
    <Grid item xs={12}>
      <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>{menuData.attributes.contact}</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontSize: '18px', lineHeight: '33px' }}>{menuData.attributes.horaires}<br />{menuData.attributes.numero}</Typography>
      <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontSize: '18px', lineHeight: '33px' }}>Email:<br />{menuData.attributes.email}</Typography>
      <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontSize: '18px', lineHeight: '33px' }}>{menuData.attributes.localisation}</Typography>
    </Grid>
  </Grid>
  );
};

export default Contact;

