
import React, { useState } from 'react';

import Slide from '@mui/material/Slide';
import { Box, styled } from "@mui/system";

import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';


import TextField from '@mui/material/TextField';

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import { BasicExportForm } from './ui/BasicExportForm';
import { IFeatureDescription } from 'library/interface';
import { HeadCell } from './ui/EnhancedTable';
import { Height } from '@mui/icons-material';

import { currentUserSessionAtom, isExportBoxShowAtom, currentBasicTextFilterPropsAtom } from 'library/store';
import { FormDialog } from './ui/FormDialog';


export function ExportFormDialog()  {

    const { t, i18n } = useTranslation();


  const [isExportBoxShow, setIsExportBoxShow] = useRecoilState(isExportBoxShowAtom); 

  const [currentBasicTextFilterProps,setCurrentBasicTextFilterProps ] = useRecoilState(currentBasicTextFilterPropsAtom);
  
  return (
      <FormDialog open={isExportBoxShow} maxWidth='sm'
        okText={''} cancelText='' title={`${t('Export')} ...`} onCancel={()=> {}} 
        onClose={()=> {setIsExportBoxShow(false);}} onOk={()=> {setIsExportBoxShow(false);}}  >
        <BasicExportForm   />
      </FormDialog>    
  )
}
