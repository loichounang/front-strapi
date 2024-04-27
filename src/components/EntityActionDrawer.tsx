
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useTranslation  } from 'react-i18next';
import { useSnackbar } from 'notistack';

import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import BoltIcon from '@mui/icons-material/Bolt';


import { isActionDrawerOpenAtom, currentEntityNameForActionDrawerAtom, 
    currentEntityIdForActionDrawerAtom, currentEntityContextualItemsForActionDrawerAtom,
    currentUserSessionAtom } from 'library/store';

import entityService from 'features/services/Entity';
import BasicButtonList from './ui/BasicButtonList';
import { defaultFeatureDescription, IFeatureDescription, IFeatureParameter } from 'library/interface';
import { isFalsy } from 'utility-types';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { FormDialog } from './ui/FormDialog';
import { Box } from '@mui/material';
import { useMutation } from 'react-query';
import ArrayField from './ui/ArrayField';

import  {arrayFieldFromName} from './ui/DynamicArrayField';


export const EntityActionDrawer = () => {

    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [currentUserSession, setCurrentUserSession] = useRecoilState(currentUserSessionAtom);

    const entityName = useRecoilValue(currentEntityNameForActionDrawerAtom);
    const entityId = useRecoilValue(currentEntityIdForActionDrawerAtom);

    const entityContextualItems = useRecoilValue(currentEntityContextualItemsForActionDrawerAtom);

    const [openActionParams, setOpenActionParams] = useState<boolean>(false);
    const [openActionComplexParams, setOpenActionComplexParams] = useState<boolean>(false);
    const [actionComplexName, setActionComplexName] = useState<string>('');

    const [isActionDrawerOpen, setIsActionDrawerOpen] = useRecoilState(isActionDrawerOpenAtom);

    const { getParametersByFeature, executeEntityFeature, getFeaturesByEntityForUser} = entityService();

    const [entityActions, setEntityActions] = useState<IFeatureDescription[]>([]);

    const methodsEntityAction = useForm<IFeatureDescription>( {defaultValues:defaultFeatureDescription} );
    const { register, setValue: setEntityActionValue ,getValues: getEntityActionValues ,watch, reset: resetEntityAction ,control , formState: { errors } } = methodsEntityAction;
    let {fields: actionParams} = useFieldArray<IFeatureDescription,'params'>({
    control, 
    name: 'params'});

    const {isLoading: isEntityLoading, isError, isSuccess ,error,mutate: mutateEntity } = useMutation<any,Error,IFeatureDescription>(executeEntityFeature, {        
        onSuccess: (data: any) => {
          enqueueSnackbar( t('_Operation_done'), { variant: 'success',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1000 });  
        
            const btn = document.getElementById(`btnAfterAction`);
            if(btn == null) {
            // enqueueSnackbar( 'bad action ...', { variant: 'error',
            //   anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
                return;
            }     
            btn?.click();     
       
        },
        onError: (err: Error) => {
          enqueueSnackbar( error?.message, { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
        }
      });
    
    const handleEntityActionClick = async (actionSelected: IFeatureDescription) => {
        if(actionSelected.type === 0) return;

        const { name: featureName, label: featureLabel } = actionSelected;

        if(isFalsy(featureName)) {
            enqueueSnackbar( t('Invalid feature'), { variant: 'error',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
            return;
          }

        const shortName = featureName.endsWith('Handler') ? featureName.substring(0, featureName.length - 7) : featureName;

        if( (actionSelected.inputType === 0) // this is for base feature input
            || (actionSelected.inputType === 1) // this is for complexe input 
            ){ 
            const parameters = await getParametersByFeature(entityName,featureName);
            
            resetEntityAction( {...defaultFeatureDescription, name: featureName, label: featureLabel,
                  entityName, entityId, entityContextualItems,
                  params: parameters.filter( p => p.name !== 'Id' && p.name != 'EntityContextualItems').map( p => ({...p }) )} );
            
            if(actionSelected.inputType === 0)
              setOpenActionParams(true);
            else if(actionSelected.inputType === 1) {
              
              setActionComplexName(shortName);

              setOpenActionComplexParams(true);
            }
        } else if(actionSelected.inputType === 2) {
          const btn = document.getElementById(`btnAction${shortName}`);
          if(btn == null) {
            enqueueSnackbar( 'bad action ...', { variant: 'error',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
            return;
          }
          btn?.click(); 
          
        } 
                   
          
          // const btn = document.getElementById(`btnAction${shortName}`);
          // if(btn == null) {
          //   enqueueSnackbar( 'bad action ...', { variant: 'error',
          //     anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
          //   return;
          // }

          // btn?.click(); 
          
        }   

    


    const handleOkActionParams = () => {   
        setOpenActionParams(false);
        
        const actionSelected = getEntityActionValues(); 
        mutateEntity( actionSelected );
    
        // if( currentObjectKey !== '@UnivList@' && currentObjectKey !== '')
        //   mutateEntity( {...actionSelected, objectDataDef:currentObjectDataDef, objectKey: currentObjectKey  } ); 
        // else
        //   mutateEntities( currentObjectsKey.map( (objKey,idx) => ({...actionSelected,objectDataDef:currentObjectDataDef, objectKey: objKey}) ) ); 
      }

    useEffect( () => { 
        
        async function loadEntityActions() { 
            
          const entity = currentUserSession.roleEntities.find( e => e.entityName === entityName);
          if(!entity || entity == null ) {
             setEntityActions([]);
             return;
          }
                   
          const actions = await getFeaturesByEntityForUser(entityName,entityId);

            setEntityActions(actions.filter( a => a.type !== 0 && 
                entity?.roleEntityFeatures.some( f => f.featureName === a.name) ) );
        }

        loadEntityActions();
      }, [entityName,entityId,isActionDrawerOpen]);

  return (
        <>          
          <Drawer open={isActionDrawerOpen} anchor="right" variant="temporary" sx={ {top: 64} }>
            <ClickAwayListener onClickAway={() => setIsActionDrawerOpen(false)}>
                <div>
                    <BasicButtonList<IFeatureDescription> items={entityActions} icon={BoltIcon}
                        onItemClick={handleEntityActionClick} 
                        valueKey={'name'} displayKey={'label'} title={t('Actions')} />
                    
                </div>
            </ClickAwayListener>        
          </Drawer>
          { openActionParams && <FormDialog open={openActionParams} 
                maxWidth={actionParams.length===0?'sm':'xs'} height={actionParams.length<=3?'45vh':'90vh'}
              okText='Ok' cancelText='Cancel' title={actionParams.length===0?t('Confirm this action'):t('Parameters')} 
                onCancel={()=> {setOpenActionParams(false);}} onClose={()=> {setOpenActionParams(false);}} onOk={handleOkActionParams}  >
              <Box sx={{ mt: 1, width: '100%' }} >
                  <FormProvider {...methodsEntityAction} >                
                      <ArrayField<IFeatureParameter> params={actionParams} itemsPerRow={1} paramsName={'params'}
                          valueKey='value' labelKey='label' dateValueKey='dateValue'   /> 
                  </FormProvider>                
              </Box>
              </FormDialog> }
            { openActionComplexParams && <FormDialog open={openActionComplexParams} maxWidth='md'
              okText='Ok' cancelText='Cancel' title={t('Parameters')} onCancel={()=> {setOpenActionComplexParams(false);}} 
              onClose={()=> {setOpenActionComplexParams(false);}} onOk={handleOkActionParams}  >
                <FormProvider {...methodsEntityAction} >
                  {arrayFieldFromName(actionComplexName, actionParams)}
                </FormProvider>
            </FormDialog> } 

        
      </>
    
  )
}
