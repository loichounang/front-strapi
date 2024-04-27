
import React, {FC, MouseEvent, useState, useRef, useEffect, ChangeEvent, MutableRefObject}  from 'react';
import {useParams} from 'react-router';
import { useNavigate } from 'react-router-dom';
import { SnackbarAction, SnackbarKey, useSnackbar } from 'notistack';

import { Controller, FieldArray, FieldArrayMethodProps, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation  } from 'react-i18next';

//import colorNameList from 'color-name-list';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import QueueIcon from '@mui/icons-material/Queue';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import BackpackIcon from '@mui/icons-material/Backpack';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { MdOutlineAdd } from 'react-icons/md';

//import { ChromePicker, ColorResult } from 'react-color';


//import entityService, { useBasicFilterEntity } from 'features/services/Entity';
import { currentBasicTextFilterPropsAtom, currentFormNameAtom, isSearchBoxShowAtom, isSaveLoadingAtom, currentUserSessionAtom } from 'library/store';
import useAppointmentService, { useBasicFilterAppointment } from './services/Appointment';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IEntity, IResult } from 'library/interface';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel, IconButton, InputAdornment, MenuItem, Tabs, Tab, Typography, Chip, Popover, useTheme } from '@mui/material';
//import NumberFormat from 'react-number-format';

import { IAppointment,  IService,  defaultAppointment } from './models/Appointment';


import TextFieldRight from 'components/ui/TextFieldRight';
import { FormDialog } from 'components/ui/FormDialog';
import { BasicTextFilterForm } from 'components/ui/BasicTextFilterForm';

//import useEnumerationService, { useBasicFilterEnumeration } from 'features/configuration/services/Enumeration';

//import useDeliveryService from 'features/configuration/services/Delivery';

import useUtils from 'library/utils';

import useMainInformation from 'features/setup/services/MainInformation';

// import IEnumeration, { Enum_LINE_OF_BUSINESS, Enum_SERVICE_TASK, Enum_FORMATION_BILLING_TYPE, Enum_ARTICLE_OPTION_CLASS, 
//       Enum_MAINTENANCE_CATEGORY_CLASS, Enum_CONTRACT_SCOPE_CLASS, Enum_PERSON_SERVICE ,IEnumerationItem, Enum_ARTICLE_WRAPPING } from 'features/configuration/models/Enumeration';

//import {ISharing} from 'features/setup/models/Sharing';
//import useSharingService, { useBasicFilterSharing } from 'features/setup/services/Sharing';

import { IExtension, IExtensionType, defaultExtension  } from 'features/configuration/models/ExtensionType';
//import useExtensionTypeService, { useBasicFilterExtensionType } from 'features/configuration/services/ExtensionType';

import { justifyCenter, typographyGroupBoxStyling, carouselImage } from 'themes/commonStyles';

import EntityExpression from 'components/ui/EntityExpression';
import { isFalsy } from 'utility-types';
import ArrayFieldTableEx, { ActionIconTableRow, HeadCell } from 'components/ui/ArrayFieldTableEx';
import { debounce, sum } from 'lodash';
import { GrClose, GrSearch } from 'react-icons/gr';
import EnhancedTable from 'components/ui/EnhancedTable';
import { ExtensionFormDialog } from 'components/ExtensionFormDialog';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
//import { IArticleStock } from 'features/configuration/models/Delivery';

import { globalConfig } from 'config';
import { addMinutes } from 'date-fns';

type ExtensionUsage = 'content-A' | 'content-U';

