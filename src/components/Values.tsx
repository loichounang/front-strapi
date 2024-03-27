
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../../src/config/index';
import { Container, Typography, Grid,Button } from '@mui/material';
import './values.css';

interface Values {
    id: number;
    attributes: {
        image: {
          data: {
            id: number;
            attributes: {
              url: string;
              }
            }
          }
        }
      }

      export interface ValueData {
        id: number;
        attributes: {
          spa: string;
          titre: string;
          description: string;
          valeur1: string;
          valeur2: string;
          valeur3: string;
          valeur4: string;
          valeur5: string;
          valeur6: string;
          valeur7: string;
        
        };
      }
      
      export interface ValueResponse {
        data: ValueData[];
        meta: {
          pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
          };
        };
      }
      

function Values() {
    const [values, setValues] = useState<Values[]>([]);
    
  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response: AxiosResponse<{ data: Values[] }> = await axios.get(`${defaultConfig.apiUrl}/api/image-values?populate=*`);
        setValues(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchValues();
  }, []);

  const [menuData, setMenuData] = useState<ValueData | null>(null);

  useEffect(() => {
    fetch('http://localhost:1337/api/value-texts')
      .then(response => response.json())
      .then((data: ValueResponse) => {
        if (data.data.length > 0) {
          setMenuData(data.data[0]); // menuData est maintenant un objet AboutData
        }
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);
  
    if (!menuData) {
      return <div>Loading...</div>;
    }
  

  return (
    <div>
        <Container maxWidth="xl" sx={{marginTop:'70px'}}>
      <Typography variant="h6"  align="center" sx={{fontFamily: 'Poppins, sans-serif'}}>{menuData.attributes.spa}</Typography>
        <Typography variant="h2" align="center" sx={{fontFamily: 'Poppins, sans-serif'}} className="brand-name">{menuData.attributes.titre}</Typography>
        <hr style={{width:'200px',margin:'15px auto', height:'5px !important'}}/>
        <Grid container spacing={3} sx={{marginTop:'50px'}}>

      <Grid item xs={12} md={6} sx={{marginTop:'25px'}}>
        <Typography variant="h4" sx={{fontFamily: 'Poppins, sans-serif', fontWeight:'500'}}>{menuData.attributes.description}</Typography>
        <ul>
          <li>{menuData.attributes.valeur1}</li>
          <li>{menuData.attributes.valeur2}</li>
          <li>{menuData.attributes.valeur3}</li>
          <li>{menuData.attributes.valeur4}</li>
          <li>{menuData.attributes.valeur5}</li>
          <li>{menuData.attributes.valeur6}</li>
          <Button
              variant="contained"
              sx={{ backgroundColor: '#EA489E', color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight:'700', height:'60px', borderRadius:'6px', marginTop:'20px', width:'400px' }}
            >
              {menuData.attributes.valeur7}
            </Button>
        </ul>
      </Grid>
        {values.map((value, index) => (
        
        <Grid key={index} item xs={12} md={6}>
         
          <img className='image' src={`http://localhost:1337${value.attributes.image.data.attributes.url}`} />
          </Grid>
      ))}
      </Grid>
      </Container>
    </div>
  )
}

export default Values
