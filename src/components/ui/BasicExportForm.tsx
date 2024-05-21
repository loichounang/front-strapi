import React, {FC, PropsWithChildren, useRef, useState, useEffect} from 'react';

// import library.
import { useFieldArray, useForm, useFormContext, Controller, FormProvider, FieldArrayWithId, ArrayPath } from 'react-hook-form';
import { useTranslation  } from 'react-i18next';

import { useSnackbar } from 'notistack';

import NumberFormat from 'react-number-format';
// mui ...
import {Avatar, Button, Grid, Typography, Link, Box, Paper, TextField, 
    MenuItem, IconButton, Checkbox, FormControlLabel, Stack } from '@mui/material';

    import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import BoltIcon from '@mui/icons-material/Bolt';

import { ThreeDots, ThreeCircles  } from 'react-loader-spinner';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import entityService  from 'features/services/Entity';

import EnhancedTable, {HeadCell, RowCheckedMode} from './EnhancedTable';
import { FaSearch } from 'react-icons/fa';
import {SiMicrosoftexcel} from 'react-icons/si';
import { MdPictureAsPdf } from 'react-icons/md';

import { pink } from '@mui/material/colors';

import { flexBetweenCenter, fullWidthFlex, justifyCenter } from 'themes/commonStyles';

import { FormDialog } from 'components/ui/FormDialog';
import { BasicTextFilterForm } from 'components/ui/BasicTextFilterForm';

import useEnumerationService from 'features/configuration/services/Enumeration';
import useApplicationQueryService, { useBasicFilterApplicationQuery } from 'features/setup/services/ApplicationQuery';

import { IBusinessApplication, IApplicationQuery, 
    IApplicationQueryParameter, ParameterDataType, toBaseType, toDataType, defaultValue, IApplicationQueryReport } from 'features/setup/models/ApplicationQuery';
import ArrayField, { BaseType, } from './ArrayField';
import { IFeatureParameter } from 'library/interface';
import { isFalsy } from 'utility-types';
import { GrDocumentPdf } from 'react-icons/gr';

import BasicButtonList from './BasicButtonList';
import { hubConnectionIdAtom } from 'library/store';

export interface IQueryParameter {
    name: string,
    type: BaseType,
    label: string,
    dataType: 'Base' | 'Enumeration' | 'Entity' | 'Period',
    value: any,
    dateValue: Date,

    parameterDataType: ParameterDataType, //'text' | 'integer' | 'decimal' | 'float' | 'date' | 'boolean' | 'time' | 'enumeration' | 'entity',
    
    isPeriod: boolean,
    options?: {value: string, name: string}[],

    isRequired: boolean,
    enumerationCode?: string,
}

interface IDataExport {

    fileToken: string,

    //businessApplicationId: number,
    //businessApplicationName: string,

    applicationQueryId: number,
    applicationQueryName: string,

    queryParameters: IQueryParameter[],
    queryReports: IApplicationQueryReport[]
  }

const defaultDataExport : IDataExport = {
    fileToken: '',
    
    // businessApplicationId: 0,
    // businessApplicationName: '',

    applicationQueryId: 0,
    applicationQueryName: '',

    queryParameters: [],
    queryReports: []
}




