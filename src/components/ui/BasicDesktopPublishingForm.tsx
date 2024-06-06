import React, {FC, PropsWithChildren, useRef, useState, useEffect, MouseEvent} from 'react';

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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PrintIcon from '@mui/icons-material/Print';

import { ThreeDots, ThreeCircles  } from 'react-loader-spinner';


import EnhancedTable, {ActionIconTableRow, HeadCell, RowCheckedMode} from './EnhancedTable';
import { FaSearch } from 'react-icons/fa';
import {SiMicrosoftexcel} from 'react-icons/si';

import { pink } from '@mui/material/colors';

import { flexBetweenCenter, fullWidthFlex, justifyCenter, typographyGroupBoxStyling } from 'themes/commonStyles';

import { FormDialog } from 'components/ui/FormDialog';
import { BasicTextFilterForm } from 'components/ui/BasicTextFilterForm';

import useApplicationQueryService, { useBasicFilterApplicationQuery } from 'features/setup/services/ApplicationQuery';

import entityService, { useBasicFilterEntity } from 'features/services/Entity';
import useEditionService, { useBasicFilterEdition } from 'features/misc/services/Edition';


 import { IBusinessApplication, IApplicationQuery, 
     IApplicationQueryParameter, ParameterDataType, toBaseType, toDataType, defaultValue } from 'features/setup/models/ApplicationQuery';
import ArrayField, { BaseType } from './ArrayField';

import useEnumerationService from 'features/configuration/services/Enumeration';
import { Enum_EDITION_CATEGORY, IEnumerationItem } from 'features/configuration/models/Enumeration';

import { IFeatureParameter } from 'library/interface';
import { useQuery } from 'react-query';
import { IEdition, IEditionExtraction, IEditionExtractionReport, defaultEdition } from 'features/misc/models/Edition';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { isFalsy } from 'utility-types';

import { hubConnectionIdAtom } from 'library/store';
import { useRecoilState } from 'recoil';


export interface IQueryParameter {
    name: string,
    type: BaseType ,
    label: string,
    dataType: 'Base' | 'Enumeration' | 'Entity' | 'Period',
    value: any,
    dateValue: Date,
    isPeriod: boolean,


    parameterDataType: ParameterDataType;
    
    options?: {value: string, name: string}[],

    isRequired: boolean,
    enumerationCode?: string,
}

interface IDesktopPublishing {

    fileToken: string,


    editionCategory: string,

    editionId: number,
    editionName: string,

    queryPrepareParameters: IQueryParameter[],

    extractions: IDesktopPublishingExtraction[]
  }

const defaultDesktopPublishing : IDesktopPublishing = {
    fileToken: '',
    
    editionCategory: '',
    
    editionId: 0,
    editionName: '',

    queryPrepareParameters: [],
    
    extractions: []
}

interface IDesktopPublishingExtraction {
  businessApplicationQueryId: number,
  queryParameters: IQueryParameter[],
}

