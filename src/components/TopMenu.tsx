import React, {useState,useEffect, MouseEvent} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation  } from 'react-i18next';

import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Typography, useTheme } from '@mui/material';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { IMenuItem } from './models/Menu';
import useMenu from 'components/services/Menu';
import { ListItemIcon } from '@mui/material';
import { isFalsy } from 'utility-types';

import { IoSearchCircleSharp } from 'react-icons/io5';

import {currentUserSessionAtom, currentUserSessionSetAuthentication, colorsAtom} from 'library/store';
import { useRecoilState, useRecoilValue } from 'recoil';
import  {iconFromName} from './ui/DynamicIcon';



export const TopMenu = () => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 

  const theme = useTheme();

  const {applicationMenus : menus, setApplicationMenus: setMenus} = useMenu();

  const [Colors, setColors] = useRecoilState(colorsAtom);
  const currentUserSession = useRecoilValue(currentUserSessionAtom);

  const [menuClickCount, setMenuClickCount] = useState<number>(-1);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const menuClick = (event: MouseEvent<HTMLButtonElement>, name: string) : void => {    
    event.preventDefault();
    
    const arr = [...menus];
    const menu = arr.find( m => m.name === name ); 
    if(! menu) return;

    menu.isOpen = !menu.isOpen;
    setMenus([...arr]);
    // setMenuClickCount(menuClickCount - 1);
    // const eltId = (event.target as HTMLButtonElement).id;
    
    // const url = eltId.replace('btn','');
    
    // navigate(`${url}/${menuClickCount}`);    
  }

  

  const closeMenu = (name: string) : void => {
    
    const arr = [...menus];
    const menu = arr.find( m => m.name === name );  
    if(! menu) return;

    setMenuClickCount(menuClickCount - 1);
    menu.isOpen = false;
    setMenus([...arr]);
  }

  const menuItemClick = (event: MouseEvent<HTMLButtonElement>, name: string, routeToGo: string) : void => {
    event.preventDefault();

    closeMenu(name);
    navigate(`${routeToGo}/${menuClickCount}`);
  }

  const clickAway = (event: MouseEvent<HTMLButtonElement>, name: string) : void => {
    event.preventDefault();

    closeMenu(name);
  }

  const menuItemDisabled = (entityName: string): boolean =>  {
    //return false;
    
    return !currentUserSession.roleEntities.some(re => re.entityName === entityName);
}

const menuDisabled = (menuItems: IMenuItem[]): boolean =>  {
  return false;
  //return !menuItems.some(itm => currentUserSession.roleEntities.some(re => re.entityName === itm.entityName));    
}

useEffect( () => {
  
  
},[t, i18n]);

  return (
    
      <Stack
        sx={{          
          pl: 2,          
        }}        
        // divider={<Divider orientation="vertical" flexItem />}
      >
        {menus.map(({name,text,anchorRef, isOpen ,menuItems},idx) => {
          
          return (
            <React.Fragment key={`menu-${idx}-${name}`}>
              <Button key={`button-${idx}-${name}`} ref={anchorRef} color="inherit"
                onClick={(event: any) => menuClick(event,name)} id={name} disabled={menuDisabled(menuItems)}>
                <Typography
                  sx={{
                    color: theme.palette.getContrastText(Colors.primary), // (theme) => theme.palette.text.primary,
                    fontWeight: 'bold',
                    paddingLeft: '16px'
                  }}
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {text}
                </Typography>
              </Button>
                <Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition style={{ zIndex: 2000 }}>
                {({ TransitionProps, placement }) => (
                  <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper >
                        <ClickAwayListener onClickAway={(event: any) => clickAway(event,name,)}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" >  
                                {                                    
                                    menuItems.map(
                                    ({routeToGo,text,group,entityName, iconName},index,array) => {

                                      const icon = iconName || 'ai/AiOutlineArrowRight';
                                      //const x = MaterialDesign["MdPll"];
                                      
                                       return(
                                        <div id={index.toString()} key={idx*100+index}>
                                            {(index>0 && array[index-1].group !== group) && <Divider />}
                                            <MenuItem component={Link} 
                                              to={`${routeToGo}/${menuClickCount}`} key={index} 
                                              onClick={(event: any) => menuItemClick(event,name,routeToGo)}
                                              disabled={menuItemDisabled(entityName)}
                                            >
                                              <ListItemIcon color="primary">
                                                {iconFromName(icon, Colors.menuIcon)}
                                                {/* <DynamicIcon icon={icon} size="1em" color="primary.main"  /> */}
                                              </ListItemIcon> 
                                                <Typography
                                                  sx={{
                                                    //color: 'white',  (theme) => theme.palette.text.primary,
                                                    fontWeight: 'bold'
                                                  }}
                                                  >
                                                  {text}
                                                </Typography>
                                            </MenuItem>                                            
                                        </div>
                                    ) }
                                )}                                 
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </React.Fragment>
            
            
          );
        })}
      </Stack>
    
  )
}
