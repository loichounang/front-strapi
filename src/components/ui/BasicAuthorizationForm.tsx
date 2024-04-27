import { useNavigate } from 'react-router-dom';
import React, {FC, PropsWithChildren, useRef, useState, useEffect, MutableRefObject, MouseEvent} from 'react';

// import library.
import { useFieldArray, useForm, useFormContext, FieldArray, Controller, FormProvider, FieldArrayMethodProps, FieldArrayWithId, ArrayPath } from 'react-hook-form';
import { useTranslation  } from 'react-i18next';

import { useSnackbar } from 'notistack';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import NumberFormat from 'react-number-format';
// mui ...
import {Avatar, Button, Grid, Typography, Link, Box, Paper, TextField, 
    MenuItem, IconButton, Checkbox, FormControlLabel, Stack } from '@mui/material';

    import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { ThreeDots, ThreeCircles  } from 'react-loader-spinner';


import entityService  from 'features/services/Entity';

import { FaSearch } from 'react-icons/fa';
import {SiMicrosoftexcel} from 'react-icons/si';

import { pink } from '@mui/material/colors';

import { flexBetweenCenter, fullWidthFlex, justifyCenter } from 'themes/commonStyles';

import { FormDialog } from 'components/ui/FormDialog';
import { BasicTextFilterForm } from 'components/ui/BasicTextFilterForm';

import { isActionDrawerOpenAtom,  currentEntityNameForActionDrawerAtom, currentEntityIdForActionDrawerAtom,
  currentUserSessionAtom } from 'library/store';

import useEnumerationService from 'features/configuration/services/Enumeration';
import useApplicationQueryService, { useBasicFilterApplicationQuery } from 'features/setup/services/ApplicationQuery';

import useAuthorizationService from 'components/services/Authorization';

// import { IBusinessApplication, IBusinessApplicationQuery, 
//     IBusinessApplicationQueryParameter, ParameterDataType, toBaseType, toDataType, defaultValue } from 'features/setup/models/BusinessApplication';

import { IFeatureParameter, IResult } from 'library/interface';
import { isFalsy } from 'utility-types';
import { IEntityAuthorization, IAuthorization, IAuthorizationItem, defaultEntityAuthorization } from 'components/models/Authorization';

import ArrayFieldTableEx, {ActionIconTableRow, HeadCell } from 'components/ui/ArrayFieldTableEx';
import { IGroup } from 'features/security/models/Group';
import { useBasicFilterGroup } from 'features/security/services/Group';
import { useBasicFilterEntityAuthorization } from 'components/services/Authorization';
import { useMutation, useQueryClient } from 'react-query';

