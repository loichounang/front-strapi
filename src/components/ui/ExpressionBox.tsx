import React, {FC, PropsWithChildren, useState, useEffect} from 'react';

// import library.
import { useTranslation } from 'react-i18next';
import { useFieldArray, useForm, useFormContext, Controller, FormProvider, FieldArrayWithId, ArrayPath,
     UnpackNestedValue, DeepPartial, FieldValues, Control, UseFormSetValue, FieldPath, UseFormGetValues } from 'react-hook-form';

import { useSnackbar } from 'notistack';

import NumberFormat from 'react-number-format';
// mui ...
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/';

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';


import {get} from 'lodash';

// import {ITarifInfo} from '../component/crm/model/BankPolicy';

import entityService from 'features/services/Entity';

import TextFieldRight from './TextFieldRight';
import { FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { FormDialog } from './FormDialog';
import EntityExpression from './EntityExpression';
import { isFalsy } from 'utility-types';
// import { useBasicFilterTarification } from 'features/setup/services/Tarification';
// import { ITarification } from 'features/setup/models/Tarification';
import { BasicTextFilterForm } from './BasicTextFilterForm';

export type BaseType = 'string' | 'numeric' | 'boolean' | 'date' | 'time';

//export type DataType = 'Base' | 'Enumeration' | 'Entity' | 'Period';

export interface IField {
  
  type: BaseType,
  dataType: 'Base' | 'Enumeration' | 'Entity' | 'Period',
  
  options?: {value: string, name: string} [],
}


export interface ExpressionBoxProps<O extends FieldValues> {    
    
  control: Control<O>,
  setValue: UseFormSetValue<O>,
  getValues: UseFormGetValues<O>,

  // pathTarificationId?: FieldPath<O>,
  // pathTarificationName?: FieldPath<O>,

  fieldExpressions: { entityName: string, path: FieldPath<O>, label: string, returnType: string, expression: string, textRowCount: number }[]  
} 


export default function ExpressionBox<O extends FieldValues> (props : ExpressionBoxProps<O>)  {
      
  const { fieldExpressions, control, setValue, getValues,  } = props;

  const { t, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const {retrieveEntity, retrieveData, openEntityActionDrawer, 
    checkEntityExpressionSyntax, checkEntitySaveAuthorization } = entityService();


  // const [openTarificationFilter, setOpenTarificationFilter] = useState(false);
  // const basicFilterTarification = useBasicFilterTarification( 
  //     (event: React.MouseEvent<unknown>, row: ITarification) => {
  //         const {id, name, description} = row;
                    
  //         setValue(pathTarificationId!, id as any, { shouldValidate: true });              
  //         setOpenTarificationFilter(false);
  //     }
  // );

    
  const [openEntityExpression, setOpenEntityExpression] = useState(false);
  const [currentExpression, setCurrentExpression] = useState(''); 
  const [currentEntityName, setCurrentEntityName] = useState(''); 
  const [currentReturnType, setCurrentReturnType] = useState(''); 

  const [currentPath, setCurrentPath] = useState<FieldPath<O>>();

  // type ExpressionType = 'price' | 'max-discount' | 'price-unity' | 'customer-point' | 'service-point' | 'packaging-service-point';
  // const [currentExpressionType, setCurrentExpressionType] = useState<ExpressionType>('price');

  const handleClickOpenExpression = (x: {entityName: string, returnType: string, expression: string, path: FieldPath<O>} ) => {
    
    const y = get(getValues(), x.path);
    
    setCurrentPath(x.path);
    setCurrentEntityName(x.entityName);
    setCurrentReturnType(x.returnType);
    setCurrentExpression( get(getValues(), x.path) as unknown as string); 
    setOpenEntityExpression(true);
  }

  const handleClickOkExpression = async () => {

    const checkExpression = await checkEntityExpressionSyntax(currentEntityName, currentExpression);
        if(!checkExpression){
          enqueueSnackbar( t('Expression evaluation error'), { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 }); 
          return;
        }

        const {syntaxOk, syntaxError, returnType} = checkExpression;
        if(!syntaxOk) {
          enqueueSnackbar( syntaxError , { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 }); 
          return;
        }
       
        if( currentReturnType!== 'object' && returnType !== currentReturnType) {
          enqueueSnackbar( `${t('The result of expression must be')} ${currentReturnType}` , { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
                return;
        }
        
        setValue(currentPath!, currentExpression as string as any, { shouldValidate: true });
        setOpenEntityExpression(false);
  }

  // const handleClickOpenTarification = (event: any) => {
  //   setOpenTarificationFilter(true);
  // }


    return ( 
        
          <>   
            {/* { ( isFalsy(pathTarificationId) || isFalsy(pathTarificationName) ) ? null:
              <Box sx={{ mt: 1, width: '100%' }} >
                <Controller                    
                      render={({ field }) => <TextField label={t('Tarification')} {...field} 
                          inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }
                          sx={{width:`calc(100% - 8px)`}}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">                                            
                                <IconButton color="primary" onClick={handleClickOpenTarification}>
                                  <ArrowDropDownCircleIcon />
                                </IconButton>                                                                                               
                            </InputAdornment>
                          )
                        }} />}
                    name={pathTarificationName}                      
                    control={control}
                  />                                                                 
              </Box>              
            } */}
            { 
              fieldExpressions.map( (x,idx) => (
                <Box sx={{ mt: 1, width: '100%' }} key={`box-${x.path as string}- ${idx} - ${fieldExpressions.length}`}>
                  <Controller
                    key={`control-${x.path as string}- ${idx}`}
                      render={({ field }) => <TextField label={x.label} {...field} 
                          multiline={x.textRowCount>1} rows={x.textRowCount} inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }
                          sx={{width:`calc(100% - 8px)`}}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">                                            
                                <IconButton color="primary" onClick={(event) =>
                                    handleClickOpenExpression({...x})}>
                                  <DeveloperModeIcon />
                                </IconButton>                                                                                               
                            </InputAdornment>
                          )
                        }} />}
                    name={x.path}                      
                    control={control}
                  />                                    
                </Box>
                )
            )}
          { openEntityExpression && <FormDialog open={openEntityExpression} maxWidth='md'
              okText={t('OK')} cancelText='' title={`${t('Expression')} ...`} onCancel={()=> {}} 
              onClose={()=> {setOpenEntityExpression(false);}} onOk={handleClickOkExpression}  >
              <EntityExpression entityName={currentEntityName} properties={[]} 
                expression={currentExpression} setExpression={setCurrentExpression} />
            </FormDialog>  }
            
        </>);    
}

