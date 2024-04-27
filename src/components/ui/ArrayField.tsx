import React, {FC, PropsWithChildren, useState, useEffect} from 'react';

// import library.
import { useFieldArray, useForm, useFormContext, Controller, FormProvider, FieldArrayWithId, ArrayPath, UnpackNestedValue, DeepPartial } from 'react-hook-form';

import NumberFormat from 'react-number-format';
// mui ...
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/';

// import {ITarifInfo} from '../component/crm/model/BankPolicy';

import TextFieldRight from './TextFieldRight';
import { FormControlLabel } from '@mui/material';

export type BaseType = 'string' | 'numeric' | 'boolean' | 'date' | 'time';

//export type DataType = 'Base' | 'Enumeration' | 'Entity' | 'Period';

export interface IField {
  
  type: BaseType,
  dataType: 'Base' | 'Enumeration' | 'Entity' | 'Period',
  
  options?: {value: string, name: string} [],
}


export interface ArrayFieldProps<T extends IField> {    
    params: T[],

    paramsName: string,

    valueKey: keyof T,    
    labelKey: keyof T,

    dateValueKey: keyof T, 

    itemsPerRow: 1 | 2 | 3
} 

 

//export function ArrayFieldBox  (props : ArrayFieldBoxProps)  {
export default function ArrayField<T extends IField> (props : ArrayFieldProps<T>)  {
    
  const {params, paramsName, valueKey, labelKey, dateValueKey, itemsPerRow } = props;

  const _itemsPerRow = (itemsPerRow || 1) as number;

  const w = _itemsPerRow === 3? '33' : _itemsPerRow === 2?  '50'  : '100' as string;

  const {  control  } = useFormContext();  
  
    function displayCell(param: T, idx: number ) : React.ReactNode { 
            
      if( param.type === 'boolean')
      return (<FormControlLabel sx={{width:`calc(${w}% - 8px)`}}
              label={String(param[labelKey])}
                control={
                <Controller
                  name={`${paramsName}.${idx}.${String(valueKey)}`}
                    control={control}
                    render={({field: {value, onChange,...props} }) => <Checkbox {...props} checked={value} onChange={onChange} />}                        
                />} />);
      

      if(param.type === 'numeric' && param.dataType === 'Period')
          return (<Controller
          //key={`key-${type}-${type}`}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DatePicker //label={t('Issue date')}
              views={["year", "month"]}  
              label={String(param[labelKey])}     
              onChange={onChange}                        
              value={value}
              renderInput={(params) => <TextField {...params} sx={{width:`calc(${w}% - 8px)`}} />}
            /> )}
            name={`${paramsName}.${idx}.${String(valueKey)}`}          
          control={control}
        />);

      if(param.type === 'numeric')
        return (<Controller
          render={({ field: {onChange, onBlur, name, value, ref} }) => {
            return (
              <NumberFormat sx={{width:`calc(${w}% - 8px)`,  style: { textAlign: 'right' }}}
                label={param[labelKey]}
                //decimalScale={2}
                allowEmptyFormatting={false}
                control={control}                          
                //fixedDecimalScale={true}              
                thousandSeparator={true}
                decimalScale={2}
                onValueChange={ (v) => onChange(v.floatValue) }
                //{...field}
                customInput={TextFieldRight}
                defaultValue={value}
                value={value}
                //customInput={(props) => <TextField {...props} sx={{width:'calc(20% - 8px)'}} id="roleName" inputProps={{style: { textAlign: 'right' }}} />}
              />
            );
          }}
          name={`${paramsName}.${idx}.${String(valueKey)}`} 
          control={control}
        />);

        if(param.type === 'date')
          return (<Controller
          //key={`key-${type}-${type}`}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DatePicker //label={t('Issue date')}
                
            label={String(param[labelKey])}     
              onChange={onChange}                        
              value={value}
              renderInput={(params) => <TextField {...params} sx={{width:`calc(${w}% - 8px)`}} />}
            /> )}
            name={`${paramsName}.${idx}.${String(dateValueKey)}`}          
          control={control}
        />);
       
        
        if(param.type === 'string' && param.dataType === 'Enumeration')
          return (<Controller
            render={ ({field: {onChange, value}}) => (
              <TextField select onChange={onChange} value={value} sx={{width:`calc(${w}% - 8px)`}}
                 label={String(param[labelKey])} >
              {param.options && param.options.map( 
                (ei,ix) => <MenuItem key={ei.value} value={ei.value}>{ei.name}</MenuItem> )
              }
              </TextField>
            )}
            name={`${paramsName}.${idx}.${String(valueKey)}`} //defaultValue={param[valueKey]}
            control={control}
          />);

          return (<Controller             
            render={({ field }) => <TextField sx={{width:`calc(${w}% - 8px)`}} inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }  {...field} label={String(param[labelKey])}   />}
            name={`${paramsName}.${idx}.${String(valueKey)}`} //defaultValue={param[valueKey]}
            control={control}
        />);
    }

    return ( 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} >
          <Box sx={{ mt: 1, width: '100%' }} >   
            { 
              params.map( (x,idx) => (
              (idx%_itemsPerRow===0) ? 
                (<Box key={idx} sx={{ mt: 1, width: '100%' }}>
                    {displayCell(x,idx)}
                    {(_itemsPerRow > 1 && idx+1<params.length)?displayCell(params[idx+1],idx+1):null}
                    {(_itemsPerRow > 2 && idx+2<params.length)?displayCell(params[idx+2],idx+2):null}
                 </Box>
                   ) : null)
            )}
          </Box>
        </Box>);    
}

