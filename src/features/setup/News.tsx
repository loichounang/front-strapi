import React from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Grid } from '@mui/material';
import { INews } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { globalConfig } from 'config';

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
          <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontWeight:'bold' }}>{nouveaute.titrePrincipal}</Typography>
          <Typography variant="subtitle2" sx={{ fontFamily: 'Poppins', textAlign:'justify' }}>{nouveaute.titreSecondaire}</Typography>
        </div>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Link href="#" sx={{ fontFamily: 'Poppins', color:'#922790' }}>Lire la suite</Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

const OurServices = () => {
  const { t } = useTranslation();
  const { getNouveautes } = useMainInformation();
  const { data: nouveautes } = useQuery<INews[]>(['News'], () => getNouveautes());

  return (
    <Box bgcolor="#F7F7F7" color="back" py={0.25} px={2} textAlign="center" mt={5}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}> {/* Ajout d'un espacement entre les éléments */}
        {(nouveautes || []).map((nouveaute, idx) => (
          <Grid item xs={12} sm={12} md={6} key={`news_${idx}`}>
            <NewsStack nouveaute={nouveaute} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurServices;
