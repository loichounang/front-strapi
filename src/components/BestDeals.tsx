import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../config/index';
import './bestdeal.css';
import { Card, CardHeader, CardContent, Button, Typography } from '@mui/material'; 


// interface best-deal-image1 && best-deal-text1
interface BestDealImage1 {
    id: number;
    attributes: {
      image: {
        data: {
          id: number;
          attributes: {
            url: string;
          };
        };
      };
    };
  }
  

      export interface BestDeal1Data {
        id: number;
        attributes: {
          nomBbestDeal: string;
          deal1: string;
          deal2: string;
          deal3: string;
        };
      }
      
      export interface BestDeal1Response {
        data: BestDeal1Data[];
        meta: {
          pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
          };
        };
      }

//fin


// interface best-deal-image2 && best-deal-text2
interface BestDealImage2 {
    id: number;
    attributes: {
      image: {
        data: {
          id: number;
          attributes: {
            url: string;
          };
        };
      };
    };
  }
  

      export interface BestDeal2Data {
        id: number;
        attributes: {
          nomBestDeal: string;
          deal1: string;
          deal2: string;
          deal3: string;
        };
      }
      
      export interface BestDeal2Response {
        data: BestDeal2Data[];
        meta: {
          pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
          };
        };
      }

//fin

// interface best-deal-image3 && best-deal-text3
interface BestDealImage3 {
    id: number;
    attributes: {
      image: {
        data: {
          id: number;
          attributes: {
            url: string;
          };
        };
      };
    };
  }
  

      export interface BestDeal3Data {
        id: number;
        attributes: {
          nomBestDeal: string;
          deal1: string;
          deal2: string;
          deal3: string;
        };
      }
      
      export interface BestDeal3Response {
        data: BestDeal3Data[];
        meta: {
          pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
          };
        };
      }

//fin

// interface best-deal-image4 && best-deal-text4
interface BestDealImage4 {
    id: number;
    attributes: {
      image: {
        data: {
          id: number;
          attributes: {
            url: string;
          };
        };
      };
    };
  }
  

      export interface BestDeal4Data {
        id: number;
        attributes: {
          nomBestDeal: string;
          deal1: string;
          deal2: string;
          deal3: string;
        };
      }
      
      export interface BestDeal4Response {
        data: BestDeal4Data[];
        meta: {
          pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
          };
        };
      }

//fin