export const AppointmentForm: FC<IAppointment> = (props: IAppointment = defaultAppointment) => {


  const { getMainInformations, getServices } = useMainInformation();

  const {data: services} = useQuery<IService[]>( ['Service'], () => getServices());


  const navigate = useNavigate();
  const { t, i18n } = useTranslation();  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const theme = useTheme();

  const {id} = useParams();
  
  const [_id, _setId] = useState<number>( Number( id || 0 ) );


  //const { applicationSetup} = useRecoilValue(currentUserSessionAtom);

//   const {retrieveEntity, retrieveData, openEntityActionDrawer, 
//       checkEntityExpressionSyntax, checkEntitySaveAuthorization } = entityService();

  //const {getEnumerationItemsByEnumerationCodes, getAsOptions } = useEnumerationService();

  //const {getArticlePerStores } = useDeliveryService();

  const { createAppointment, updateAppointment } = useAppointmentService();

  const {range} = useUtils();

  const [currentFormName, setCurrentFormNameAtom] = useRecoilState(currentFormNameAtom);
  const [isSaveLoading, setIsSaveLoading] = useRecoilState(isSaveLoadingAtom);

  //const colors = colorNameList.filter(c => c.name.split(' ').length === 1 && c.name.length <= 5).map((color) => color);
  
  const [isSearchBoxShow, setIsSearchBoxShow] = useRecoilState(isSearchBoxShowAtom);
  const [currentBasicTextFilterProps, setCurrentBasicTextFilterProps] = useRecoilState(currentBasicTextFilterPropsAtom);
  const basicFilterAppointment = useBasicFilterAppointment( 
    (event: React.MouseEvent<unknown>, row: IAppointment) => {
        setIsSearchBoxShow(false);
        _setId(row.id);
      }
  );

  const emptyFunc = (obj: any) => {}

//   const [openEntityFilter, setOpenEntityFilter] = useState(false);
//   const basicFilterEntity = useBasicFilterEntity( 
//       (event: React.MouseEvent<unknown>, row: IEntity) => {
//           const {name, description} = row;

                                    
//           setOpenEntityFilter(false);
//       }
//   );

//   const [openEnumerationFilter, setOpenEnumerationFilter] = useState(false);
//   const basicFilterEnumeration = useBasicFilterEnumeration( 
//       (event: React.MouseEvent<unknown>, row: IEnumeration) => {
//           const {id, name, description} = row;

//           // setValue('enumerationId', id);
//           // setValue('enumerationName', name);
                           
//           setOpenEnumerationFilter(false);
//       }
//   );


  

  const methods = useForm<IAppointment>({defaultValues: {...defaultAppointment, }});

  const { register, setValue ,getValues, watch, reset ,handleSubmit ,control , formState: { errors } } = methods;

 

  const watchFirstName = watch('firstName');
  const watchLastName = watch('lastName');
  
//   const watchName = watch('name');    
//   const watchDescription = watch('description');    
//   const watchType = watch('type');    
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [color, setColor] = useState<string>('#000');

  // const watchParentAppointmentId = watch('parentAppointmentId');

  // let { fields, append: appendCoverages, update: updateCoverage ,remove: removeCoverage,  } = useFieldArray({//<O, TName>({ //<O,`billingDetails.${number}.billingDetailTasks`>({
  //   name: `productCoverages`,
  //   control,            
  // });
  

  const queryClient = useQueryClient();
  const {isLoading, isError, isSuccess ,error,mutate } = useMutation<IResult<IAppointment>,Error,IAppointment>(
      _id>0?updateAppointment:createAppointment, {   
        onSuccess: (data: IResult<IAppointment>) => {
          enqueueSnackbar( t('_Operation_done'), { variant: 'success',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1000 }); 
                   
          setIsSaveLoading(false);
          _setId(data.data.id);
          //setCurrentEntityIdForAction(data.data.id);
          setCurrentFormNameAtom(`${t('Appointment')} - # ${data.data.id} # ` );
          //queryClient.invalidateQueries(['Appointment',data.data.id]);
        },
        onError: (err: Error) => {          
          enqueueSnackbar( error?.message, { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
          setIsSaveLoading(false);
        }
      });

    // const {data: _data, refetch} = useQuery<IAppointment>(['Appointment', _id], () => retrieveEntity('Appointment',_id), 
    //   {refetchOnWindowFocus: false ,enabled: false } );

      // const {data: enumItems} = useQuery<IEnumerationItem[]>(
      //   ['EnumerationItems', 'Appointment'], () => 
      //     getEnumerationItemsByEnumerationCodes( [Enum_LINE_OF_BUSINESS, 
      //         Enum_SERVICE_TASK, Enum_FORMATION_BILLING_TYPE, Enum_ARTICLE_OPTION_CLASS, Enum_ARTICLE_WRAPPING,
      //         Enum_MAINTENANCE_CATEGORY_CLASS, Enum_CONTRACT_SCOPE_CLASS, Enum_PERSON_SERVICE ] ));
 
  
    
function openFileDialog() {
  (document as any).getElementById("file-upload").click();
}

const setFile = (_event: any) => {
  let f = _event.target.files![0];

  const fileSizeInKB = f.size / 1024;
  // Check if the file size is within your limit (e.g., 200 KB)
  if (fileSizeInKB > 200) {
    alert(t('File size should be less than 200 KB'));
    return;
  }

  var reader = new FileReader();

  reader.onload = function () {

      var binaryString = reader.result as string;
  
      const base64String = binaryString
                                  .replace('data:', '')
                                  .replace(/^.+,/, '');

    //   setValue("base64File", base64String);
    //   setValue("fileName", f.name);
    };

    reader.onerror = function () {
      console.log("File load failed");
    };    
    reader.readAsDataURL(f);    
};



    
    useEffect( () => {   
    
       reset({...getValues(), services: (services || []).map( x => ({...x, isSelected: false})) });      
    }, [services])

    // const [articleStocks, setArticleStocks] = useState<IArticleStock[]>([]);
    // useEffect( () => {
      
    //   async function _() {   
    //     if(_data && _data.type === 'article' && _data.id > 0) {         
    //       const stocks = await getArticlePerStores( 0, _id);
    //       setArticleStocks(stocks);
    //     }
    //   }
    //   _();  
    // }, [_data] );

      useEffect( () => {        
        setCurrentFormNameAtom(t('Appointment'));
        setCurrentBasicTextFilterProps(basicFilterAppointment);
      }, []);    
    
      /********** This use effect call retreive data wich will call refetch and _data will be updated. 
        and the new useEffect will take place ********************/
        // useEffect( () => {
        //     // setCurrentFormName(t('Billing'));        
        //     setCurrentFormNameAtom(_id>0?`${t('Appointment')} - # ${_id} # -`: t('Appointment') );
        //     if(_id > 0)
        //       retrieveData('Appointment',_id, refetch);  
        //   }, [_id] );
    
    
        // useEffect( () => {
            
        // if(_data && _data.id > 0) {
        //     reset(_data);
        // }
        // }, [_data]);
    
      const newData = async (event: MouseEvent<HTMLButtonElement>) => {    
        _setId(0);      
        reset({...defaultAppointment });    
      }
      
      const saveData = async (event: MouseEvent<HTMLButtonElement>) => {      
        // if(!checkEntitySaveAuthorization('Appointment', _id)) {
        //   setIsSaveLoading(false);
        //      return;
        // }          
  
        const data = getValues(); 

        // if( isFalsy(data.lineOfBusinessCode) || data.lineOfBusinessCode.trim() === '') {
        //   enqueueSnackbar( t('Line of business is not specified'), { variant: 'warning',
        //       anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1500 }); 
        //   setIsSaveLoading(false);
        //   return;
        // }

                
        if(data.firstName.trim() === '' || data.lastName.trim() === '') {
            enqueueSnackbar( t('Name is required'), { variant: 'warning',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1500 }); 
            setIsSaveLoading(false);
            return;
          }

          if(data.portable.trim() === '') {
            enqueueSnackbar( t('Portable is required'), { variant: 'warning',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1500 }); 
            setIsSaveLoading(false);
            return;
          }

          if( !data.services.some(x => x.isSelected) ) {
            enqueueSnackbar( t('There is no service selected'), { variant: 'warning',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1500 }); 
            setIsSaveLoading(false);
            return;
          }
    
        mutate({...data,
            token: globalConfig.get().shineToken,
            instanceId: globalConfig.get().shineInstanceId,

            portable1: data.portable,
            portable2: data.whatsAppNumber,
            email1: data.email,
            email2: '',
            notificationDate: new Date(),

            appointmentProducts: data.services.filter(x => x.isSelected).map( x => ({...x,
                
                appointmentId: 0,

                startTime: data.appointmentDate,
                endTime: addMinutes(data.appointmentDate, 60),

            }) )
         });
      }
    
      const actionData = async (event: MouseEvent<HTMLButtonElement>) => {
        //openEntityActionDrawer('Appointment', _id);
      }

    
      
    const afterAction = async (event: MouseEvent<HTMLButtonElement>) => {          
    //    queryClient.invalidateQueries(['RequestType',currentEntityIdForAction]);        
    //    await retreiveData(currentEntityNameForAction,currentEntityIdForAction, refetch);        
    //    reset(_data);        
    }

  return (
    <FormProvider {...methods} >
            <Box sx={{ mx: 0.1 }}>
                <Grid container rowSpacing={0.5} columnSpacing={0.1}>
                    <Grid item xs={12} component={Paper} sx={{ borderRadius: 2, ml: 0, }} >                        
                        <Stack flexDirection='column'  >
                          
                          <Box sx={{ mt: 1, width: '100%' }} >
                              <Button id='btnNew' onClick={newData} sx={ {display:'none'}}  />                                  
                              <Button id='btnSave' onClick={saveData} sx={ {display:'none'}}  />
                              <Button id='btnSaveAppointment' onClick={saveData} sx={ {display:'none'}}  />
                              <Button id='btnAction' onClick={actionData} sx={ {display:'none'}}  />                                                              
                              <Button id='btnAfterAction' onClick={afterAction} sx={ {display:'none'}}  />
                              
                              <Controller control={control}
                                    name='appointmentDate' 
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                      <DateTimePicker label={t('Date')} 
                                        onChange={onChange}                     
                                        value={value}
                                        renderInput={(props) => <TextField {...props} sx={{width:'calc(50% - 8px)'}} />}
                                      /> )}
                                  />                                            
                          </Box>   
                          <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                            <Typography variant="h6" sx={{...typographyGroupBoxStyling}}>
                            {t('Identification')}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 1, width: '100%' }} >
                              
                              
                              <TextField sx={{width:'calc(50% - 8px)'}} id="firstName" label={t('First name')} {...register('firstName')}
                                inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } autoFocus  />
                              <TextField sx={{width:'calc(50% - 8px)'}} id="lastName" label={t('Last name')} {...register('lastName')}
                                inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } autoFocus  />    
                                                                                
                          </Box>  
                          <Box sx={{ mt: 1, width: '100%' }} >
                              <TextField sx={{width:'calc(50% - 8px)'}} id="portable" label={t('Portable')} {...register('portable')}
                                inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } autoFocus  />
                              <TextField sx={{width:'calc(50% - 8px)'}} id="whatsAppNumber" label={t('WhatsApp')} {...register('whatsAppNumber')}
                                inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } autoFocus  /> 
                          </Box> 
                          <Box sx={{ mt: 1, width: '100%' }} >                      
                              <TextField sx={{width:'calc(100% - 8px)'}} id="email" label={t('Email')} {...register('email')}
                                inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } autoFocus  /> 
                          </Box>                            
                        </Stack>                        
                      </Grid>
                    <Grid item xs={12} component={Paper} sx={{ borderRadius: 2, ml: 0, }} >
                      <Stack flexDirection='column'>
                        <Box sx={{ mt: 1, width: '100%', display: 'flex'}}>
                            <Typography variant="h6" sx={{...typographyGroupBoxStyling}}>
                            {t('Services')}
                            </Typography>
                          </Box>
                      </Stack>
                    </Grid> 
                    {  range(0, ( getValues().services.length+1)/2).map( (ix) => {                                           
                        return (
                        <Grid item xs={12} sm={6} component={Paper} sx={{ borderRadius: 2, ml: 0, }} key={` box-ii- ${ix}`}> 
                            <Stack flexDirection='column' sx={{ mt: 0.25, width: '100%' }}>
                            {range(0, Math.min(2, getValues().services.length-2*ix) ).map( (iy) => { // Math.max(getValues().policyExtensions.length, 3*(ix+1))
                                const index = 2*ix + iy;
                                const service = getValues().services[index];                                
                                return (
                                    <Box sx={{ mt: 0.25, width: '100%', display: 'flex'}}>
                                        <FormControlLabel sx={{width:'calc(100% - 8px)'}}
                                            label={`${service.nom}`}
                                            control={
                                             <Controller
                                                name={`services.${index}.isSelected`}
                                                control={control}
                                                render={({field: {value, onChange,...props} }) => <Checkbox {...props} checked={value} onChange={onChange} />}                        
                                             />} />
                                    </Box> )
                                } )
                                }  
                            </Stack>                                                  
                        </Grid>)
                        }) }                                          
                </Grid>
            </Box>
        </FormProvider> 
  )
}

