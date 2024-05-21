import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import md5 from 'md5';
import { useSnackbar } from 'notistack';
import React, { FC , MouseEvent, useEffect} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { currentFormNameAtom, currentUserSessionAtom } from 'library/store';

import { IPasswordChange, defaultPasswordChange } from './models/User';

import useIdentityUserService from './services/User';
import { useRecoilState, useRecoilValue } from 'recoil';

export const PasswordChangeForm : FC<IPasswordChange> = props => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const {language, userName} = useRecoilValue(currentUserSessionAtom);

  const [currentFormName, setCurrentFormNameAtom] = useRecoilState(currentFormNameAtom);

  const {changePassword} = useIdentityUserService();

  const methods = useForm<IPasswordChange>({defaultValues: {...defaultPasswordChange, userName} });
  const { register, setValue ,getValues, watch, reset ,handleSubmit ,control , formState: { errors } } = methods;

  const queryClient = useQueryClient();
  const {isLoading, isError, isSuccess ,error,mutate } = useMutation<IPasswordChange,Error,IPasswordChange>(changePassword, 
    {        
      onSuccess: (data: IPasswordChange) => {
        enqueueSnackbar( t('_Operation_done'), { variant: 'success',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1000 }); 
          
        // reset(data);
        // queryClient.invalidateQueries(['BankPolicy',data.policyID]);
      },
      onError: (err: Error) => {        
        enqueueSnackbar( error?.message, { variant: 'error',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
      }
    });

    useEffect( () => {        
      setCurrentFormNameAtom(t('Change password'));
      
    }, []);     

  const saveData = async (event: MouseEvent<HTMLButtonElement>) => {        
    const data = getValues(); 
    if(data.userName.trim() === '') {
        enqueueSnackbar( t('Name or description is not specified'), { variant: 'warning',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1500 }); 
        return;
      }
  
    if(data.newPassword !== data.confirmNewPassword) {
        enqueueSnackbar( t('Password and confirmation are not the same'), { variant: 'error',
          anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
        return;
    }

    mutate({...data,password: md5(data.password), newPassword: md5(data.newPassword), confirmNewPassword: md5(data.newPassword) });
}

  return (
    <FormProvider {...methods} >
      <Box sx={{ mx: 0.1 }}>
          <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}  sm={6} md={4} component={Paper}  >                        
                  <Stack flexDirection='column' padding={0} >
                      <Box sx={{ mt: 1, width: '100%' }} >
                                                          
                          <Button id='btnSave' onClick={saveData} sx={ {display:'none'}}  />
                          
                          <TextField  sx={{width:'calc(100% - 8px)'}} id="userName" label={t('User name')} {...register('userName')} disabled
                            inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }  /> 
                      </Box>
                      <Box sx={{ mt: 1, width: '100%' }} >                                       
                        <TextField  sx={{width:'calc(100% - 8px)'}} type="password"  id="password" label={t('Current Password')} {...register('password')}
                          inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }  />     
                      </Box>
                      <Box sx={{ mt: 1, width: '100%' }} >                                       
                        <TextField  sx={{width:'calc(100% - 8px)'}} type="password"  id="newPassword" label={t('New Password')} {...register('newPassword')}
                          inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }  />     
                      </Box>
                      <Box sx={{ mt: 1, width: '100%' }} >                                       
                        <TextField  sx={{width:'calc(100% - 8px)'}} type="password" id="confirmNewPassword" label={t('Confirm Password')} {...register('confirmNewPassword')}
                          inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } }   />     
                      </Box>
                  </Stack>                        
              </Grid>
              
              
          </Grid>
      </Box>
    </FormProvider> 
  )
}

