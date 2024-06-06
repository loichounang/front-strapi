
import React, { useState, MouseEvent } from 'react';

import Slide from '@mui/material/Slide';
import { Box, styled } from "@mui/system";

import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';


import TextField from '@mui/material/TextField';

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import IconButton from '@mui/material/IconButton';
import { BasicExportForm } from './ui/BasicExportForm';
import { IFeatureDescription } from 'library/interface';
import { HeadCell } from './ui/EnhancedTable';
import { Height } from '@mui/icons-material';

import { currentUserSessionAtom, isExportBoxShowAtom, currentBasicTextFilterPropsAtom } from 'library/store';
import { FormDialog } from './ui/FormDialog';
import { Breakpoint, InputAdornment, Stack } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues, UseFormSetValue } from 'react-hook-form';
import { IExtension, IExtensionType } from 'features/configuration/models/ExtensionType';
//import { useBasicFilterExtensionType } from 'features/configuration/services/ExtensionType';
import { BasicTextFilterForm } from './ui/BasicTextFilterForm';


export interface ExtensionFormDialogProps {
  open: boolean,
  title: string,

  maxWidth?: Breakpoint
  height?: string,

  okText: string,
  cancelText: string,

  control: Control<IExtension>,
  setValue: UseFormSetValue<IExtension>,

  //aliasFieldName: FieldPath<O>, //T,

  onCancel: () => void;
  onOk: (event : MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
}


export function ExtensionFormDialog(props: ExtensionFormDialogProps)  {

  const { t, i18n } = useTranslation();

  const {open, title, maxWidth, height, okText, cancelText,
        control, setValue,
        
        onCancel, onOk, onClose} = props;


  const [openExtensionTypeFilter, setOpenExtensionTypeFilter] = useState(false);
  // const basicFilterExtensionType = useBasicFilterExtensionType( 
  //     (event: React.MouseEvent<unknown>, row: IExtensionType) => {
  //         const {id, name, description, type, baseType} = row;
          
  //         console.log(row);
  //       setValue('extensionTypeId', id);
  //       setValue('extensionTypeName', name);  
  //       setValue('extensionTypeType', type);   
  //       setValue('extensionTypeBaseType', baseType);                    
                          
  //       setOpenExtensionTypeFilter(false);
  //     }
  // );

  const handleClickSearchExtensionType = (event: any) => {
    setOpenExtensionTypeFilter(true);
  }
  
  
  return (
      <FormDialog open={open} maxWidth={maxWidth} height={height}
          okText={okText} cancelText={cancelText} title={title} onCancel={onCancel} onClose={onClose} onOk={onOk} >
        <Stack flexDirection='column'  >
          <Box sx={{ mt: 1, width: '100%' }}>
            <Controller 
                key='alias'                  
                name='alias'
                control={control}
                render={({ field }) => <TextField {...field} sx={{width:`calc(${100}% - 8px)`}} label={t('Alias')}         
                  inputProps={  { autoComplete: 'new-password', style: {textTransform: 'none'} }} />}
              />            
          </Box>
          <Box sx={{ mt: 1, width: '100%' }}>
            <Controller 
                  key='description'          
                  name='description'
                  control={control}
                  render={({ field }) => <TextField {...field} sx={{width:`calc(${100}% - 8px)`}} label={t('Description')}         
                    inputProps={  { autoComplete: 'new-password', style: {textTransform: 'none'} }} />}
              /> 
          </Box>
          <Box sx={{ mt: 1, width: '100%' }}>
            <Controller 
                  key='extensionTypeName'                  
                  name='extensionTypeName'
                  control={control}
                  render={({ field }) => <TextField {...field} sx={{width:`calc(${100}% - 8px)`}} 
                   label={t('Extension type')}
                    inputProps={  { autoComplete: 'new-password', style: {textTransform: 'none'} }} 
                    InputProps={{
                      readOnly: true,
                      endAdornment: 
                        <InputAdornment position="end">                            
                            <IconButton color="primary" onClick={handleClickSearchExtensionType}>
                              <ArrowDropDownCircleIcon />
                            </IconButton>                            
                        </InputAdornment>
                      
                    }}
                    />}
              />
                { openExtensionTypeFilter && <FormDialog open={openExtensionTypeFilter} maxWidth='md'
                      okText='' cancelText='' title={t('Extension type')} onCancel={()=> {}} 
                      onClose={()=> {setOpenExtensionTypeFilter(false);}} onOk={()=> {setOpenExtensionTypeFilter(false);}}  >
                          {/* <BasicTextFilterForm<IExtensionType> {...basicFilterExtensionType } /> */}
                  </FormDialog> }                                                                                       
          </Box>
        </Stack>
      </FormDialog>    
  )
}
