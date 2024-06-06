import React, { useEffect, useState } from 'react';

import Box  from '@mui/material/Box';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { isFalsy } from 'utility-types';
import { useQuery } from 'react-query';
import { Grid, IconButton } from '@mui/material';

import {
  flexBetweenCenter,
  dFlex,
  displayOnDesktop,
  displayOnMobile,
} from 'themes/commonStyles';

import { IMainInformation, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';


export const HeaderTop = () => {

    const { t, i18n } = useTranslation();  

  const { getMainInformations } = useMainInformation();

  const {data: mainInformations} = useQuery<IMainInformation[]>( ['MainInformation'], () => getMainInformations());

const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
  useEffect(() => {
    
      if(!isFalsy(mainInformations) && mainInformations?.length>0)
        setMainInformation(mainInformations[0]);
    }, [mainInformations]);

    return (
    <Box color="primary.contrastText" py={0.25} px={2} textAlign="center" 
    sx={{backgroundImage: 'linear-gradient(to right, #371F07, #DBA82F)'}}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1" component="span" sx={{fontFamily:'Poppins', color:'#fff'}}>
              <IconButton color="inherit">
                <PhoneIcon />
              </IconButton>
              {mainInformation.portable1}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span" sx={{fontFamily:'Poppins', color:'#fff'}}>
              <IconButton color="inherit">
                <EmailIcon />
              </IconButton>
              {mainInformation.email1}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span" sx={{fontFamily:'Poppins',color:'#fff'}}>
              {mainInformation.horaire1}
            </Typography>
          </Grid>
        </Grid>
    </Box>
    );
  }
