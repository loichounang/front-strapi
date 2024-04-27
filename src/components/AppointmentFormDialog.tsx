
import React, { useState, MouseEvent } from 'react';

import Slide from '@mui/material/Slide';
import { Box, styled } from "@mui/system";

import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';


import { Colors } from 'themes/theme';
import TextField from '@mui/material/TextField';

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import { BasicTextFilterForm, BasicTextFilterProps } from './ui/BasicTextFilterForm';
import { IFeatureDescription } from 'library/interface';
import { HeadCell } from './ui/EnhancedTable';
import { Height } from '@mui/icons-material';

import { currentUserSessionAtom, isSearchBoxShowAtom, currentBasicTextFilterPropsAtom } from 'library/store';
import { FormDialog } from './ui/FormDialog';
import { AppointmentForm } from 'features/production/AppointmentForm';
import { defaultAppointment } from 'features/production/models/Appointment';
import { enqueueSnackbar } from 'notistack';


export interface AppointmentFormDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
 }

export function AppointmentFormDialog(props: AppointmentFormDialogProps)  {

  const { t, i18n } = useTranslation();

  const {open, setOpen} = props;

  const handleSaveAppointment = async (event : MouseEvent<HTMLButtonElement>) => {
    try {
    
      event.preventDefault();
      const btn = document.getElementById(`btnSaveAppointment`);
      if(btn == null) {
        enqueueSnackbar( 'bad action ...', { variant: 'error',
          anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
        return;
      }
      
      //setDisplaySpinner(true);    
      await btn?.click(); 
    } finally {

    }
    
  }
  
  return (
      <FormDialog open={open} maxWidth='sm'
        okText={t('Create appointement')} cancelText={t('Cancel')} title={`${t('Appointment')}...`} onCancel={()=> {setOpen(false);}} 
        onClose={()=> {setOpen(false);}} onOk={handleSaveAppointment}  >
        <AppointmentForm {...defaultAppointment }  />
      </FormDialog>    
  )
}
