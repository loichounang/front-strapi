import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';

// import library.
import { useFieldArray, useForm, useFormContext, Controller, FormProvider, FieldArrayWithId, ArrayPath } from 'react-hook-form';
import { useTranslation  } from 'react-i18next';

//import NumberFormat from 'react-number-format';
// mui ...
import {Avatar, Button, Grid, Typography, Link, Box, Paper, TextField, 
    MenuItem, IconButton, Checkbox, FormControlLabel, Stack } from '@mui/material';

import { ThreeDots, ThreeCircles  } from 'react-loader-spinner';


import EnhancedTable, {HeadCell, RowCheckedMode} from './EnhancedTable';
import { FaSearch } from 'react-icons/fa';
import { pink } from '@mui/material/colors';

import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';

import { _ExtensionType } from 'features/configuration/models/ExtensionType';
import { DatePicker } from '@mui/x-date-pickers';


export interface IPagination {
    pageSize: number,
    pageNumber: number
}

export interface ITextFilterElement {
    name: string, 
    text: string,

    dataType?: _ExtensionType,
    options?: {value: string, name: string}[], 

    dateValue?: Date,
    
    value: string,    
  }

export interface BasicTextFilterProps<T> {
    title: string,
    headCells: HeadCell<T>[],
    objKey: keyof T,
    //rows: T[],

    onFilterButtonClick: (filtersElement: ITextFilterElement[], pagination?: IPagination) => Promise<T[]>,
    onRowDoubleClick?: (event: React.MouseEvent<unknown>, row: T) => void,

    stateSelected? : [any[], React.Dispatch<React.SetStateAction<any[]>>],
    stateFiltered? : [T[], React.Dispatch<React.SetStateAction<T[]>>],

    autoFilter?: boolean,

    rowCheckedMode?: RowCheckedMode ,

    //filterElementsState: [ITextFilterElement[], React.Dispatch<React.SetStateAction<ITextFilterElement[]>>],
    filterElements: ITextFilterElement[],
}

export const defaultBasicTextFilterProps: BasicTextFilterProps<any> = {
    title: '',
    headCells: [],
    objKey: '',
    //rows: [],
    onFilterButtonClick: (filtersElement: ITextFilterElement[]): Promise<any[]> => { return new Promise<any[]>((resolve, reject) => {}); },
    //filterElementsState: [ [], () => {} ]
    filterElements: []
}

