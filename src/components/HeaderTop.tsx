import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, InputBase, MenuItem, Select, useMediaQuery, Theme } from '@mui/material';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { isFalsy } from 'utility-types';
import { globalConfig } from 'config';
import { IMainInformation, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import { Link } from 'react-router-dom';

export const HeaderTop = () => {
  const { t, i18n } = useTranslation();
  const { getMainInformations } = useMainInformation();
  const { data: mainInformations } = useQuery<IMainInformation[]>(['MainInformation'], () => getMainInformations());
  const [selectedCountry, setSelectedCountry] = useState('');
  const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);

  useEffect(() => {
    if (!isFalsy(mainInformations) && mainInformations?.length > 0) {
      setMainInformation(mainInformations[0]);
    }
  }, [mainInformations]);

  const handleCountryChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedCountry(event.target.value);
  };

  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
<Grid container justifyContent="space-between" alignItems="center" sx={{ flexDirection: 'row', backgroundColor:'#fff', padding: '10px' }}>
  {/* Logo */}
  <Grid item xs={3} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
    <Link to="/">
      <img src={`${globalConfig.get().apiUrl}/download/${mainInformation.logo_Url}`} alt="Logo" style={{ width: isSmallScreen ? '100px' : '130px', height: '75px', marginTop: '5px', borderRadius:'100%' }} />
    </Link>
  </Grid>

  {/* Barre de recherche */}
  <Grid item xs={6} sm={4} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
    <InputBase placeholder="Recherche..." fullWidth sx={{ borderRadius: 2, border: '3px solid #f9f9f9', fontWeight: 'bold', marginTop: '10px', marginRight:'-23px',  background:'#f9f9f9' }} endAdornment={
      <IconButton>
        <SearchIcon sx={{ color: '#922790', fontWeight: 'bold' }} />
      </IconButton>
    } />
  </Grid>

  {/* Sélecteur de pays */}
  <Grid item xs={3} sm={2} sx={{ display: isSmallScreen ? 'none' : 'flex', justifyContent: 'center', marginBottom: '10px' }}>
    <Select value={selectedCountry} onChange={handleCountryChange} fullWidth sx={{ border: '1px solid #ccc', height: '35px', width: '120px', marginTop: '9px', marginRight: '-25px' }}>
      <MenuItem value="EN">EN</MenuItem>
      <MenuItem value="FR">FR</MenuItem>
      <MenuItem value="ES">ES</MenuItem>
    </Select>
  </Grid>

  {/* Icônes "Nouveau Client" et "Se connecter" */}
  <Grid item xs={3} sm={3} sx={{ display: 'flex', justifyContent: isSmallScreen ? 'center' : 'flex-end', alignItems: 'center', marginBottom: '10px' }}>
    {/* Icônes "Nouveau Client" et "Se connecter" sur petit écran */}
    {isSmallScreen ? (
      <>
        <IconButton color="inherit" sx={{ color: '#922790', marginRight: '2px', marginTop: '7px' }}>
          <PersonAddIcon />
        </IconButton>
        <IconButton color="inherit" sx={{ color: '#922790', marginTop: '7px' }}>
          <PersonIcon />
        </IconButton>
      </>
    ) : (
   
      <>
      <IconButton color="inherit" sx={{ color: '#000', marginRight: '15px', marginTop: '7px' }}>
        <PersonAddIcon />
      </IconButton>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#000', marginRight: '15px', marginTop: '7px' }}>
        Nouveau Client
      </Typography>
      <IconButton color="inherit" sx={{ color: '#000', marginLeft: '15px', marginTop: '7px' }}>
        <PersonIcon />
      </IconButton>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#000', marginRight: '15px', marginTop: '7px' }}>
        Se connecter
      </Typography>
    </>
    )}
  </Grid>
</Grid>





  );
}
