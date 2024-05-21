import { Grid, Typography, TextField, Button, Container, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "../setup/services/MainInformation";
import {IDefService, defaultServiceDefinition } from '../setup/models/MainInformation';
import { isFalsy } from 'utility-types';
import { globalConfig } from 'config';

const QuotationForm: React.FC = () => {
    const {  getDefService } = useMainInformation();
    const { data: DefServiceInformations } = useQuery<IDefService[]>(['DefService'], () => getDefService ());
    const [serviceInformation, setServiceInformation] = useState<IDefService>(defaultServiceDefinition );
  
    useEffect(() => {
      if (!isFalsy(DefServiceInformations ) && DefServiceInformations .length > 0)
        setServiceInformation(DefServiceInformations [0]);
    }, [DefServiceInformations ]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (

<Box p={2} sx={{ marginTop: '30px' }}>
<Typography variant='h3' sx={{fontFamily:'Poppins'}}>{serviceInformation.titreGlobal}</Typography>
 <Grid container spacing={2} marginTop='10px'>
<Grid item md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img
      src={`${globalConfig.get().apiUrl}/download/${serviceInformation.image_Url}`}
      style={{ width: '100%', maxHeight: '550px', objectFit: 'fill' }}
      alt='Profil'
    />
  </Grid>
</Grid>
<Typography sx={{ marginTop:'50px'}}></Typography>

                {/* Container pour le formulaire */}
                <Typography variant="h4" sx={{ fontFamily:'Poppins'}}>Formulaire de Dévis</Typography>

<Typography sx={{ marginTop:'50px'}}></Typography>
                
            <Grid >
                <Grid item xs={12}>
                    <Container maxWidth="xl">
                    
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={6}>
                                    <TextField label="Full Name" variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField label="Email" type="email" variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField label="Phone Number" type="tel" variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField label="Whatsapp" type="tel" variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Message" multiline rows={4} variant="outlined" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        accept=".pdf,.doc,.docx"
                                        style={{ display: 'none' }}
                                        id="file-upload"
                                        type="file"
                                    />
                                    <label htmlFor="file-upload">
                                        <Button variant="outlined" component="span">
                                            Téléchager votre dévis
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid item xs={12} >
                                    <Button type="submit" variant="contained" color="primary" sx={{ fontFamily: 'Poppins' }}>
                                        Envoyer votre devis
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
}

export default QuotationForm;
