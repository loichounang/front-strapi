import React, {FC, PropsWithChildren, useState, useEffect} from 'react';

// import library.
import { useFieldArray, useForm, useFormContext, Controller, FormProvider, FieldArrayWithId, ArrayPath, UnpackNestedValue, DeepPartial, FieldValue, Control, FieldValues, FieldPath, UseFormSetValue } from 'react-hook-form';
import { StringIfPlural, useTranslation  } from 'react-i18next';

import entityService, { useBasicFilterEntity } from 'features/services/Entity';

import NumberFormat from 'react-number-format';
// mui ...
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { DatePicker } from '@mui/x-date-pickers/';

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import EditIcon from '@mui/icons-material/Edit';
// import {ITarifInfo} from '../component/crm/model/BankPolicy';

import TextFieldRight from './TextFieldRight';
import { FormControlLabel, IconButton, InputAdornment, Stack } from '@mui/material';
import { useBasicFilterMedia } from 'features/production/services/Media';
import { IMedia } from 'features/production/models/Media';
import { FormDialog } from './FormDialog';
import { BasicTextFilterForm } from './BasicTextFilterForm';
import { RichWysiwygEditor } from './RichWysiwygEditor';
import { stripHtml } from 'string-strip-html';
import { isFalsy } from 'utility-types';

type BaseType = 'string' | 'numeric' | 'boolean' | 'date';

type _DataType = 'text' | 'integer' | 'decimal' | 'float' | 'date' | 'boolean' | 'time' | 'enumeration' | 'entity';

// export interface IField {
  
//   type: BaseType,
//   dataType: DataType,
  
//   options?: {value: string, name: string} [],
// }


export interface ExtensionValueFieldProps<O extends FieldValues> {    

    control: Control<O>,
    setValue: UseFormSetValue<O>,
    name: FieldPath<O>, 
    descName: FieldPath<O>, 
    label: string,

    type: _DataType,
    
    options?: {value: string, name: string} [],
    textLength?: number,
    formattedText?: boolean,
    //itemsPerRow: 1 | 2 | 3
    width: string
} 

 

