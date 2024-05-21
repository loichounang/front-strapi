import { Box, Typography, Link, Container, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useMainInformation from "../features/setup/services/MainInformation";
import { isFalsy } from 'utility-types';
import { globalConfig } from 'config';
import { IArrierePlan, defaultArrierePlan, IPoseGel, defaultPoseGelPage } from '../features/setup/models/MainInformation';
import { useTranslation } from 'react-i18next'; // Importe useTranslation pour utiliser la traduction
import Reservation from 'features/setup/QuotationForm';


const PoseGel : React.FC = () =>{
  const [textWithDots, setTextWithDots] = useState<string>('');

  const generateTextWithDots = (text: string, dots: string) => {
    const containerWidth = 700; // Largeur du conteneur, ajustez selon vos besoins
    const fontSize = 16; // Taille de la police en pixels, ajustez selon vos besoins
  
    const textWidth = text.length * (fontSize * 0.6); // Largeur approximative du texte en fonction de la police utilisée
    const dotsWidth = dots.length * (fontSize * 0.6); // Largeur approximative des points de suspension en fonction de la police utilisée
  
    const remainingWidth = containerWidth - textWidth; // Calcul de l'espace restant pour les points de suspension
  
    if (remainingWidth > dotsWidth) {
        const numberOfDots = Math.floor((remainingWidth - dotsWidth) / (fontSize * 0.6)); // Calcul du nombre de points de suspension à ajouter pour remplir l'espace restant
        return text + dots.repeat(numberOfDots); // Concaténation du texte et des points de suspension
    } else {
        return text;
    }
};

  

    const { t, i18n } = useTranslation(); 
    const { getArrierePlan, getPoseGelPage } = useMainInformation();
    const { data: mainInformations } = useQuery<IArrierePlan[]>(['ArrierePlan'], () => getArrierePlan());
    const [main, setMainInformation] = useState<IArrierePlan>(defaultArrierePlan);

    const { data: PoseGelInformations } = useQuery<IPoseGel[]>(['PoseGel'], () => getPoseGelPage ());
    const [poseGel, setPoseGelInformations] = useState<IPoseGel>(defaultPoseGelPage);

    useEffect(() => {
        if (!isFalsy(PoseGelInformations) && PoseGelInformations.length > 0)
            setPoseGelInformations(PoseGelInformations[0]);
      }, [PoseGelInformations]);
    
      useEffect(() => {
        if (!isFalsy(mainInformations) && mainInformations.length > 0)
          setMainInformation(mainInformations[0]);
      }, [mainInformations]);

      useEffect(() => {
        if (poseGel) {
            setTextWithDots(generateTextWithDots(poseGel.poseGel8, '...'));
        }
    }, [poseGel]);
    

  return (
    <div>
      <Box sx={{  position: 'relative', width: '100%', height: '100%' }}>
        <img src={`${globalConfig.get().apiUrl}/download/${main.arrierePlan_Url}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt='Logo' />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '100%', zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
            {poseGel.titrePrincipal}
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>
            <Link href="/" sx={{  color: '#fff' }}>Home</Link> |  <Link href="/" sx={{  color: '#fff' }}>Services</Link>     | {poseGel.titre}
          </Typography>
        </Box>
      </Box>

      <Container maxWidth='xl' sx={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
  <Grid container spacing={2}>

   {/* Grid pour le texte */}
   <Grid item xs={12} md={3}>
  <List>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Soin capillaire')}
        sx={{ fontFamily: 'Poppins !important'}}
      />
    </ListItem>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Coiffure femme')}
        sx={{ fontFamily: 'Poppins' }}
      />
    </ListItem>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Tresses')}
        sx={{ fontFamily: 'Poppins' }}
      />
    </ListItem>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Coiffure homme')}
        sx={{ fontFamily: 'Poppins' }}
      />
    </ListItem>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Massage')}
        sx={{ fontFamily: 'Poppins', '&:hover':'#FF0088' }}
      />
    </ListItem>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Physiotherapy')}
        sx={{ fontFamily: 'Poppins' }}
      />
    </ListItem>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Soin de corps')}
        sx={{ fontFamily: 'Poppins' }}
      />
    </ListItem>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Soin de visage')}
        sx={{ fontFamily: 'Poppins' }}
      />
    </ListItem>
    <ListItem
      sx={{
        background: '#F8F8F8',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        '&:hover': {
            backgroundColor: '#FF0088',
            color: '#FFF',
          },
      }}
    >
      <ListItemText
        primary={t('Epilation')}
        sx={{ fontFamily: 'Poppins' }}
      />
    </ListItem>
    {/* Ajoutez d'autres éléments de la liste de la même manière */}
  </List>
</Grid>


    {/* Grid pour l'image */}
    <Grid item xs={12} md={9}>
      <img src={`${globalConfig.get().apiUrl}/download/${poseGel.imagePoseGel_Url}`} style={{ width: '100%', maxHeight: '470px', objectFit: 'cover', borderRadius:'15px' }} alt='Logo' />
    </Grid>
   
  </Grid>
</Container>

<Container maxWidth='xl' sx={{ marginTop: '40px' }}>
  <Grid container spacing={1}>
      <Grid item xs={12} md={4} textAlign='center'>
      <Typography variant='h5' sx={{fontFamily:'Poppins', fontWeight:'600'}}>{poseGel.titreSecondaire}</Typography>
      <Typography variant='h6' sx={{fontFamily:'Poppins'}}>{t('Nous sommes à votre disposition')} </Typography>

      <br/>
      <Button sx={{fontFamily:'Poppins', background: '#FF0088', color:'#fff', height:'45px', width:'42%', marginTop:'2px', borderRadius:'30px'}}>{t('CONTACTEZ-NOUS')}</Button>
      </Grid>
      <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'justify' }}>
  <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>{poseGel.titre}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{poseGel.poseGel1}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{poseGel.poseGel2}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{poseGel.poseGel3}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{poseGel.poseGel4}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{poseGel.poseGel5}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{poseGel.poseGel6}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{poseGel.poseGel7}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{textWithDots}</Typography>
  <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>{poseGel.poseGel9}</Typography>
</Grid>



</Grid>
</Container>

<Reservation/>

    </div>
  )
}

export default PoseGel
