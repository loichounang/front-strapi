import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';

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

const Copyrigth: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuNavigationData | null>(null);

  useEffect(() => {
    // Supposons que vous utilisez fetch ou axios pour récupérer les données
    fetch('http://localhost:1337/api/copyright')
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
      <br/>
             
      <Grid container textAlign={'center'} sx={{marginTop:'40px'}}>
      <Grid item xs={12}  >
      <Typography sx={{marginTop:'10px'}}> <hr /></Typography>
        <Typography sx={{fontFamily:'Poppins',  color:'#fff'}}>{menuData.attributes.content}</Typography>
      </Grid>
      </Grid>
      <Typography sx={{marginTop:'8px'}}></Typography>
     
    </Box>
  );
};

export default Copyrigth;

