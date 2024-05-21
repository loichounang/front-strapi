// Services.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { INews } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { globalConfig } from 'config';
import { Link } from 'react-router-dom';

const NewsStack = ({ nouveaute }: { nouveaute: INews }) => {
 
    return (
        <Card
            sx={{
                mt: 2,
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
                    borderRadius: '2%',
                }}
            />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>{nouveaute.titrePrincipal}</Typography>
                    <Typography variant="subtitle2" sx={{ fontFamily: 'Poppins', textAlign: 'justify' }}>{nouveaute.titreSecondaire}</Typography>
                </div>
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Link to={`/service/${nouveaute.id}`} style={{ fontFamily: 'Poppins', color: '#922790' }}>
                        Faire un dévis
                    </Link>
                </Stack>
            </CardContent>
        </Card>
    );
};

const Services = () => {
    const { t } = useTranslation();
    const { getNouveautes } = useMainInformation();
    const { data: nouveautes } = useQuery<INews[]>(['News'], () => getNouveautes());

    return (
        <Box bgcolor="#F9F9F9" color="back" py={0.25} px={2} textAlign="center" mt={5}>
            <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '500', marginTop:'15px' }}>
                    {t('Nos Services')}
                  </Typography>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                {(nouveautes || []).map((nouveaute, idx) => (
                    <Grid item xs={12} sm={12} md={6} key={`news_${idx}`}>
                        <NewsStack nouveaute={nouveaute} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Services;
