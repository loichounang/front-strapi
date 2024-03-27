import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../../src/config/index';
import { Container, Grid, Typography, Button } from '@mui/material';
import './reservation.css'; // Import du fichier CSS contenant les styles



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
          noms: string;
          titre: string;
          description1: string;
          description2: string;
          description3: string;
          description4: string;
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
      
  

const Reservation: React.FC = () => {
    const [reservations, setReservation] = useState<Values[]>([]);
    
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response: AxiosResponse<{ data: Values[] }> = await axios.get(`${defaultConfig.apiUrl}/api/image-reservations?populate=*`);
        setReservation(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservation();
  }, []);

  const [menuData, setMenuData] = useState<ValueData | null>(null);

  useEffect(() => {
    fetch('http://localhost:1337/api/text-reservations')
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
 
      <Container maxWidth="xl" style={{marginTop:'70px'}}>
      <Typography variant="h6"  align="center" style={{fontFamily: 'Poppins, sans-serif'}}>{menuData.attributes.noms}</Typography>
        <Typography variant="h2" align="center" style={{fontFamily: 'Poppins, sans-serif'}} className="brand-name">{menuData.attributes.titre}</Typography>
        <hr style={{width:'200px',margin:'15px auto', height:'5px !important'}}/>
    <Grid container spacing={3} style={{marginTop:'50px'}}>
      <Grid item xs={12} md={5} style={{marginTop:'25px'}}>
        <Typography variant="h4" style={{fontFamily: 'Poppins, sans-serif', fontWeight:'500'}}>{menuData.attributes.description1}</Typography>
        
        <Typography variant="h5" align="justify" style={{fontFamily: 'Poppins, sans-serif', fontWeight:'500', marginTop:'40px'}}>{menuData.attributes.description2}</Typography>
        <Typography variant="h5" align="justify" style={{fontFamily: 'Poppins, sans-serif', fontWeight:'500', marginTop:'40px'}}>{menuData.attributes.description3}</Typography>

        <ul>
          <Button
              variant="contained"
               sx={{ backgroundColor: '#EA489E', color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight:'700', height:'60px', borderRadius:'6px', marginTop:'20px', width:'400px' }}
            >
              {menuData.attributes.description4}
            </Button>
        </ul>
      </Grid>
      
      {reservations.map((reservation, index) => (
        
        <Grid key={index} item xs={12} md={6}>
         
          <img className='image-reservation' src={`http://localhost:1337${reservation.attributes.image.data.attributes.url}`} />
          </Grid>
      ))}
      
    </Grid>
  
    </Container>
      );
    };
    
    export default Reservation;