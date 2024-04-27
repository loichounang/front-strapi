import React from 'react';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
// react icons
import { TbBrandMessenger, TbBrandWhatsapp } from 'react-icons/tb';
import { AiOutlineMessage } from 'react-icons/ai';

import { flexCenter } from 'themes/commonStyles';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { colorsAtom,currentUserSessionAtom } from 'library/store';
import { useRecoilState, useRecoilValue } from 'recoil';

export const Logo = () => {

  const navigate = useNavigate();

  const theme = useTheme();

  const [Colors, setColors] = useRecoilState(colorsAtom);
  //const { applicationSetup} = useRecoilValue(currentUserSessionAtom);
  
  return (
    <Box sx={flexCenter}>
      <AiOutlineMessage size={24} color={theme.palette.getContrastText(Colors.primary)} />
      <Button key="key-logo-button" sx={{pl:0}}>
        <Typography onClick={() => {navigate(`home`);}}
          sx={{
            ml: 1,
            //color: (theme) => theme.palette.secondary.main,
            color: theme.palette.getContrastText(Colors.primary),
            fontSize: '20px',
            fontWeight: 'bold',
          }}
          component="h3"
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          Skrapi - 
        </Typography>
      </Button>
    </Box>
  );
};