export function  BasicExportForm()  {
    

    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    //const [filterElements, setFilterElements] = filterElementsState;

    const [hubConnectionId, setHubConnectionId] = useRecoilState(hubConnectionIdAtom);
   
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { getApplicationQueryParameters, generateApplicationQueryXlsx, generateApplicationQueryPdf } = useApplicationQueryService();
    const {getAsOptions } = useEnumerationService();

    const {retrieveEntity} = entityService();

    const methods = useForm<IDataExport>({defaultValues: defaultDataExport});

    const { register, setValue ,getValues, watch, reset ,handleSubmit ,control , formState: { errors } } = methods;
    let {fields: queryParameters} = useFieldArray<IDataExport,'queryParameters'>({
        control, 
        name: 'queryParameters'});


    const [businessApplications, setBusinessApplications] = useState<IBusinessApplication[]>([]);
    
    const [openApplicationQueryFilter, setOpenApplicationQueryFilter] = useState(false);
    const basicFilterApplicationQuery = useBasicFilterApplicationQuery( 
      
      async (event: React.MouseEvent<unknown>, row: IApplicationQuery) => {
        const {id, name } = row;
        //setJobScheduleStepReportTableIndex(index);
        //const { businessApplicationId, businessApplicationName } = getValues();

        const query = await retrieveEntity('ApplicationQuery',id) as IApplicationQuery;
        //const parameters = await getApplicationQueryParameters(id);
        
        reset({...defaultDataExport, //businessApplicationId,businessApplicationName,
              applicationQueryId: id, applicationQueryName: name,

              queryParameters: query.applicationQueryParameters.map(qp => ({name: qp.parameterName,
                type: toBaseType(qp.parameterDataType),
                label: isFalsy(qp.description)?qp.parameterName:qp.description,
                dataType: toDataType(qp),
                parameterDataType: qp.parameterDataType,
                value: defaultValue(qp),
                isPeriod: !isFalsy(qp.isPeriod),
                options: getAsOptions(qp.parameterEnumerationItems , qp.enumerationCode?? ''),              
              })),
              queryReports: query.applicationQueryReports
             });
                                
        setOpenApplicationQueryFilter(false);
      }
    );

    const handleClickSearchApplicationQuery = (event: any) => {
        
        setOpenApplicationQueryFilter(true);
    }

    
    const handleClickExcelExport = async () => {    
        const {queryParameters} = getValues();
        
        const {fileToken, fileName} = await generateApplicationQueryXlsx( 
            {...getValues(),applicationQueryParameterExecutions: queryParameters, hubConnectionId } );
    
        enqueueSnackbar( `${fileName} `, { variant: 'success',
            anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 500 });                
    }

    const [openReportChoice, setOpenReportChoice] = useState<boolean>(false);
    const handleOpenReports = () => {
        setOpenReportChoice(true);
    }

    const handleClickPdfExport = async (queryReport: IApplicationQueryReport) => {

     const {reportId} = queryReport;
     const {queryParameters,  } = getValues();      
      const {fileToken, fileName} = await generateApplicationQueryPdf( 
          {...getValues(),applicationQueryParameterExecutions: queryParameters, 
                reportId, language: 'fr-FR', hubConnectionId } );
  
      enqueueSnackbar( `${fileName} `, { variant: 'success',
          anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 500 });                
  }

        
    return ( 
    <>
        <FormProvider {...methods} > 
            <Grid container component="main" sx={{  width: '100%' }} alignItems="flex-start">
                <Grid item xs={12} sm={12} md={12} component={Paper} square>
                    <Stack flexDirection='column' sx={{ width: '100%' }} >                        
                        {/* <Box sx={{ mt: 1, width: '100%' }} > 
                            <Controller name='businessApplicationId' control={control} 
                                    defaultValue={ (businessApplications || []).length === 1 ? (businessApplications || [])[0].id : 0 }
                                    render={ ({field: {onChange, value}}) => (
                                      <TextField select onChange={onChange} value={value} sx={{width:'calc(100% - 8px)'}} id="businessApplicationId"
                                        label={t('Business application')} inputProps={ {readOnly: false}} >
                                        {businessApplications.map( 
                                          (x,idx) => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem> )
                                        }
                                      </TextField>
                                    )}
                                />                            
                        </Box> */}
                        <Box sx={{ mt: 1, mb: 1, width: '100%', display: 'flex', justifyContent: 'center' }} >
                            <TextField sx={{width:'calc(100% - 8px)' }} id="applicationQueryName" label={t('Query filter')} inputProps={ {readOnly: true}}
                                  {...register('applicationQueryName')} 
                                  InputProps={{
                                      readOnly: true,
                                      endAdornment: (
                                        <InputAdornment position="end">                                            
                                          <IconButton color="primary" onClick={handleClickSearchApplicationQuery}>
                                            <ArrowDropDownCircleIcon />
                                          </IconButton>                                                                                               
                                      </InputAdornment>
                                    )
                                  }}
                                />
                                { openApplicationQueryFilter && <FormDialog open={openApplicationQueryFilter} maxWidth='md'
                                    okText={t('OK')} cancelText='' title={t('Query filter')} onCancel={()=> {}} 
                                    onClose={()=> {setOpenApplicationQueryFilter(false);}} onOk={()=> {setOpenApplicationQueryFilter(false);}}  >
                                    <BasicTextFilterForm<IApplicationQuery> {...basicFilterApplicationQuery} />
                                  </FormDialog>  }
                        </Box>
                        <Box sx={{ mt: 2, width: '100%' }} >                                            
                                <ArrayField<IQueryParameter> params={queryParameters} itemsPerRow={2} paramsName={'queryParameters'}
                                    valueKey='value' labelKey='label' dateValueKey='dateValue'   />
                        </Box>        
                        <Box sx={{ ...justifyCenter, mt: 3, width: '100%' }} >                                            
                            { (getValues().applicationQueryId > 0 ) && <Button onClick={handleClickExcelExport}>
                                {'Excel'}
                                <Box sx={{ ...justifyCenter, ml: 1 }}>
                                    <SiMicrosoftexcel size={24} />
                                </Box>
                            </Button> }
                            { (getValues().queryReports.length>0) && <Button onClick={handleOpenReports} sx={{ ...justifyCenter, ml: 5 }}>
                                {'Pdf'}
                                <Box sx={{ ...justifyCenter, ml: 1 }}>
                                    <MdPictureAsPdf size={24} />
                                </Box>
                            </Button> }
                        </Box>  
                        { openReportChoice && <FormDialog open={openReportChoice} maxWidth='xs' height='50vh'
                                  okText='' cancelText='' title={t('Select report to export')} onCancel={()=> {}} 
                                  onClose={()=> {setOpenReportChoice(false);}} onOk={()=> {setOpenReportChoice(false);}}  >
                                      <BasicButtonList<IApplicationQueryReport> 
                                          items={getValues().queryReports} icon={BoltIcon} onItemClick={handleClickPdfExport} 
                                          valueKey={'reportId'} displayKey={'reportName'} title='' />
                          </FormDialog> }           
                    </Stack>  
                </Grid>
                <Grid item xs={12} component={Paper} square>                
                    <Box sx={{ mt: 1, width: '100%' }} >                      
                         
                    </Box>
                </Grid>  
            </Grid>
        </FormProvider> 
    </>
    ); 
}