export function  BasicTextFilterForm<T>(props : BasicTextFilterProps<T>)  {
    const {headCells, title, objKey, onFilterButtonClick,onRowDoubleClick ,
            stateSelected, // this is the list containing key of selected row
            stateFiltered, // this is the list of current filter result after onFilterButtonClick.
            filterElements,  rowCheckedMode, autoFilter  } = props;

    const { t, i18n } = useTranslation();

    //const [filterElements, setFilterElements] = filterElementsState;
    const [rows, setRows] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const methods = useForm<{pageSize: number,pageNumber: number,filterElements: ITextFilterElement[]}>(
        {defaultValues:{pageSize: 50,pageNumber:1, filterElements: [...filterElements]}});

    const { register, setValue ,getValues, watch, reset ,handleSubmit ,control , formState: { errors } } = methods;

    let {fields } = useFieldArray<{pageSize: number,pageNumber: number, filterElements: ITextFilterElement[]},'filterElements'>({
      control, 
      name: 'filterElements'});

    //const inputs = useRef( filterElements.map( () => React.createRef()));
    
    const width = Math.min( 25, filterElements.length === 0? 25 : Math.floor(100/filterElements.length));
    
    const w = `${width}` as string;

    const handleFilterButtonClick = async (pg: IPagination) => {    
        // here we set the filterElementsProp, because array field have been build loacaly.    
        // getValues().filterElements.forEach( elt => {
        //     const propElt = filterElementsProp.find(e => e.name === elt.name);
        //     if(propElt)
        //         propElt.value = elt.value;
        // });

        //console.log(getValues().filterElements);
        //setFilterElements( [...getValues().filterElements] );

        setValue('pageNumber', pg.pageNumber);

        setIsLoading(true);
        const arr = await onFilterButtonClick([...getValues().filterElements], pg);
        setIsLoading(false);
        
        if(stateFiltered) 
            stateFiltered[1]([...arr]);
        
        setRows(arr);
    }

    useEffect( () => {              
        if(autoFilter) 
            handleFilterButtonClick({...getValues(), pageNumber: 1})
      }, []);

        
    return ( 
    <>
        <FormProvider {...methods} > 
            <Grid container component="main" sx={{  width: '100%' }} alignItems="flex-start">
                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={2} square>
                    <Stack flexDirection='column' sx={{ width: '100%' }} >                        
                        <Box sx={{ mt: 1, width: '100%' }} > 
                            {filterElements.map(({text,value, dataType, options}, idx) => 
                                ( (dataType || 'text') === 'date') ?                                
                                <Controller key={idx}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <DatePicker 
                                            label={text}     
                                            onChange={onChange}                        
                                            value={value}
                                            //renderInput={(params) => <TextField {...params} sx={{width:`calc(${w}% - 8px)`}} />}
                                            /> )}
                                    name={`filterElements.${idx}.dateValue`}          
                                    control={control}
                                    /> : 
                                ((dataType || 'text') === 'enumeration') ?
                                <Controller key={idx}
                                    render={ ({field: {onChange, value}}) => (
                                    <TextField select onChange={onChange} value={value} sx={{width:`calc(${w}% - 8px)`}}
                                        label={text} >
                                    {(options || []).map( 
                                        (opt,ix) => <MenuItem key={`${idx}-${opt.value}`} value={opt.value}>{opt.name}</MenuItem> )
                                    }
                                    </TextField>
                                    )}
                                    name={`filterElements.${idx}.value`} //defaultValue={param[valueKey]}
                                    control={control}
                                /> : 
                                <Controller   key={idx}          
                                    render={({ field }) => <TextField sx={{width:`calc(${w}% - 8px)`}} {...field} 
                                        InputProps={{
                                            onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                                                if(event.key === 'Enter') {
                                                const btnBasicTextFilter = document.getElementById(`btnBasicTextFilter`);
                                                // if(btnBasicTextFilter !== null)
                                                //     btnBasicTextFilter?.click();                        
                                                }
                                                //postLogin( new MouseEvent<HTMLButtonElement,MouseEvent>('button') );
                                            },
                                        }}
                                    inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }
                                    label={text} />}
                                    name={`filterElements.${idx}.value`} //defaultValue={value} 
                                    control={control}
                                />
                            )
                            }
                        </Box>
                        <Box sx={{ mt: 1, mb: 1, width: '100%', display: 'flex', justifyContent: 'center' }} >
                            <Box sx={{ flexGrow: 1 }}></Box>
                            <Button variant="outlined" onClick={() => handleFilterButtonClick({...getValues(), pageNumber: 1})} id="btnBasicTextFilter">
                            {isLoading ? <ThreeCircles
                                    color='#e15b64'
                                    height={'30'}
                                    //width={100}
                                    //timeout={3000} //3 secs
                                /> : <Typography
                                        sx={{
                                            color: (theme) => theme.palette.text.primary,
                                            fontWeight: 'bold',
                                            display:{xs: 'none', md:'block'}     
                                        }} >
                                        {t('Search')}
                                    </Typography>
                            }
                                
                                <Box sx={{ ml: 1, mr: 1, mt: 0.5, }} >
                                    <FaSearch color={pink[500]} size={16} />
                                </Box>
                            </Button>
                            <Box sx={{ flexGrow: 1 }}></Box>
                            <Controller name={`pageSize`} control={control}                                    
                                    render={ ({field: {onChange, value}}) => (
                                      <TextField select onChange={onChange} value={value} sx={{width:'calc(10% - 8px)'}} id="pageSize"
                                        label={t('Page size')} inputProps={ {readOnly: false}} > 
                                          <MenuItem value={5}>5</MenuItem>                                           
                                          <MenuItem value={10}>10</MenuItem>         
                                          <MenuItem value={25}>25</MenuItem>      
                                          <MenuItem value={50}>50</MenuItem>                                   
                                          <MenuItem value={100}>100</MenuItem>                                   
                                      </TextField>
                                    )}
                                />
                        </Box>                        
                    </Stack>  
                </Grid>
                <Grid item xs={12} component={Paper} elevation={3} square>                
                    <Box sx={{ mt: 1, width: '100%' }} >                      
                        <EnhancedTable<T> rows={rows} headCells={headCells} title={title} objKey={objKey} 
                            stateSelected={stateSelected} 
                            onRowSelected={undefined} onRowDoubleClick={onRowDoubleClick} rowCheckedMode={rowCheckedMode ?? 'single'}
                            onRowCheckedSelectChange={undefined} toolbarActions={undefined} order='asc' orderBy={objKey}
                         /> 
                    </Box>
                    <Box sx={{ mt: 1, mb: 1, width: '100%', display: 'flex', justifyContent: 'center' }} >
                        { getValues().pageNumber > 1 && <Button variant="outlined" onClick={() => handleFilterButtonClick({...getValues(), pageNumber: getValues().pageNumber-1 })} 
                                id="btnBasicTextFilter" sx={{ ml: 1, mr: 1 }}>
                            <Box sx={{ ml: 1, mr: 1, mt: 0.5, }} >
                                <GrFormPreviousLink color={pink[500]} size={16} />
                            </Box>
                            <Typography
                                sx={{
                                    color: (theme) => theme.palette.text.primary,
                                    fontWeight: 'bold',
                                    display:{xs: 'none', md:'block'}     
                                }} >
                                {t('Previous')}
                            </Typography>
                            
                        </Button> }
                        <Typography
                            sx={{
                                color: (theme) => theme.palette.text.primary,
                                fontWeight: 'bold',
                                display:{xs: 'none', md:'block'}     
                            }} >
                            {`${rows.length} ${t('Item')}(s)`}
                        </Typography>
                        { rows.length >= getValues().pageSize && <Button variant="outlined" onClick={() => handleFilterButtonClick({...getValues(), pageNumber: getValues().pageNumber+1 })} 
                                id="btnBasicTextFilter"  sx={{ ml: 1, mr: 1 }}>
                            <Typography
                                sx={{
                                    color: (theme) => theme.palette.text.primary,
                                    fontWeight: 'bold',
                                    display:{xs: 'none', md:'block'}     
                                }} >
                                {t('Next')}
                            </Typography>
                            <Box sx={{ ml: 1, mr: 1, mt: 0.5, }} >
                                <GrFormNextLink color={pink[500]} size={16} />
                            </Box>
                        </Button> }
                    </Box>
                </Grid>  
            </Grid>
        </FormProvider> 
    </>
    ); 
}


