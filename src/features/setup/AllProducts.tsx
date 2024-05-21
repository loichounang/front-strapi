import React, { useState, useEffect } from 'react';
import { Box, Typography,Stack,Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { isFalsy } from 'utility-types';
import { IMainInformation, ISlideImage, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';
import News from './News'; // Assurez-vous de fournir le bon chemin d'importation si nécessaire
import { useTranslation } from 'react-i18next';
import { globalConfig } from 'config';

const AllProducts = () => {
    const { t, i18n } = useTranslation();  // TitreBienvenue
    const [showAllProducts, setShowAllProducts] = useState(false);
    const { getSlideImages } = useMainInformation();
    const {data: slideImages} = useQuery<ISlideImage[]>( ['SlideImage'], () => getSlideImages());
    
    return (
  <Box bgcolor="#F9F9F9" color="back" py={0.25} px={2} textAlign="center" mt={5} sx={{ height: '77%' }}>
  <Grid container justifyContent="space-between" alignItems="center">
    <Grid item xs={12}>
      <Stack flexDirection='column' textAlign="center">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>
            {t('Nos nouveaux produits')}
          </Typography>
          
        </Box>
        <Typography sx={{ marginTop: '10px' }}></Typography>
        <News images={(slideImages || []).map(x => ({ description: x.description, nom: x.nom, prix: x.prix, src: `${globalConfig.get().apiUrl}/download/${x.image_Url}` }))} />
      </Stack>
    </Grid>
   
  </Grid>

</Box>

    );
}

export default AllProducts;
