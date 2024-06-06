import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { typographyBigGroupBoxStyling, typographyGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';
import { IDefResultatSoins, IGaleryResultatSoins, defaultResultatSoins } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { useQuery } from 'react-query';
import { globalConfig } from 'config';
import Testimonials from './setup/Testimonials';
import { isFalsy } from 'utility-types';


const ResultatSoins = () => {
  const { t, i18n } = useTranslation();
  const {getGaleryResultatSoins, getDefResultatSoins  } = useMainInformation();
    const { data: ResultatSoins } = useQuery<IGaleryResultatSoins[]>(['ResultatSoins'], () => getGaleryResultatSoins());
    const [photos, setPhotos] = useState<IGaleryResultatSoins[]>([]);
    const { data: resultats } = useQuery<IDefResultatSoins[]>(['DefResultatSoins'], () => getDefResultatSoins ());
    const [resultat, setResultats] = useState<IDefResultatSoins>(defaultResultatSoins);

    useEffect(() => {
        setPhotos(ResultatSoins || []);
    }, [ResultatSoins]);

    useEffect(() => {
      if (!isFalsy(resultats ) && resultats.length > 0)
        setResultats(resultats[0]);
    }, [resultats ]);

  return (
    <Box>
       <Container maxWidth='xl' sx={{marginTop:'70px' }}>
        <Grid container>
          <Grid item xs={12} md={8}>
          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                <Typography variant="h1" sx={{fontSize:'40px'}} {...typographySmallHandWriting}> 
                  {resultat.titreGlobal}
                </Typography>                
              </Box>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{resultat.titrePrincipal}</Typography>
          <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{resultat.titreSecondaire}</Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        
      </Container>

      
      <Stack flexDirection='column' marginTop='65px'>
                        <Grid container spacing={1}>
                            {photos && photos.map((photo, index) => (
                                <Grid item key={`photo-${index}`} xs={12} md={3} sx={{ width: '100%' }}>
                                    <Box >
                                        <img
                                            src={`${globalConfig.get().apiUrl}/download/${photo.image_Url}`}
                                            alt="..."
                                            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '2%' }}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                    <Typography sx={{marginTop:'30px'}}></Typography>
<Testimonials/>
                    <Typography sx={{marginTop:'50px'}}></Typography>

    </Box>
  )
}

export default ResultatSoins
