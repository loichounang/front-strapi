
import React, { useState } from 'react';

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


export function FilterFormDialog()  {

    const { t, i18n } = useTranslation();


  const [isSearchBoxShow, setIsSearchBoxShow] = useRecoilState(isSearchBoxShowAtom);
  const [currentBasicTextFilterProps,setCurrentBasicTextFilterProps ] = useRecoilState(currentBasicTextFilterPropsAtom);
  
  return (
      <FormDialog open={isSearchBoxShow} maxWidth='lg'
        okText={''} cancelText='' title={t('Entity filter')} onCancel={()=> {}} 
        onClose={()=> {setIsSearchBoxShow(false);}} onOk={()=> {setIsSearchBoxShow(false);}}  >
        <BasicTextFilterForm {...currentBasicTextFilterProps }  />
      </FormDialog>    
  )
}
