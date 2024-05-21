
import React, {FC, useState,useEffect ,MouseEvent}  from 'react';

import { useSnackbar } from 'notistack';
import { useTranslation  } from 'react-i18next';


import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { pink, grey } from '@mui/material/colors';
import Box from '@mui/material/Box';

import { IoSearchCircleSharp, IoSaveSharp } from 'react-icons/io5';

import {FaPrint, FaSave , FaSearch, FaFile, FaFileCode} from 'react-icons/fa';
import {VscNewFile} from 'react-icons/vsc';
import {AiOutlineSecurityScan} from 'react-icons/ai';

import {MdSystemUpdateAlt} from 'react-icons/md';
import Stack from '@mui/material/Stack';

//import entityService from 'features/services/Entity';
import { currentFormNameAtom, currentBasicTextFilterPropsAtom, isSaveLoadingAtom, colorsAtom } from 'library/store';
import { useRecoilValue, useRecoilState } from 'recoil';



export const SystemMenu = () => {

  const { t, i18n } = useTranslation(); 
  const { enqueueSnackbar } = useSnackbar();

  //const { showEntitySearchBox } = entityService();

  const [Colors, setColors] = useRecoilState(colorsAtom);
  const currentBasicTextFilterProps = useRecoilValue(currentBasicTextFilterPropsAtom);
  const currentFormName = useRecoilValue(currentFormNameAtom);
  const [isSaveLoading, setIsSaveLoading] = useRecoilState(isSaveLoadingAtom);


  const handleNewClick = async (event : MouseEvent<HTMLButtonElement>) => {
    
    try {
    
      event.preventDefault();
      const btn = document.getElementById(`btnNew`);
      if(btn == null) {
        enqueueSnackbar( 'bad action ...', { variant: 'error',
          anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
        return;
      }
      
      //setDisplaySpinner(true);    
      await btn?.click(); 
    } finally {

    }    
    //setDisplaySpinner(false);    
  }

  //const [saveExecuting, setSaveExecuting] = useState<boolean>(false);
  const handleSaveClick = async (event : MouseEvent<HTMLButtonElement>) => {
    
    try {
      //setSaveExecuting(true);
      event.preventDefault();
      const btn = document.getElementById(`btnSave`);
      if(btn == null) {
        enqueueSnackbar( 'bad action ...', { variant: 'error',
          anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
        return;
      }
      
      //setDisplaySpinner(true);    
      setIsSaveLoading(true);
      await btn?.click();     
      //setDisplaySpinner(false);    
    } finally {
      //setSaveExecuting(false);
    } 
  }

  
  const [newAllowed, setNewAllowed] = useState<boolean>(false);
  const [saveAllowed, setSaveAllowed] = useState<boolean>(false);
  const [printAllowed, setPrintAllowed] = useState<boolean>(false);
  const [actionAllowed, setActionAllowed] = useState<boolean>(false);

  const [authAllowed, setAuthAllowed] = useState<boolean>(false);

  const [filerAllowed, setFilterAllowed] = useState<boolean>(false);


  const handleActionClick = async (event : MouseEvent<HTMLButtonElement>) => {
    
    event.preventDefault();
    const btn = document.getElementById(`btnAction`);
    if(btn == null) {
      enqueueSnackbar( 'bad action ...', { variant: 'error',
        anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
      return;
    }
    
    //setDisplaySpinner(true);    
    await btn?.click();     
    //setDisplaySpinner(false);    
  }

  const handlePrintClick = async (event : MouseEvent<HTMLButtonElement>) => {
    
    event.preventDefault();
    const btn = document.getElementById(`btnPrint`);
    if(btn == null) {
      enqueueSnackbar( 'bad action ...', { variant: 'error',
        anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
      return;
    }
    
    //setDisplaySpinner(true);    
    await btn?.click();     
    //setDisplaySpinner(false);    
  }

  const handleAuthClick = async (event : MouseEvent<HTMLButtonElement>) => {
    
    event.preventDefault();
    const btn = document.getElementById(`btnAuth`);
    if(btn == null) {
      enqueueSnackbar( 'bad action ...', { variant: 'error',
        anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
      return;
    }
    
    //setDisplaySpinner(true);    
    await btn?.click();     
    //setDisplaySpinner(false);    
  }

  // const handleFilterClick = async (event : MouseEvent<HTMLButtonElement>) => {
    
  //   event.preventDefault();
  //   showEntitySearchBox();   
  // }

  useEffect( () => {
    setNewAllowed( document.getElementById(`btnNew`) !== null);
    setSaveAllowed( document.getElementById(`btnSave`) !== null);
    setPrintAllowed( document.getElementById(`btnPrint`) !== null);

        
    setActionAllowed( document.getElementById(`btnAction`) !== null);
    setAuthAllowed( document.getElementById(`btnAuth`) !== null);

  },[currentFormName]);

  useEffect( () => {
    setFilterAllowed( currentBasicTextFilterProps.headCells.length !== 0);
  },[currentBasicTextFilterProps]);
  

  return (
    <Grid container pt={1} pb={1}>
        <Grid item xs={1} md={4} >
            <Typography
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontWeight: 'bold', mt: 0.5, pl: '16px',
                  display:{xs: 'none', md:'block'}
                }}
              >
                {currentFormName}
            </Typography>
        </Grid>
        <Grid item xs={9} md={6}>
            <Button variant="outlined" sx={{ pt: 0, pb: 0, }} 
              disabled={!newAllowed}
              onClick={handleNewClick} >              
                
                   
              <Box sx={{ ml: 0.25, mr: 0.25, mt: 0.5, }} >
                <VscNewFile color={newAllowed? Colors.menuButton : grey[500]} size={24} />
              </Box>              
            </Button>
            <Button variant="outlined" sx={{ ml: 0.25, pt: 0, pb: 0,   }} // display: isSaveLoading?'none':'block'
              disabled={!saveAllowed || isSaveLoading}
              onClick={handleSaveClick} >              
                <Typography
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    fontWeight: 'bold',
                    display:{xs: 'none', md:'block'}                  
                  }}                
                >
                  {t('Save')}
                </Typography> 
                   
              <Box sx={{ ml: 0.25, mr: 0.25, mt: 0.5, }} >
                <FaSave color={saveAllowed?Colors.menuButton : grey[500]} size={24} />
              </Box>              
            </Button>

            <Button variant="outlined" sx={{ ml: 0.25, mr: 0, pt: 0, pb: 0 }}
                  disabled={!printAllowed}
                  onClick={handlePrintClick}
                 >                 
                <Typography
                    sx={{
                        color: (theme) => theme.palette.text.primary, 
                        fontWeight: 'bold',
                        display:{xs: 'none', md:'block'}     
                    }} >
                    {t('Print')}
                </Typography>
                <Box sx={{ ml: 0.25, mr: 0.25, mt: 0.5, }} >
                    <FaPrint color={printAllowed?Colors.menuButton : grey[500]} size={24} />
                </Box>
            </Button>
            <Button variant="outlined" sx={{  ml: 0.25, mr: 0,pt: 0, pb: 0 }} 
                disabled={!actionAllowed}
                onClick={handleActionClick}>                 
                <Typography
                    sx={{
                        color: (theme) => theme.palette.text.primary, 
                        fontWeight: 'bold',
                        display:{xs: 'none', md:'block'}     
                    }} >
                    {t('Action')}...
                </Typography>
                <Box sx={{ ml: 0.25, mr: 0.25, mt: 0.5, }} >
                    <MdSystemUpdateAlt color={actionAllowed?Colors.menuButton : grey[500]} size={24} />
                </Box>
            </Button>
            <Button variant="outlined" sx={{  ml: 0.25, mr: 0, pt: 0, pb: 0 }} 
              disabled={!authAllowed}
              onClick={handleAuthClick} >
                  
              <Box sx={{ ml: 0.25, mr: 0.25, mt: 0.5, }} >
                <AiOutlineSecurityScan color={authAllowed?Colors.menuButton : grey[500]} size={24} />
              </Box>              
            </Button>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button variant="outlined" sx={{ pt: 0, pb: 0 }} 
              disabled={!filerAllowed}
              //onClick={handleFilterClick} 
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontWeight: 'bold',
                  display:{xs: 'none', md:'block'}     
                }}
              >
                {t('Filter')}
              </Typography>              
                <Box sx={{ ml: 1, mr: 1, mt: 0.5, }} >
                  <FaSearch color={filerAllowed?Colors.menuButton : grey[500]} size={24} />
                </Box>              
           </Button>
        </Grid>
    </Grid>
  )
}
 