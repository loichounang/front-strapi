import React, { useEffect, useState } from 'react';
import './speciality.css';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../config/index';
import { Card, CardContent, Typography, Box } from '@mui/material';



interface SpaData {
    id: number;
    attributes: {
      url: string;
    };
  }
  
  interface SpaResponse {
    data: {
      id: number;
      attributes: {
        SpaEthique: string;
        imageSpa: {
          data: SpaData;
        };
      };
    };
  }

// interface onglerie
interface OnglerieData {
    id: number;
    attributes: {
      url: string;
    };
  }
  
  interface OnglerieResponse {
    data: {
      id: number;
      attributes: {
        onglerie: string;
        onglerieImage: {
          data: OnglerieData;
        };
      };
    };
  }

//fin

// interface coiffure
interface CoiffureData {
    id: number;
    attributes: {
      url: string;
    };
  }
  
  interface CoiffureResponse {
    data: {
      id: number;
      attributes: {
        coiffure: string;
        coiffureImage: {
          data: CoiffureData;
        };
      };
    };
  }

//fin


// interface soins
interface SoinsData {
    id: number;
    attributes: {
      url: string;
    };
  }
  
  interface SoinsResponse {
    data: {
      id: number;
      attributes: {
        soinDuVisage: string;
        soinImage: {
          data: SoinsData;
        };
      };
    };
  }

//fin

function Speciality() {

    
    const [spas, setSpas] = useState<SpaResponse | null>(null);

    useEffect(() => {
      const fetchSpa = async () => {
        try {
          const response: AxiosResponse<SpaResponse> = await axios.get(`${defaultConfig.apiUrl}/api/spa-speciality?populate=*`);
          setSpas(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchSpa();
    }, []);
//fin


//useEffect onglerie
const [ongleries, setOnglerie] = useState<OnglerieResponse | null>(null);

useEffect(() => {
  const fetchOnglerie = async () => {
    try {
      const response: AxiosResponse<OnglerieResponse> = await axios.get(`${defaultConfig.apiUrl}/api/onglerie-speciality?populate=*`);
      setOnglerie(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchOnglerie();
}, []);


// fin


//useEffect coiffure

const [coiffures, setCoiffures] = useState<CoiffureResponse | null>(null);

useEffect(() => {
  const fetchCoiffure = async () => {
    try {
      const response: AxiosResponse<CoiffureResponse> = await axios.get(`${defaultConfig.apiUrl}/api/coiffure-speciality?populate=*`);
      setCoiffures(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCoiffure();
}, []);
//fin

//useEffect soin du regard


const [soins, setSoins] = useState<SoinsResponse | null>(null);

useEffect(() => {
  const fetchSoins = async () => {
    try {
      const response: AxiosResponse<SoinsResponse> = await axios.get(`${defaultConfig.apiUrl}/api/soin?populate=*`);
      setSoins(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchSoins();
}, []);
//fin


  return (
    <section >
    <section style={{marginTop:'70px'}}></section>
 <Typography variant="h6"  align="center" sx={{fontFamily: 'Poppins, sans-serif'}}>Un espace beauté</Typography>
   <Typography variant="h2" align="center" sx={{fontFamily: 'Poppins, sans-serif'}} className="brand-name">Nos spécialités</Typography>
   <hr style={{width:'200px',margin:'15px auto', height:'5px !important'}}/>
       <section className="four-cards">
     {/* Première carte */}
     <Card className="card card1 ">
       <CardContent className="card-content">
       {spas && (
              <Box key={spas.data.id}>
                <img className='card-img-top' src={`http://localhost:1337${spas.data.attributes.imageSpa.data.attributes.url}`} />
                <Typography className="text-card" variant="h4" sx={{ fontWeight: "bold", alignItems:'center', fontFamily:'Poppins'}} gutterBottom> {spas.data.attributes.SpaEthique}</Typography>
              </Box>
            )}

       </CardContent>
     </Card>

     {/* Deuxième carte */}
     <Card className="card card2 ">
       <CardContent className="card-content">
       {ongleries && (
              <Box key={ongleries.data.id}>
                <img className='card-img-top' src={`http://localhost:1337${ongleries.data.attributes.onglerieImage.data.attributes.url}`} />
                <Typography className="text-card" variant="h4" sx={{ fontWeight: "bold", alignItems:'center', fontFamily:'Poppins'}} gutterBottom> {ongleries.data.attributes.onglerie}</Typography>
              </Box>
            )}
       </CardContent>
     </Card>

     {/* Troisième carte */}
     <Card className="card card3 ">
       <CardContent className="card-content">
       {coiffures && (
              <Box key={coiffures.data.id}>
                <img className='card-img-top' src={`http://localhost:1337${coiffures.data.attributes.coiffureImage.data.attributes.url}`} />
                <Typography className="text-card" variant="h4" sx={{ fontWeight: "bold", alignItems:'center', fontFamily:'Poppins'}} gutterBottom> {coiffures.data.attributes.coiffure}</Typography>
              </Box>
            )}
       </CardContent>
     </Card>

     {/* Quatrième carte */}
     <Card className="card card4 ">
       <CardContent className="card-content">
       {soins && (
              <Box key={soins.data.id}>
                <img className='card-img-top' src={`http://localhost:1337${soins.data.attributes.soinImage.data.attributes.url}`} />
                <Typography className="text-card" variant="h4" sx={{ fontWeight: "bold", alignItems:'center', fontFamily:'Poppins'}} gutterBottom> {soins.data.attributes.soinDuVisage}</Typography>
              </Box>
            )}
       </CardContent>
     </Card>
     </section>
   </section>

  )
}

export default Speciality
