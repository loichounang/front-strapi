
import React, { useState } from 'react';

import Slide from '@mui/material/Slide';
import { Box, styled } from "@mui/system";

import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';


import TextField from '@mui/material/TextField';

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import { BasicDesktopPublishingForm } from './ui/BasicDesktopPublishingForm';
import { IFeatureDescription } from 'library/interface';
import { HeadCell } from './ui/EnhancedTable';
import { Height } from '@mui/icons-material';

import { currentUserSessionAtom, isDesktopPublishingBoxShowAtom, currentBasicTextFilterPropsAtom } from 'library/store';
import { FormDialog } from './ui/FormDialog';


export function DesktopPublishingFormDialog()  {

    const { t, i18n } = useTranslation();


  const [isDesktopPublishingBoxShow, setIsDesktopPublishingBoxShow] = useRecoilState(isDesktopPublishingBoxShowAtom); 

  const [currentBasicTextFilterProps,setCurrentBasicTextFilterProps ] = useRecoilState(currentBasicTextFilterPropsAtom);
  
  
  return (
      <FormDialog open={isDesktopPublishingBoxShow} maxWidth='sm'
        okText={''} cancelText='' title={`${t('Desktop publishing')} ...`} onCancel={()=> {}} 
        onClose={()=> {setIsDesktopPublishingBoxShow(false);}} onOk={()=> {setIsDesktopPublishingBoxShow(false);}}  >
        <BasicDesktopPublishingForm   />
      </FormDialog>    
  )
}
