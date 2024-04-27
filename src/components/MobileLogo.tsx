import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// react icons
import { TbFileCertificate } from 'react-icons/tb';

import { flexCenter } from 'themes/commonStyles';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Colors } from 'themes/theme';

export const MobileLogo = () => {

  const navigate = useNavigate();
  
  return (
    <Box sx={flexCenter}>
      <TbFileCertificate size={24} color={Colors.secondary} onClick={() => {navigate(`home`);}} />
      
    </Box>
  );
}
