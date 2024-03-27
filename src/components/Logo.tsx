import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { defaultConfig } from '../../src/config/index';

interface Logo {
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

function App() {
  const [logos, setLogos] = useState<Logo[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response: AxiosResponse<{ data: Logo[] }> = await axios.get(`${defaultConfig.apiUrl}/api/logos?populate=*`);
        setLogos(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div>
     
   
   
      {logos.map((logo, index) => (
        <div key={index}>
        
         
          <img width='190px' src={`http://localhost:1337${logo.attributes.logo.data.attributes.url}`} />
        </div>
      ))}
    </div>
  );
}

export default App;

