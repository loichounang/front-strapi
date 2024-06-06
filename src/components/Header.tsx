import React from 'react';

import Box  from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Logo} from './Logo';
import {MobileLogo} from './MobileLogo';
import ProfileSettings from './ProfileSettings';

import {
  flexBetweenCenter,
  dFlex,
  displayOnDesktop,
  displayOnMobile,
} from 'themes/commonStyles';
import { TopMenu } from './TopMenu';
import { MobileTopMenu } from './MobileTopMenu';


export const Header = () => {
    return (
      <React.Fragment>        
        <AppBar sx={{ background: "primary" }} position="sticky">
          <Toolbar sx={{
            ...flexBetweenCenter,
            minHeight: 90,
            px: 4,
          }}>
            <Box sx={displayOnDesktop}><Logo /></Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}><MobileLogo /></Box>
            <Box sx={displayOnDesktop}><TopMenu /></Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}><MobileTopMenu /></Box>
            <ProfileSettings />
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