export function  BasicDesktopPublishingForm()  {
    

    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    //const [filterElements, setFilterElements] = filterElementsState;

    const [hubConnectionId, setHubConnectionId] = useRecoilState(hubConnectionIdAtom);
   
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {retrieveEntity, retrieveData, openEntityActionDrawer, openEntityPrintDrawer } = entityService();

    const {generateReport} = useEditionService();

    const {executeApplicationQuery ,getApplicationQueryParameters, generateApplicationQueryXlsx } = useApplicationQueryService();
    const {getEnumerationItemsByEnumerationCodes, getParameterEnumerationItemsByEdition, getAsOptions } = useEnumerationService();

    const methods = useForm<IDesktopPublishing>({defaultValues: defaultDesktopPublishing});

    const { register, setValue ,getValues, watch, reset ,handleSubmit ,control , formState: { errors } } = methods;
    let {fields: queryPrepareParameters} = useFieldArray<IDesktopPublishing,'queryPrepareParameters'>({
        control, 
        name: 'queryPrepareParameters'});
    
    const watchEditionId = watch('editionId');

    const {data: enumItems} = useQuery<IEnumerationItem[]>(
      ['EnumerationItems', 'DesktopPublishing'], () => getEnumerationItemsByEnumerationCodes( [Enum_EDITION_CATEGORY] ));

    // const {data: parameterEnumerationItems } = useQuery<IEnumerationItem[]>(['Edition','EnumerationItem', watchEditionId], () =>
    //   getParameterEnumerationItemsByEdition(watchEditionId), {refetchOnWindowFocus: false ,enabled: watchEditionId>0 }  );

    const [currentEdition, setCurrentEdition] = useState<IEdition>(defaultEdition);

    const [businessApplications, setBusinessApplications] = useState<IBusinessApplication[]>([]);
    
    const [openEditionFilter, setOpenEditionFilter] = useState(false);
    const basicFilterEdition = useBasicFilterEdition( 
      async (event: React.MouseEvent<unknown>, row: IEdition) => {
        
        const {id, name} = row;

        const edition = await retrieveEntity('Edition',id) as IEdition;        
        setCurrentEdition(edition);

        setIsPrepationSuccess( !(edition.queryEmptyId??0 > 0) );
                
        reset({...defaultDesktopPublishing, editionId: id, editionName: name,
          queryPrepareParameters: edition.queryPrepareParameters.map( qp => ({name: qp.parameterName,
            type: toBaseType(qp.parameterDataType), 
            label: isFalsy(qp.description)?qp.parameterName:qp.description,
            dataType: toDataType(qp),
            value: defaultValue(qp),
            isPeriod: !isFalsy(qp.isPeriod),

            parameterDataType: qp.parameterDataType,
            
            options: getAsOptions(qp.parameterEnumerationItems , qp.enumerationCode?? ''),
        
            isRequired: false,
            enumerationCode: qp.enumerationCode?? ''
          })),
          extractions: edition.editionExtractions.map( ex => ({
            businessApplicationQueryId: ex.businessApplicationQueryId,
            queryParameters: ex.applicationQueryParameters.map( qp => ({name: qp.parameterName,
              type: toBaseType(qp.parameterDataType), 
              label: isFalsy(qp.description)?qp.parameterName:qp.description,
              dataType: toDataType(qp),
              value: defaultValue(qp),
              isPeriod: !isFalsy(qp.isPeriod),

              parameterDataType: qp.parameterDataType,
              
              options: getAsOptions(qp.parameterEnumerationItems, qp.enumerationCode?? ''),
          
              isRequired: false,
              enumerationCode: qp.enumerationCode?? ''
              })
            )
          }) )});

        setOpenEditionFilter(false);        
      }
    );

    //   () => {
        
                
    //       // const {businessApplicationId} = getValues();
    //       // return businessApplicationId;
    //          return 0; 
    //   },
    //   async (event: React.MouseEvent<unknown>, row: IApplicationQuery) => {
    //     const {id, name } = row;
        
    //     // const { businessApplicationId, businessApplicationName } = getValues();

    //     // const parameters = await getApplicationQueryParameters(id);
                
    //     // reset({...defaultDataExport, businessApplicationId,businessApplicationName,
    //     //       businessApplicationQueryId: id, businessApplicationQueryName: name,

    //     //       queryParameters: parameters.map(qp => ({name: qp.parameterName,
    //     //         type: toBaseType(qp.parameterDataType),
    //     //         label: qp.parameterName,
    //     //         dataType: 'Base',
    //     //         parameterDataType: qp.parameterDataType,
    //     //         value: null}))
    //     //      });
                                
    //     // setOpenApplicationQueryFilter(false);
    //   }
    // );

    
    const [isPreparationSuccess, setIsPrepationSuccess] = useState<boolean>(false);

    const [editionExtractionIndex, setEditionExtractionIndex] = useState<number>(-1);
    const [openReports, setOpenReports] = useState<boolean>(false);
    const editionExtractionRowActionIcon = ( editionExtraction: IEditionExtraction) : ActionIconTableRow<IEdition,IEditionExtraction> => {  
      const res: ActionIconTableRow<IEdition,IEditionExtraction> = {
        toolTip: 'link',
        icon: MoreVertIcon,
        hasAction: (index: number,row: IEditionExtraction) => true, 
        isActionExecuting: true,
        onRowClickIcon: (event : any, index: number, row: IEditionExtraction) => {        
          
          setEditionExtractionIndex(index);
          setOpenReports(true);          
        }
      }
      return res;
    }

  const [headEditionExtractionCells, setHeadEditionExtractionCells]  = useState<HeadCell<IEditionExtraction>[]>([]);
  useEffect(() => {
    setHeadEditionExtractionCells([            
      {id:'description', label : t('Description'),  display: true, type: 'string', width: 100,},      
      
    ])
  }, [t,i18n]);

  
  const editionExtractionReportRowActionIcon = ( editionExtractionReport: IEditionExtractionReport) : ActionIconTableRow<IEdition,IEditionExtractionReport> => {  
    const res: ActionIconTableRow<IEdition,IEditionExtractionReport> = {
      toolTip: t('Print'),
      icon: PrintIcon,
      hasAction: (index: number,row: IEditionExtractionReport) => true, 
      isActionExecuting: true,
      onRowClickIcon: async (event : any, index: number, row: IEditionExtractionReport) => {        
        
        const {reportId} = row;
        const {extractions} = getValues();

        const extraction = extractions.at(editionExtractionIndex);
        if(isFalsy(extraction)) return;

        const {businessApplicationQueryId, queryParameters} = extraction!;

        const result = await  generateReport( {
          businessApplicationQueryId, 
          businessApplicationQueryParameterExecutions: queryParameters, 
          reportId, language: 'fr-FR',
          prepareQueryParameterExecutions: queryPrepareParameters
        });


        enqueueSnackbar( `${t('Report is processing')} !!!`, { variant: 'success',
        anchorOrigin : { horizontal: 'left', vertical: 'bottom' }, autoHideDuration : 500 });
                  
      }
    }
    return res;
  }

  const [language, setLanguage] = useState<string>('fr-FR');
  const [headEditionExtractionReportCells, setHeadEditionExtractionReportCells]  = useState<HeadCell<IEditionExtractionReport>[]>([]);
  useEffect(() => {
    setHeadEditionExtractionReportCells([            
      {id:'reportName', label : t('Name'),  display: true, type: 'string', width: 45, },
      {id:'reportDescription', label : t('Description'),  display: true, type: 'string', width: 55,  },     
      
    ])
  }, [t,i18n]);
  

  const handleClickSearchEdition = (event: any) => {      
      setOpenEditionFilter(true);
  }

  const handleClickExcelExport = async () => {

    const {extractions} = getValues();

    const extraction = extractions.at(editionExtractionIndex);
    if(isFalsy(extraction)) return;

    const {businessApplicationQueryId, queryParameters} = extraction!;
        
    const {fileToken, fileName} = await generateApplicationQueryXlsx( 
        { businessApplicationQueryId ,
          businessApplicationQueryParameterExecutions: queryParameters, hubConnectionId } );

    enqueueSnackbar( `${fileName} `, { variant: 'success',
        anchorOrigin : { horizontal: 'left', vertical: 'bottom' }, autoHideDuration : 500 });
  }

  const handleClickQueryPrepare = async () => {    
      const {queryPrepareParameters} = getValues();
      
      const prepareResult = await executeApplicationQuery( 
          { businessApplicationQueryId: currentEdition.queryPrepareId,
            businessApplicationQueryParameterExecutions: queryPrepareParameters } );

      setIsPrepationSuccess(prepareResult);
  
      enqueueSnackbar( prepareResult? t('_Operation_done') : t('Error while preparing data'), { variant: prepareResult? 'success' : 'error',
          anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : prepareResult? 500 : 1500 });              
  }

    // useEffect( () => {        
    //     async function loadBusinessApplications() {
    //       const arr = await getBusinessApplications( {name: '', dbmsType: ''} );         
    //       setBusinessApplications([...arr]);
    //     }
  
    //     loadBusinessApplications();
    //   }, []); 

        
    return ( 
    <>
        <FormProvider {...methods} > 
            <Grid container component="main" sx={{  width: '100%' }} alignItems="flex-start">
                <Grid item xs={12} sm={12} md={12} component={Paper} square>
                    <Stack flexDirection='column' sx={{ width: '100%' }} >                        
                        <Box sx={{ mt: 1, width: '100%' }} > 
                            <Controller name='editionCategory' control={control}                                     
                                    render={ ({field: {onChange, value}}) => (
                                      <TextField select onChange={onChange} value={value} sx={{width:'calc(100% - 8px)'}} id="editionCategory"
                                        label={t('Category')} inputProps={ {readOnly: false}} >
                                        {enumItems && enumItems.filter( e => e.enumerationCode === Enum_EDITION_CATEGORY).map( 
                                          (x,idx) => <MenuItem key={x.code} value={x.code}>{x.name}</MenuItem> )
                                        }
                                      </TextField>
                                    )}
                                />                            
                        </Box>
                        <Box sx={{ mt: 1, mb: 1, width: '100%', display: 'flex', justifyContent: 'center' }} >
                            <TextField sx={{width:'calc(100% - 8px)' }} id="editionName" label={t('Desktop publishing')} inputProps={ {readOnly: true}}
                                  {...register('editionName')} 
                                  InputProps={{
                                      readOnly: true,
                                      endAdornment: (
                                        <InputAdornment position="end">                                            
                                          <IconButton color="primary" onClick={handleClickSearchEdition}>
                                            <ArrowDropDownCircleIcon />
                                          </IconButton>                                                                                               
                                      </InputAdornment>
                                    )
                                  }}
                                />
                                { openEditionFilter && <FormDialog open={openEditionFilter} maxWidth='md'
                                    okText={t('OK')} cancelText='' title={t('Desktop publishing')} onCancel={()=> {}} 
                                    onClose={()=> {setOpenEditionFilter(false);}} onOk={()=> {setOpenEditionFilter(false);}}  >
                                    <BasicTextFilterForm<IEdition> {...basicFilterEdition} />
                                  </FormDialog>  }
                        </Box>
                        { (getValues().queryPrepareParameters.length > 0) &&
                          <>
                            <Box sx={{ mt: 2, width: '100%' }} > 
                              <Typography variant="h6" id="tableTitle" color="primary" noWrap 
                                    sx={{...typographyGroupBoxStyling}}>
                                {`${t(('Parameter'))}(s) - ${t('Preparation')} `}
                              </Typography>                                                       
                            </Box>
                            <Box sx={{ mt: 0.5, width: '100%' }} >                                            
                                <ArrayField<IQueryParameter> params={queryPrepareParameters} itemsPerRow={2} paramsName={'queryPrepareParameters'}
                                    valueKey='value' labelKey='label' dateValueKey='dateValue'   />
                            </Box>
                        </>}

                        { ( (currentEdition.queryPrepareId || 0) > 0) && <Box sx={{ mt: 1, width: '100%' }} > 
                              <Button>
                                <Typography  variant="h6" id="tableTitle" color="primary" noWrap sx={{...typographyGroupBoxStyling}}>
                                {t('Click to prepare data for extraction')}
                                </Typography>
                                <Box sx={{ ...justifyCenter, ml: 1 }}>                                
                                  <MdOutlineCheckCircle size={24} onClick={handleClickQueryPrepare}/>
                                </Box>                              
                              </Button>                                                                                 
                        </Box>} 
                        
                        {isPreparationSuccess && <Box sx={{ mt: 2, width: '100%' }} >
                          <EnhancedTable<IEditionExtraction> rows={currentEdition.editionExtractions} headCells={headEditionExtractionCells} 
                                title={t(`Queries: Extraction`)} objKey='id' 
                                stateSelected={undefined} 
                                onRowSelected={undefined} onRowDoubleClick={undefined} rowCheckedMode='single'
                                onRowCheckedSelectChange={undefined} order='desc' orderBy='id'
                                rowActionIcon={editionExtractionRowActionIcon}
                                toolbarActions={[
                                  // { toolTip: `${t('Add')}...`, onClickIcon: handleRefeshRequestDataDemand ,icon: RefreshOutlinedIcon,  },                      
                                ]}
                              />
                              { editionExtractionIndex >= 0 && editionExtractionIndex < currentEdition.editionExtractions.length  && openReports && 
                                  
                                  <FormDialog open={openReports} maxWidth='md'
                                    okText={t('OK')} cancelText='' title={`${t('Reports')} - ${currentEdition.editionExtractions[editionExtractionIndex].description}`} onCancel={()=> {}} 
                                    onClose={()=> {setOpenReports(false);}} onOk={()=> {setOpenReports(false);}}  >
                                    <Stack flexDirection='column' sx={{ pt:0.25, pb: 0.25 }}>
                                      <Box sx={{ mt: 2, width: '100%' }} > 
                                        <Typography variant="h6" id="tableTitle" color="primary" noWrap 
                                              sx={{...typographyGroupBoxStyling}}>
                                          {`${t(('Parameter'))}(s) - ${t('Extraction')} `}
                                        </Typography>                                                       
                                      </Box>
                                      <Box sx={{ mt: 2, width: '100%' }} >                                            
                                          <ArrayField<IQueryParameter> itemsPerRow={2} 
                                              params={getValues().extractions[editionExtractionIndex].queryParameters} 
                                              paramsName={`extractions.${editionExtractionIndex}.queryParameters`}
                                              valueKey='value' labelKey='label' dateValueKey='dateValue'   />
                                      </Box> 
                                      <Box sx={{...justifyCenter, mt: 1, width: '100%' }}>
                                        <Button onClick={handleClickExcelExport}>
                                            {'Excel'}
                                            <Box sx={{ ...justifyCenter, ml: 1 }}>
                                                <SiMicrosoftexcel size={24} />
                                            </Box>
                                        </Button>
                                      </Box>
                                      <Box sx={{ mt: 2, width: '100%' }} >
                                        <EnhancedTable<IEditionExtractionReport> rows={currentEdition.editionExtractions[editionExtractionIndex].editionExtractionReports} headCells={headEditionExtractionReportCells} 
                                            title={t(`Reports`)} objKey='id' 
                                            stateSelected={undefined} 
                                            onRowSelected={undefined} onRowDoubleClick={undefined} rowCheckedMode='single'
                                            onRowCheckedSelectChange={undefined} order='desc' orderBy='id'
                                            rowActionIcon={editionExtractionReportRowActionIcon}
                                            toolbarActions={[
                                              //{ toolTip: `${t('Add')}...`, onClickIcon: handleRefeshRequestDataDemand ,icon: RefreshOutlinedIcon,  },                      
                                            ]}
                                          />
                                      </Box>
                                    </Stack>
                                  </FormDialog>  }
                        </Box> }     
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