//export function ArrayFieldBox  (props : ArrayFieldBoxProps)  {
export default function ExtensionValueField<O extends FieldValues> (props : ExtensionValueFieldProps<O>)  {
    
  const {name, descName, label, type, textLength, formattedText,  width, options, control, setValue} = props;

  const { t, i18n } = useTranslation();  
  const {retrieveEntity } = entityService();

  //const _itemsPerRow = (itemsPerRow || 1) as number;

  const w = width; //_itemsPerRow === 3? '33' : _itemsPerRow === 2?  '50'  : '100' as string;

  //const {  control  } = useFormContext(); 

  const [entityId, setEntityId] = useState<number>(0); 

  const [openMediaFilter, setOpenMediaFilter] = useState(false);
  const basicFilterMedia = useBasicFilterMedia( 
      async (event: React.MouseEvent<unknown>, row: IMedia) => {
          //const {id, name, description} = row;

          const media = await retrieveEntity('Media', row.id) as IMedia;
                                    
          setEntityId(media.id);
          setValue(name, media.id as any);
          setValue(descName, media.name as any);
          setOpenMediaFilter(false);
      }
  );


  const [openFormattedTextDialog, setOpenFormattedTextDialog] = useState(false);
  const handleClickOpenFormattedText = async (event: any) => {   
    setOpenFormattedTextDialog(true);
  }

  const handleClickOpenMedia = async (event: any) => {   
    setOpenMediaFilter(true);
  }

  
    function displayCell() : React.ReactNode {     
           
      if( (type) === 'boolean')
        return (<FormControlLabel sx={{width:`calc(${w}% - 8px)`}}
                label={label}
                control={
                <Controller
                    name={name}
                    control={control}
                    render={({field: {value, onChange,...props} }) => <Checkbox {...props} checked={value} onChange={onChange} />}                        
            />} />);              

      if( ['integer','decimal','float'].includes(type) )
        return (<Controller
          key={`${type} ${label}`}
          render={({ field: {onChange, onBlur, name, value, ref} }) => {
            return (
              <NumberFormat sx={{width:`calc(${w}% - 8px)`,  style: { textAlign: 'right' }}}
                label={label}
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
          name={name} 
          control={control}
        />);

        if( ['entity'].includes(type) )
        return (<Controller
          key={`${type} ${label}`}
          render={({ field }) => <TextField sx={{width:`calc(${w}% - 8px)`}} {...field} label={label} 
          inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">                                            
                <IconButton color="primary" onClick={handleClickOpenMedia}>
                  <ArrowDropDownCircleIcon />
                </IconButton>                                                                                               
            </InputAdornment> )
          }} 
          helperText={`Id: ## ${entityId} ##`} 
        />}          
          name={descName} 
          control={control}
        />);

        if(type === 'date' )  {// && cell.isEditable && cell.isEditable(field)
          
          return ( <Controller
            key={`key-${type}-${label}`}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker //label={t('Issue date')}
                //disabled={!cell.isEditable || !cell.isEditable(row, cell.id)}    
                //disableOpenPicker={!cell.isEditable || !cell.isEditable(row, cell.id)}    
                label={label}     
                onChange={onChange}                        
                value={value}
                renderInput={(params) => <TextField {...params}  />}
              /> )}
            name={name}            
            control={control}
          />);
          }

          if(type === 'enumeration' ) {
            //const options = cell.getOptions(row, cell.id, cell.options || []);
              
              return ((<Controller
                  key={`key-${type}-${label}`}
                  render={ ({field: {onChange, value}}) => (
                    <TextField select onChange={onChange} value={value} sx={{width:`calc(${w}% - 8px)`}}
                      id={type as unknown as string} 
                      label={label}
                      inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }
                      //inputProps={ {readOnly: cell.isEditable? !cell.isEditable(row,cell.id): true }}
                      //label={cell.getLabel?cell.getLabel(row,cell.id): row[cell.id]} 
                      >
                    {options && options.map( 
                      (opt,ix) => <MenuItem key={opt.value} value={opt.value}>{opt.name}</MenuItem> )
                    }
                    </TextField>
                  )}
                  
                  name={name}
                  control={control}
                />));
          }


          const isFormattedText = !isFalsy(formattedText);
          
          return (<Controller             
            key={`${type} ${label}`}
            render={({ field }) => <TextField sx={{width:`calc(${w}% - 8px)`}} {...field} 
              label={label} inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } 
              InputProps={{
                readOnly: isFormattedText,
                endAdornment: (
                  isFormattedText ? <InputAdornment position="end">                                            
                    <IconButton color="primary" onClick={handleClickOpenFormattedText}>
                      <EditIcon />
                    </IconButton>                                                                                               
                </InputAdornment> : null)
              }} />}
            name={name} //defaultValue={param[valueKey]}
            control={control}
        />);
    }

    useEffect( () => {        
      // if(type === 'entity')
      //   setEntityId(idddd)
    }, []);  

    return (  <>
                {displayCell() }
                { openMediaFilter && <FormDialog open={openMediaFilter} maxWidth='md' 
                                okText={t('OK')} cancelText='' title={`${t('Media')}...`} onCancel={()=> {}} 
                                onClose={()=> {setOpenMediaFilter(false);}} onOk={()=> {setOpenMediaFilter(false);}}  >
                                    <BasicTextFilterForm<IMedia> {...basicFilterMedia } />
                            </FormDialog> }

                { openFormattedTextDialog && <FormDialog open={openFormattedTextDialog} maxWidth='md' 
                    okText={t('OK')} cancelText='' title={`${label} ...`} onCancel={()=> {}} 
                    onClose={()=> {setOpenFormattedTextDialog(false);}} onOk={()=> {setOpenFormattedTextDialog(false);}}  >
                    <Stack flexDirection='column'>      
                      <Box sx={{ mt: 1, width: '100%' }} > 
                        <Controller
                          render={({ field }) => 
                            <RichWysiwygEditor {...field} 
                              //mentionSuggestions={getValues().reportFields.map(({alias}) => ({text: alias, value: "${"+alias+"}"}))}
                              id={`key-${name} - ${label}`} />}
                              name={name}
                              control={control}
                              //defaultValue=""
                              
                              rules={{
                                validate: {
                                  required: (v) =>
                                    (v && stripHtml(v).result.length > 0) ||
                                    "Description is required",
                                  maxLength: (v) =>
                                    (v && stripHtml(v).result.length <= 8000) ||
                                    "Maximum character limit is 8000",
                                },
                              }}
                          />
                      </Box>
                    </Stack>
                </FormDialog> }
              </>      
      );    
}

