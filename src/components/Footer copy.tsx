import React, {useState,useRef} from 'react';

import { useTranslation  } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import {  useRecoilValue, useRecoilState } from 'recoil';

import {Language as LanguageIcon, TranslateOutlined as TranslateOutlinedIcon,  } from '@mui/icons-material';

import { BsGlobe } from 'react-icons/bs';
import { IoChevronUpOutline } from 'react-icons/io5';
import { FaFileExport } from 'react-icons/fa';
import { TbLayoutDashboard } from 'react-icons/tb';

import { Link } from 'react-router-dom';

import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import Popper from '@mui/material/Popper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ClickAwayListener from '@mui/material/ClickAwayListener';

import { flexBetweenCenter, fullWidthFlex, justifyCenter } from 'themes/commonStyles';

import { isExportBoxShowAtom, isDesktopPublishingBoxShowAtom ,currentUserSessionAtom } from 'library/store';

export const Footer = () => {

  const anchorRefLanguageButton = useRef(null);
  const [openLanguageMenu, setOpenLanguageMenu] = useState(false);

  const [isExportBoxShow, setIsExportBoxShow] = useRecoilState(isExportBoxShowAtom); 
  const [isDesktopPublishingBoxShow, setIsDesktopPublishingBoxShow] = useRecoilState(isDesktopPublishingBoxShowAtom); 

  const [currentUserSession, setCurrentUserSession] = useRecoilState(currentUserSessionAtom);

  const { t, i18n } = useTranslation(); 

  const footerLinks : {id: number, text: string, url: string}[] = [
    // { id: 1, text: t('Privacy policy'), url: '#' },
    // { id: 2, text: t('Terms of use'), url: '#' },
   ];

  const menuLanguageItemClick = (lg: string) => (event: any) =>{
    i18n.changeLanguage(lg);
    setOpenLanguageMenu(false);    
    setCurrentUserSession({...currentUserSession, language: lg});
  }

  const onClickLanguageMenu = () => {
    setOpenLanguageMenu(true);  
  };

  const closeLanguageMenu = () => {
    setOpenLanguageMenu(false);
  };

  return (
    <Box
      sx={{
        ...fullWidthFlex,
        borderTop: '1px solid #ddd',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            ...flexBetweenCenter,
            width: '100%',
          }}
        >
          <Stack>
            <Paper>
              <Link to={'http://www.skysoft.cm'}> 2022-2024 Copyright </Link> 
            </Paper>
            {footerLinks.map((link) => {
              return (
                <Paper key={link.id} sx={ {paddingLeft: '16px'} }>
                  <Link to={link.url}> {link.text}</Link>
                </Paper>
              );
            })}
          </Stack>

          <Stack>
            <Paper sx={justifyCenter}>
              <Button ref={anchorRefLanguageButton} onClick={onClickLanguageMenu}>
                <Box sx={{ ...justifyCenter, mr: 1 }}>
                  <BsGlobe size={24} />
                </Box>                
              </Button>
              <Popper open={openLanguageMenu} anchorEl={anchorRefLanguageButton.current} role={undefined} transition >
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={closeLanguageMenu}>
                      <MenuList dense={true} id="menu-list-grow">  
                      {(i18n.language !== 'fr') && 
                        <MenuItem onClick={menuLanguageItemClick("fr")}>
                          <ListItemIcon>
                            <TranslateOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Francais" />                              
                        </MenuItem> }
                        {(i18n.language !== 'en') && 
                        <MenuItem onClick={menuLanguageItemClick("en")}>
                          <ListItemIcon>
                            <TranslateOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="English" />
                      </MenuItem> }                         
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
                )}
              </Popper> 
              { currentUserSession.isExtractAndExportAllowed && <Button onClick={ () => {setIsDesktopPublishingBoxShow(true);} }>                 
                <Box sx={{ ...justifyCenter, ml: 1 }}>
                  <TbLayoutDashboard size={24} />
                </Box>
                {t('Desktop publishing')}
              </Button>}
              { currentUserSession.isExtractAndExportAllowed && <Button onClick={ () => {setIsExportBoxShow(true);} }>                 
                <Box sx={{ ...justifyCenter, ml: 1 }}>
                  <FaFileExport size={24} />
                </Box>
                {t('Export')}
              </Button>}
              <Button>                
                <Box sx={{ ...justifyCenter, ml: 1, alignItems: 'center', }}>
                  <IoChevronUpOutline size={24} />
                </Box>
                {t('Support and Resources')}
              </Button>
            </Paper>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
