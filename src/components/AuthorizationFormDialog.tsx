
import React, { useState, MouseEvent } from 'react';

import Slide from '@mui/material/Slide';
import { Box, styled } from "@mui/system";

import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';



import TextField from '@mui/material/TextField';

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import { BasicAuthorizationForm } from './ui/BasicAuthorizationForm';
import { IFeatureDescription } from 'library/interface';
import { HeadCell } from './ui/EnhancedTable';
import { Height } from '@mui/icons-material';

import { currentUserSessionAtom, isAuthorizationBoxShowAtom, currentBasicTextFilterPropsAtom } from 'library/store';
import { FormDialog } from './ui/FormDialog';


export function AuthorizationFormDialog()  {

    const { t, i18n } = useTranslation();


  const [isAuthorizationBoxShow, setIsAuthorizationBoxShow] = useRecoilState(isAuthorizationBoxShowAtom); 

  const [currentBasicTextFilterProps,setCurrentBasicTextFilterProps ] = useRecoilState(currentBasicTextFilterPropsAtom);

  const handleSaveClick = async (event : MouseEvent<HTMLButtonElement>) => {
    
    //event.preventDefault();
    const btn = document.getElementById(`btnSaveAuth`);
    // if(btn == null) {
    //   enqueueSnackbar( 'bad action ...', { variant: 'error',
    //     anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
    //   return;
    // }
    
    //setDisplaySpinner(true);    
    await btn?.click();     
    //setDisplaySpinner(false);    
  } 
  
  return (
      <FormDialog open={isAuthorizationBoxShow} maxWidth='sm'
        okText={t('Save')} cancelText={t('Cancel')} title={`${t('Authorization')} ...`} onCancel={()=> {setIsAuthorizationBoxShow(false);}} 
        onClose={()=> {setIsAuthorizationBoxShow(false);}} onOk={handleSaveClick}  >
        <BasicAuthorizationForm   />
      </FormDialog>    
  )
}
