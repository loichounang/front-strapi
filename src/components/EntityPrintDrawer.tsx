
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


import { isPrintDrawerOpenAtom,  currentEntityNameForActionDrawerAtom, currentEntityIdForActionDrawerAtom,
    currentUserSessionAtom, hubConnectionIdAtom,
    colorsAtom} from 'library/store';
import { globalConfig } from 'config';


import entityService from 'features/services/Entity';
import BasicButtonList from './ui/BasicButtonList';
import { defaultFeatureDescription, IFeatureDescription, IFeatureParameter, IReportDescription } from 'library/interface';
import { isFalsy } from 'utility-types';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { FormDialog } from './ui/FormDialog';
import { Box, Slide, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import ArrayField from './ui/ArrayField';

import { Watch, Triangle, RevolvingDot, Grid } from 'react-loader-spinner';


export const EntityPrintDrawer = () => {

    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [Colors, setColors] = useRecoilState(colorsAtom);

    const [currentUserSession, setCurrentUserSession] = useRecoilState(currentUserSessionAtom);
    const [hubConnectionId, setHubConnectionId] = useRecoilState(hubConnectionIdAtom);

    const entityName = useRecoilValue(currentEntityNameForActionDrawerAtom);
    const entityId = useRecoilValue(currentEntityIdForActionDrawerAtom);

    const [openActionParams, setOpenActionParams] = useState(false);
    const [isPrintDrawerOpen, setIsActionDrawerOpen] = useRecoilState(isPrintDrawerOpenAtom);

    const { getParametersByFeature, generateEntityReport, getReportsByEntityForUser} = entityService();

    const [entityReports, setEntityReports] = useState<IReportDescription[]>([]);

    const methodsEntityAction = useForm<IReportDescription>( {defaultValues:defaultFeatureDescription} );
    const { register, setValue ,getValues ,watch, reset ,control , formState: { errors } } = methodsEntityAction;

    //const [isDirectReport, setIsDirectReport] = useState<boolean>(false);
    // let {fields: actionParams} = useFieldArray<IReportDescription,'params'>({
    // control, 
    // name: 'params'});

    const {isLoading: isReportLoading, isError, isSuccess ,error,mutate: mutateEntity } = useMutation<{fileName: string, fileToken: string, isDirectReport: boolean, hubConnectionId: string},Error,IReportDescription>(
            generateEntityReport, {        
        onSuccess: (data: {fileName: string, fileToken: string, isDirectReport: boolean}) => {
          
          const {fileName, fileToken, isDirectReport} = data;
          if(isDirectReport) {
            
            setUrlPdf(`${globalConfig.get().apiUrl}/Download/${fileToken}/${fileName}`); 
            setOpenPdf(true);
          }
          else
            enqueueSnackbar( t('_Operation_done'), { variant: 'success',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1000 });  
        
        },
        onError: (err: Error) => {
          enqueueSnackbar( error?.message, { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
        }
      });
    
    const handleEntityReportClick = async (reportSelected: IReportDescription) => {        

        const { name: reportName, label: reportLabel, isDirectReport } = reportSelected;
        
        if(isFalsy(reportName)) {
            enqueueSnackbar( t('Invalid report'), { variant: 'error',
              anchorOrigin : { horizontal: 'left', vertical: 'bottom' }, autoHideDuration : 2000 });
            return;
          }

          mutateEntity( {...reportSelected, entityName, entityId, hubConnectionId} );
      }

      const [urlPdf, setUrlPdf] = useState<string>('');
      const [openPdf, setOpenPdf] = useState<boolean>(false);

    useEffect( () => { 
        
        async function loadEntityReports() {                     
                  
            const entity = currentUserSession.roleEntities.find( e => e.entityName === entityName);
            
            if(!entity || entity == null || !entity.printAllowed ) {
                setEntityReports([]);
                return;
            }

          const reports = await getReportsByEntityForUser(entityName,entityId);

          setEntityReports(reports.filter( a => true ) );
        }

        
        loadEntityReports();
      }, [entityName,entityId,isPrintDrawerOpen]);

  return (
        <Drawer open={isPrintDrawerOpen} anchor="right" variant="temporary" sx={ {top: 64} }>
            <ClickAwayListener onClickAway={() => setIsActionDrawerOpen(false)}>
                <div>
                    <BasicButtonList<IReportDescription> items={entityReports} icon={BoltIcon}
                    onItemClick={handleEntityReportClick} 
                    valueKey={'name'} displayKey={'label'} title={t('Report')} />   
                    { openPdf && <FormDialog open={openPdf} maxWidth='md'
                        okText='' cancelText='' title={t('Printing')} onCancel={()=> {setOpenPdf(false);}} 
                        onClose={()=> {setOpenPdf(false);}} onOk={()=> {setOpenPdf(false);}}  >
                        <Box sx={{ mt: 1, width: '100%', height: '100%' }} >
                            <iframe src={urlPdf} width="100%" height="100%" title='kkk'></iframe>
                        </Box>
                    </FormDialog> }
                    { isReportLoading && <Slide direction="down" in={isReportLoading} >
                        <Box sx={ {position: "absolute",
                            top: '40%',
                            left: '10%',
                            width: "80%",
                            height: "20%",
                            background: Colors.primary,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 99,
                            opacity: 0.70,}  }>
                                
                                <Grid
                                        color='#00BFFF'
                                        height={'100%'}
                                        //width={100}
                                        //timeout={3000} //3 secs
                                />        
                        </Box>
                      </Slide>
                    }
                    {/* { openActionParams && <FormDialog open={openActionParams} maxWidth='xs'
                        okText='Ok' cancelText='Cancel' title={t('Parameters')} onCancel={()=> {setOpenActionParams(false);}} 
                        onClose={()=> {setOpenActionParams(false);}} onOk={handleOkActionParams}  >
                        <Box sx={{ mt: 1, width: '100%' }} >
                            <FormProvider {...methodsEntityAction} >                
                                <ArrayField<IFeatureParameter> params={actionParams} itemsPerRow={1} paramsName={'params'}
                                    valueKey={'value'} labelKey={'label'}   /> 
                            </FormProvider>                
                        </Box>
                        </FormDialog> }                    */}
                </div>
            </ClickAwayListener>        
      </Drawer>
    
  )
}
