import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Grid } from '@mui/material';
import { INews } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { globalConfig } from 'config';
import { useNavigate } from 'react-router-dom'; // Import de useHistory pour la navigation

const NewsStack = ({ nouveaute }: { nouveaute: INews }) => {
  return (
    <Card
      sx={{
        mt: 2, // Ajout d'une marge en haut de chaque carte
        width: '100%',
        display: 'flex',
        borderRadius: '2%',
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url('${globalConfig.get().apiUrl}/download/${nouveaute.image_Url}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '200px',
          borderRadius: '2%', // Ajout de bord arrondi à l'image
        }}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>{nouveaute.titrePrincipal}</Typography>
          <Typography variant="subtitle2" sx={{ fontFamily: 'Poppins', textAlign: 'justify' }}>{nouveaute.titreSecondaire}</Typography>
        </div>
        
      </CardContent>
    </Card>
  );
};

const Service = () => {
  const { t } = useTranslation();
  const { getNouveautes } = useMainInformation();
  const { data: nouveautes } = useQuery<INews[]>(['News'], () => getNouveautes());
  const [showAll, setShowAll] = useState(false); // État local pour suivre si tous les services doivent être affichés
  const navigate = useNavigate(); // Historique pour la navigation

  const handleSeeMore = () => {
    // Naviguer vers la page dédiée lorsque le bouton "Voir plus" est cliqué
    navigate('/services'); // Remplacez '/services' par l'URL de votre page dédiée aux services
  };

  // Limitez le nombre de services à afficher en fonction de l'état local
  const servicesToDisplay = showAll ? nouveautes : (nouveautes || []).slice(0, 4);

  return (
    <Box bgcolor="#F7F7F7" color="back" py={0.25} px={2} textAlign="center" mt={5}>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '500', marginTop:'15px' }}>
            {t('Nos Services')}
          </Typography>
          
        </Box>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        {servicesToDisplay.map((nouveaute, idx) => (
          <Grid item xs={12} sm={12} md={6} key={`news_${idx}`}>
            <NewsStack nouveaute={nouveaute} />
          </Grid>
        ))}
      </Grid>
      {/* Afficher le bouton "Voir plus" uniquement s'il y a plus de 2 services */}
      {nouveautes && nouveautes.length > 2 && (
        <><Button variant="outlined" onClick={handleSeeMore} sx={{ mt: 2, fontFamily: 'Poppins', width: '350px', color:'white', background:'#922790', height:'50px',borderRadius:'8px' }}>
          Voir plus
        </Button><Typography sx={{marginTop:'15px'}}> </Typography></>
      )}
    </Box>
  );
};

export default Service;
