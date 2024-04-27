import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// react icons
import { BsGlobe } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { flexCenter } from 'themes/commonStyles';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import { currentUserSessionAtom, currentUserSessionSetAuthentication } from 'library/store';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';



const ProfileSettings = () => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [currentUserSession, setCurrentUserSession] = useRecoilState(currentUserSessionAtom);
  const { userDescription } = currentUserSession;
  const disconnectUser = useSetRecoilState(currentUserSessionSetAuthentication);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  
  const handleClick = (event : any) => {    
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const menuItemClickDisconnect = (event : any) => {
    disconnectUser(currentUserSession); 
    navigate('/');        
    }

  const menuItemClickPasswordChange = (event: any) => {
    navigate('/passwordChange');  
  }


  return (
    <Box sx={ {...flexCenter, mr: 3}} >
      <Typography
          sx={{
            color: 'white', // (theme) => theme.palette.text.primary,
            fontWeight: 'bold', paddingLeft: '16px',
            display: { xs: 'none', md: 'block' } 
          }} >
          {userDescription}
      </Typography>
      
      <Stack>
        <Button onClick={handleClick}>
          <BiUserCircle size={24} color='white' />
        </Button>   
        <Menu anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        <MenuItem onClick={menuItemClickPasswordChange}>
          <ListItemIcon color="primary">
            <ManageAccountsIcon fontSize="small" color="primary" />
          </ListItemIcon>
          {t('Change Password')}
        </MenuItem>
        <Divider />        
        
        <MenuItem onClick={menuItemClickDisconnect}>
          <ListItemIcon color="primary">
            <LogoutIcon fontSize="small" color="primary"/>
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>       
      </Stack> 
    </Box>
  );
};

export default ProfileSettings;