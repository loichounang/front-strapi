import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../../config/index';
import { Grid, Link, Typography, Box } from '@mui/material';
import { Instagram,Facebook,Twitter } from '@mui/icons-material';

interface LogoData {
  id: number;
  attributes: {
      logo: {
        data: {
          id: number;
          attributes: {
            url: string;
            }
          }
        }
      }
    }

function Logo() {
  const [logos, setLogos] = useState<LogoData[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response: AxiosResponse<{ data: LogoData[] }> = await axios.get(`${defaultConfig.apiUrl}/api/logos?populate=*`);
        setLogos(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogos();
  }, []);

  return (
    <Grid container item xs={12} sm={6} md={4} lg={3} spacing={2}>
      {logos.map((logo, index) => (
        <Grid item key={index}>
          <Box>
            <Link><img width='190px' src={`http://localhost:1337${logo.attributes.logo.data.attributes.url}`} /></Link>
          </Box>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography>
          <Link sx={{ fontFamily: 'Poppins', textDecoration: 'none', color: '#fff', marginRight: '25px' }}><Facebook sx={{ fontSize: '40px' }} /></Link>
          <Link sx={{ fontFamily: 'Poppins', textDecoration: 'none', color: '#fff', fontSize: '30px', marginRight: '25px' }}><Instagram sx={{ fontSize: '40px' }} /></Link>
          <Link sx={{ fontFamily: 'Poppins', textDecoration: 'none', color: '#fff' }}><Twitter sx={{ fontSize: '40px', color: '#AE' }} /></Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Logo;