function BestDeals() {

    const [images1, setImages1] = useState<BestDealImage1[]>([]);
    const [images2, setImages2] = useState<BestDealImage2[]>([]);
    const [images3, setImages3] = useState<BestDealImage3[]>([]);
    const [images4, setImages4] = useState<BestDealImage4[]>([]);
    
    useEffect(() => {
      const fetchData = async (url: string, setData: React.Dispatch<React.SetStateAction<any>>) => {
        try {
          const response = await axios.get(url);
          setData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData(`${defaultConfig.apiUrl}/api/best-deal-image1s?populate=*`, setImages1);
      fetchData(`${defaultConfig.apiUrl}/api/best-deal-image2s?populate=*`, setImages2);
      fetchData(`${defaultConfig.apiUrl}/api/best-deal-image3s?populate=*`, setImages3);
      fetchData(`${defaultConfig.apiUrl}/api/best-deal-image4s?populate=*`, setImages4);
    }, []);
    
   
    // Le reste de votre composant ici
    

const [dealText1, setBestData1] = useState<BestDeal1Data | null>(null);
const [dealText2, setBestData2] = useState<BestDeal2Data | null>(null);
const [dealText3, setBestData3] = useState<BestDeal3Data | null>(null);
const [dealText4, setBestData4] = useState<BestDeal4Data | null>(null);

useEffect(() => {
  const fetchData = async (url: string, setData: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.data.length > 0) {
        setData(data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  fetchData('http://localhost:1337/api/best-deal-text1s', setBestData1);
  fetchData('http://localhost:1337/api/best-deal-text2s', setBestData2);
  fetchData('http://localhost:1337/api/best-deal-text3s', setBestData3);
  fetchData('http://localhost:1337/api/best-deal-text4s', setBestData4);
}, []);

if (!dealText1 || !dealText2 || !dealText3 || !dealText4) {
  return <div>Loading...</div>;
}



  return (
    <section >
      {/* Première carte */}
      <section style={{marginTop:'70px'}}></section>
      <Typography variant="h6"  align="center" style={{fontFamily: 'Poppins, sans-serif'}}>Best Deals</Typography>
        <Typography variant="h2" align="center" style={{fontFamily: 'Poppins, sans-serif'}} className="brand-name">Nos offres d’abonnement mensuel (2 fois par mois)</Typography>
        <hr style={{width:'200px',margin:'15px auto', height:'5px !important'}}/>

      <section className="best-offers">
      <Card className="cards" >
        
      <CardHeader
                avatar={
                    <>
                    {images1.map(image => (
                        <img key={image.id} src={`http://localhost:1337${image.attributes.image.data.attributes.url}`} alt={`Image ${image.id}`} className="card-header-image"/>
                    ))}
                    </>
                }
                
        />
        <CardContent className="card-content">
        <Typography variant="h5" align="center">
        {dealText1.attributes.nomBbestDeal}
          </Typography>

          <ul>
            {/* Contenu de la liste des services */}
          <li>{dealText1.attributes.deal1}</li>
          <li>{dealText1.attributes.deal2}</li>
          <li>{dealText1.attributes.deal3}</li>
          
          </ul>
        </CardContent>
        <Button className="button" sx={{marginBottom:'40px'}}>Prendre RDV</Button> {/* Bouton à la fin de la première carte */}
      </Card>

      {/* Deuxième carte */}
      <Card className="cards">
        <CardHeader
        avatar={
                    <>
                    {images2.map(image2 => (
                        <img key={image2.id} src={`http://localhost:1337${image2.attributes.image.data.attributes.url}`} alt={`Image ${image2.id}`} className="card-header-image"/>
                    ))}
                    </>
                }
        />
        <CardContent className="card-content">
          <Typography variant="h5" align="center">
          {dealText2.attributes.nomBestDeal}
          </Typography>
          <ul>
            {/* Contenu de la liste des services */}
            <li> {dealText2.attributes.deal1}</li>
            <li> {dealText2.attributes.deal2}</li>
            <li> {dealText2.attributes.deal3}</li>
          </ul>
        </CardContent>
        <Button className="button" style={{marginBottom:'40px'}}>Prendre RDV</Button> {/* Bouton à la fin de la deuxième carte */}
      </Card>

      {/* Troisième carte */}
      <Card className="cards">
        <CardHeader
         
         avatar={
            <>
            {images3.map(image3 => (
                <img key={image3.id} src={`http://localhost:1337${image3.attributes.image.data.attributes.url}`} alt={`Image ${image3.id}`} className="card-header-image"/>
            ))}
            </>
        }
        />
        <CardContent className="card-content">
          <Typography variant="h5" align="center">
          {dealText3.attributes.nomBestDeal}
          </Typography>
          <ul>
            {/* Contenu de la liste des services */}
            <li> {dealText3.attributes.deal1}</li>
            <li> {dealText3.attributes.deal2}</li>
            <li> {dealText3.attributes.deal3}</li>
         
          </ul>
        </CardContent>
        <Button className="button" style={{marginBottom:'40px'}}>Prendre RDV</Button> {/* Bouton à la fin de la troisième carte */}
      </Card>

      {/* Quatrième carte */}
      <Card className="cards">
        <CardHeader
          avatar={
            <>
            {images4.map(image4 => (
                <img key={image4.id} src={`http://localhost:1337${image4.attributes.image.data.attributes.url}`} alt={`Image ${image4.id}`} className="card-header-image"/>
            ))}
            </>
        }
        />
        <CardContent className="card-content">
          <Typography variant="h5" align="center">
          {dealText4.attributes.nomBestDeal}
          </Typography>
          <ul>
            {/* Contenu de la liste des services */}
            <li> {dealText4.attributes.deal1}</li>
            <li> {dealText4.attributes.deal2}</li>
            <li> {dealText4.attributes.deal3}</li>
         
          </ul>
        </CardContent>
        <Button className="button"  style={{marginBottom:'40px'}}>Prendre RDV</Button> {/* Bouton à la fin de la quatrième carte */}
        
      </Card>
      </section>
    </section>
  )
}

export default BestDeals
