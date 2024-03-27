import { Grid, Typography,Link, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';


export interface MenuNavigationData {
    id: number;
    attributes: {
      content: string;
    
    };
  }
  
  export interface MenuNavigationResponse {
    data: MenuNavigationData;
    meta: Record<string, any>;
  }

const TermsConditions: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuNavigationData | null>(null);

  useEffect(() => {
    // Supposons que vous utilisez fetch ou axios pour récupérer les données
    fetch('http://localhost:1337/api/terms-condition')
      .then(response => response.json())
      .then((data: MenuNavigationResponse) => {
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
      
      <Grid container spacing={5} textAlign={'center'} >
      <Grid item xs={12} >
        <Typography sx={{fontFamily:'Poppins', textDecoration:'none', color:'#fff'}}>{menuData.attributes.content}<Link sx={{fontFamily:'Poppins', textDecoration:'none', color:'#fff'}}></Link></Typography>
      </Grid>
      </Grid>
     
    </Box>
  );
};

export default TermsConditions;

