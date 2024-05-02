import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Grid, Typography, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { globalConfig } from 'config';
import { IGaleryPhoto } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import Reservation from './setup/Reservation';
import { typographyBigGroupBoxStyling,typographySmallHandWriting } from 'themes/commonStyles';

const GalerySpa = () => {
    const { t } = useTranslation();
    const { getGaleryPhotos } = useMainInformation();
    const { data: galeryPhotos } = useQuery<IGaleryPhoto[]>(['GaleryPhoto'], () => getGaleryPhotos());
    const [photos, setPhotos] = useState<IGaleryPhoto[]>([]);

    useEffect(() => {
        setPhotos(galeryPhotos || []);
    }, [galeryPhotos]);

    return (
        <Container maxWidth='xl'>
            <Grid container>
                <Grid item xs={12} md={8}>
                    
                        <Box sx={{ mt: 0.25, width: '100%' }}>
                            <Typography component="h2" sx={{fontSize:'40px'}} {...typographySmallHandWriting} id="tableTitle" color="black" noWrap>
                                {t('Le SPA en image')}
                            </Typography>

                            <Typography variant='h6' sx={{fontFamily:'Poppins', color:'black', textAlign:'justify'}}>
                                {t("Découvrez des photos de luxueux centres de bien-être, des jacuzzis à l’extérieur, des saunas et des salles de soins élégantes. Laissez-vous inspirer par les images de thérapeutes expérimentés prodiguant des soins de la tête aux pieds, de la réflexologie aux massages profonds, dans des environnements calmes et apaisants.")}
                            </Typography>
                        </Box>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>

            <Stack flexDirection='column' marginTop='65px'>
                        <Grid container spacing={1}>
                            {photos && photos.map((photo, index) => (
                                <Grid item key={`photo-${index}`} xs={12} md={3} sx={{ width: '100%' }}>
                                    <Box >
                                        <img
                                            src={`${globalConfig.get().apiUrl}/download/${photo.image_Url}`}
                                            alt="..."
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2%' }}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
             
            <Reservation />
        </Container>
    );
}

export default GalerySpa;