export function  BasicAuthorizationForm()  {
    

    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    //const [filterElements, setFilterElements] = filterElementsState;

    const [currentUserSession, setCurrentUserSession] = useRecoilState(currentUserSessionAtom);

    const entityName = useRecoilValue(currentEntityNameForActionDrawerAtom);
    const entityId = useRecoilValue(currentEntityIdForActionDrawerAtom);

   
    const emptyFunc = (obj: any) => {}
    //const [isLoading, setIsLoading] = useState<boolean>(false);

    //const {getBusinessApplications, getBusinessApplicationQueryParameters, generateBusinessApplicationQueryXlsx } = useBusinessApplicationService();
    const {getAsOptions } = useEnumerationService();

    const {updateEntityAuthorization, getEntityAuthorizations} = useAuthorizationService();

    const {retrieveEntity} = entityService();

    const methods = useForm<IEntityAuthorization>({defaultValues: defaultEntityAuthorization});

    const { register, setValue ,getValues, watch, reset ,handleSubmit ,control , formState: { errors } } = methods;
    // let {fields: queryParameters} = useFieldArray<IDataExport,'queryParameters'>({
    //     control, 
    //     name: 'queryParameters'});


    const queryClient = useQueryClient();
    const {isLoading, isError, isSuccess ,error,mutate } = useMutation<IResult<boolean>,Error,IEntityAuthorization>(
        updateEntityAuthorization, {   
            onSuccess: (data: IResult<boolean>) => {
            enqueueSnackbar( 'Operation done !!!', { variant: 'success',
                    anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1000 }); 
                    
            //reset(data.data);
            //_setId(data.data.id);
            //setCurrentEntityIdForAction(data.data.id);
            
            queryClient.invalidateQueries(['EntityAuthorization',0 /*data.data.id*/]);
            },
            onError: (err: Error) => {          
            // enqueueSnackbar( error?.message, { variant: 'error',
            //         anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
            }
        });

    const [openGroupFilter, setOpenGroupFilter] = useState(false);
    const basicFilterGroup = useBasicFilterGroup( 
        (event: React.MouseEvent<unknown>, row: IGroup) => {
            const {id, name, description} = row;

            if(getValues().authorizations.some( b => b.groupId === id)) return;
                       
            const ix = getValues().authorizations.length;
            (refAppendAuthorizations.current??emptyFunc)({ groupId: id, entityName, entityId, 
                    groupName: name, groupDescription: description }); 
            setAuthorizationIndex(ix);

            setOpenGroupFilter(false);
        }
    );

    const [openEntityAuthorizationFilter, setOpenEntityAuthorizationFilter] = useState(false);
    const basicFilterEntityAuthorization = useBasicFilterEntityAuthorization( 
      () => {
        return entityName;
      },
      async (event: React.MouseEvent<unknown>, row: {value: string, name: string}) => {

        const {value, name } = row;

        const authorization = getValues().authorizations.at(authorizationIndex);
        if(isFalsy(authorization)) return;

        if(authorization!.authorizationItems.some( a => a.authorizationType === value)) return;

        (refAppendAuthorizationItems.current??emptyFunc)({ authorizationId: 0,  
          authorizationType: value, authorizationDescription: name, isAllowed: true, isDeny: false }); 
                
        setOpenEntityAuthorizationFilter(false);
      }
    );

    const handleAuthorizationSelected = (event: React.MouseEvent<unknown>,index: number,row: IAuthorization) => {      
      setAuthorizationIndex(index);
  }

    const refAppendAuthorizations = useRef<(value: Partial<FieldArray<IEntityAuthorization>> | Partial<FieldArray<IEntityAuthorization>>[], options?: FieldArrayMethodProps) => void>(null);
    const refUpdateAuthorization = useRef<(index: number,value: Partial<FieldArray<IEntityAuthorization>> ) => void>(null);
    const refRemoveAuthorization = useRef<(index: number ) => void>(null);

    const authorizationRowActionIcon = ( editionExtraction: IAuthorization) : ActionIconTableRow<IEntityAuthorization,IAuthorization> => {  
      const res: ActionIconTableRow<IEntityAuthorization,IAuthorization> = {
        toolTip: 'link',
        icon: RemoveCircleIcon,
        hasAction: (index: number,row: IAuthorization) => true, 
        isActionExecuting: true,
        onRowClickIcon: (event : any, index: number, row: IAuthorization) => {        
          
          (refRemoveAuthorization.current??emptyFunc)(index); 
        }
      }
      return res;
    }

    const [authorizationIndex, setAuthorizationIndex] = useState<number>(-1);

    const [headAuthorizationCells, setHeadAuthorizationCells]  = useState<HeadCell<IAuthorization>[]>([]);
    useEffect(() => {
      setHeadAuthorizationCells([            
        {id:'groupName', label : t('Name'),  display: true, type: 'string', width: 45,},
        {id:'groupDescription', label : t('Description'),  display: true, type: 'string', width: 55, },
        
      ])
    }, [t,i18n]);


    const handleAuthorizationItemSelected = (event: React.MouseEvent<unknown>,index: number,row: IAuthorizationItem) => {      
      setAuthorizationItemIndex(index);
    }
    const refAppendAuthorizationItems = useRef<(value: Partial<FieldArray<IEntityAuthorization>> | Partial<FieldArray<IEntityAuthorization>>[], options?: FieldArrayMethodProps) => void>(null);
    const refUpdateAuthorizationItem = useRef<(index: number,value: Partial<FieldArray<IEntityAuthorization>> ) => void>(null);
    const refRemoveAuthorizationItem = useRef<(index: number ) => void>(null);

    const cellEditableAuthorizationItem = (row: IAuthorizationItem, cellId: keyof IAuthorizationItem) => {
      return true;
    }

    const [authorizationItemIndex, setAuthorizationItemIndex] = useState<number>(-1);
    const [headAuthorizationItemCells, setHeadAuthorizationItemCells]  = useState<HeadCell<IAuthorizationItem>[]>([]);
    useEffect(() => {
      setHeadAuthorizationItemCells([            
        {id:'authorizationDescription', label : t('Description'),  display: true, type: 'string', width: 65,},
        {id:'isAllowed', label : t('Allowed ?'),  display: true, type: 'boolean', width: 35,isEditable : cellEditableAuthorizationItem },
        //{id:'isDeny', label : t('Deny ?'),  display: true, type: 'boolean', width: 25,isEditable : cellEditableAuthorizationItem },
      ])
    }, [t,i18n]);


    useEffect(() => {

      const subscription = watch( (value, { name, type }) => {
       
        if(name?.includes('isAllowed') || name?.includes('isDeny') ) {

          const sp = name.split('.');
          const itemIndex = Number(sp[1]);   
          
          console.log(sp);
          console.log(itemIndex);
          
          //if(billingDetailIndex < 0 || billingDetailIndex >= getValues().billingDetails.length) return;      
          const authorization = getValues().authorizations.at(authorizationIndex);
          if( isFalsy(authorization) ) return;

          const authorizationItem = authorization.authorizationItems.at(itemIndex);
            if( isFalsy(authorizationItem) ) return;

            const {isAllowed, isDeny} = authorizationItem;

          if( name?.includes('isAllowed') )         
            (refUpdateAuthorizationItem.current??emptyFunc)(itemIndex, 
              {...authorizationItem, isDeny: !isAllowed}); 
          else if( name?.includes('isDeny') ) 
            (refUpdateAuthorizationItem.current??emptyFunc)(itemIndex, 
              {...authorizationItem, isAllowed: !isDeny})
          
        }    
      });  
    
      return () => subscription.unsubscribe();
    }, [watch, authorizationIndex, authorizationItemIndex]);


    const handleAddGroups = (event: any) => {
      setOpenGroupFilter(true);
    }

    const handleOkFilterGroup = () => {
        setOpenGroupFilter(false);
    }

    const handleAddAuthorizationItems = (event: any) => {
      setOpenEntityAuthorizationFilter(true);
    }
    

    

    const handleClickExcelExport = async () => {    
        // const {queryParameters} = getValues();
        
        // const {fileToken, fileName} = await generateBusinessApplicationQueryXlsx( 
        //     {...getValues(),businessApplicationQueryParameterExecutions: queryParameters } );
    
        // enqueueSnackbar( `${fileName} `, { variant: 'success',
        //     anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 500 });
                
    }

    useEffect( () => {        
        async function _() {
          const arr = await getEntityAuthorizations(entityName, entityId);                                
          reset({...defaultEntityAuthorization, 
              entityName, entityId,
              authorizations: arr});

          if(arr && arr.length > 0)
            setAuthorizationIndex(0);
        }
  
        _();
      }, []); 


      const saveData = async (event: MouseEvent<HTMLButtonElement>) => {        
        const data = getValues(); 

        mutate(data);
    }

        
    return ( 
    <>
        <FormProvider {...methods} > 
            <Grid container component="main" sx={{  width: '100%' }} alignItems="flex-start">
                <Grid item xs={12} sm={12} md={12} component={Paper} square>
                    <Stack flexDirection='column' sx={{ width: '100%' }} >                        
                        <Box sx={{ mt: 1, width: '100%' }} > 
                          <Button id='btnSaveAuth' onClick={saveData} sx={ {display:'none'}}  />
                          {/* <TextField sx={{width:'calc(100% - 8px)'}} id="name" label={''} {...register('entityHeaderInfo')}
                              inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } />                               */}
                        </Box>                        
                        <Box sx={{ mt: 2, width: '100%' }} >                                            
                          <ArrayFieldTableEx<IEntityAuthorization,IAuthorization,'id'> 
                              key={`Authorization -`}
                              mainObject={getValues()} fieldKey='id' 
                              headCells={headAuthorizationCells} rowsPathName='authorizations' 
                              title={t(`Groups`)} rowActionIcon={authorizationRowActionIcon}  
                              onRowSelected={handleAuthorizationSelected}
                                                  
                              refAppend={refAppendAuthorizations as MutableRefObject<(value: Partial<FieldArray<IEntityAuthorization>> | Partial<FieldArray<IEntityAuthorization>>[], options?: FieldArrayMethodProps) => void>}
                              refUpdate={refUpdateAuthorization as MutableRefObject<(index: number,value: Partial<FieldArray<IEntityAuthorization>>) => void>}
                              refRemove={refRemoveAuthorization as MutableRefObject<(index: number) => void>}

                              //stateSelected={[selectedRequestDataItems, setSelectedRequestDataItems]}
                              
                              toolbarActions={[
                                  { toolTip: `${t('Add')}...`, onClickIcon: handleAddGroups ,icon: AddCircleIcon, },  
                                                        
                              ]}
                          />   
                          { openGroupFilter && <FormDialog open={openGroupFilter} maxWidth='md'
                                    okText={t('OK')} cancelText='' title={t('Group filter')} onCancel={()=> {}} 
                                    onClose={()=> {setOpenGroupFilter(false);}} onOk={handleOkFilterGroup}  >
                                        <BasicTextFilterForm<IGroup> {...basicFilterGroup } />
                                </FormDialog> } 
                        </Box>    
                        <Box sx={{ mt: 2, width: '100%' }} >                                            
                          { authorizationIndex >= 0 && <ArrayFieldTableEx<IEntityAuthorization,IAuthorizationItem,'id'> 
                              key={`Authorization -`}
                              mainObject={getValues()} fieldKey='authorizationType' 
                              headCells={headAuthorizationItemCells} rowsPathName={`authorizations.${authorizationIndex}.authorizationItems`}
                              title={t(`Authorizations`)} //rowActionIcon={authorizationRowActionIcon}  
                              onRowSelected={handleAuthorizationItemSelected}
                                                  
                              refAppend={refAppendAuthorizationItems as MutableRefObject<(value: Partial<FieldArray<IEntityAuthorization>> | Partial<FieldArray<IEntityAuthorization>>[], options?: FieldArrayMethodProps) => void>}
                              refUpdate={refUpdateAuthorizationItem as MutableRefObject<(index: number,value: Partial<FieldArray<IEntityAuthorization>>) => void>}
                              refRemove={refRemoveAuthorizationItem as MutableRefObject<(index: number) => void>}

                              //stateSelected={[selectedRequestDataItems, setSelectedRequestDataItems]}
                              
                              toolbarActions={[
                                { toolTip: `${t('Add')}...`, onClickIcon: handleAddAuthorizationItems ,icon: AddCircleIcon, },                                                         
                              ]}
                          />
                           }
                           { openEntityAuthorizationFilter && <FormDialog open={openEntityAuthorizationFilter} maxWidth='sm'
                                    okText={t('OK')} cancelText='' title={t('Authorization filter')} onCancel={()=> {}} 
                                    onClose={()=> {setOpenEntityAuthorizationFilter(false);}} onOk={handleOkFilterGroup}  >
                                        <BasicTextFilterForm<{name: string, value: string}> {...basicFilterEntityAuthorization } />
                                </FormDialog> } 
                        </Box>   
                    </Stack>  
                </Grid>                
            </Grid>
        </FormProvider> 
    </>
    ); 
}


