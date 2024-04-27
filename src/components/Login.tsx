import React, { useRef, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUnixTime } from 'date-fns';

//import ReCAPTCHA from 'react-google-recaptcha';


import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {LockOutlined} from '@mui/icons-material';

import {Language as LanguageIcon, TranslateOutlined as TranslateOutlinedIcon,  } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useTranslation  } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { ThreeDots } from 'react-loader-spinner';
import { IUserCredential, IUserSession } from 'features/identity/models/User';

import useIdentityUserService from 'features/identity/services/User';

import useAxios from 'library/axios';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { useLocalStorage } from 'react-use';
import { currentUserSessionAtom, hubConnectionIdAtom, colorsAtom, lastUnixTimeStampAtom } from 'library/store';
import md5 from 'md5';
import { IResult } from 'library/interface';

import useVisibilityToggle from 'library/useVisibilityToggle';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Colors } from 'themes/theme';

import { isFalsy } from 'utility-types';

import __axios from "axios";

import { IAppTheme, defaultAppTheme } from 'themes/commonStyles';


function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.univsoft.com/skrapi">
          
        </Link>{' '}
        {2023}
        {'.'}
      </Typography>
    );
  }

export const Login = () => {

    const axios = useAxios();

    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar(); 
    const navigate = useNavigate();

    const { isPasswordStrong } = useIdentityUserService();

  const { show: showPassword, toggleVisibility: togglePasswordVisibility } = useVisibilityToggle();

  const [hubConnectionId, setHubConnectionId] = useRecoilState(hubConnectionIdAtom);
  
  const [ storeCustomerID, setStoreCustomerID ,  removeStoreCustomerID]  = useLocalStorage('CustomerID');
  const [ storeLanguage, setStoreLanguage ,  removeStoreLanguage]  = useLocalStorage<string>('Language');
  
  const [ storeLogin, setStoreLogin, removeStoreLogin  ] = useLocalStorage<string>('Login');

  const [ storeTenant, setStoreTenant, removeStoreTenant] = useLocalStorage<string>('Tenant');

  const [ storeAppThemeBackground, setStoreAppThemeBackground, removeStoreAppThemeBackground] = useLocalStorage<string>(defaultAppTheme.background);
  const [ storeAppThemePrimary, setStoreAppThemePrimary, removeStoreAppThemePrimary] = useLocalStorage<string>(defaultAppTheme.primary);
  const [ storeAppThemeSecondary, setStoreAppThemeSecondary, removeStoreAppThemeSecondary] = useLocalStorage<string>(defaultAppTheme.secondary);

  const { register, getValues, setValue ,formState: { errors } } = useForm<IUserCredential>(
    {defaultValues: {language: isFalsy(storeLanguage)?'fr':storeLanguage, userName: isFalsy(storeLogin)?'': storeLogin, password: ''}});

  const [currentUserSession, setCurrentUserSession] = useRecoilState(currentUserSessionAtom);
  const [Colors, setColors] = useRecoilState(colorsAtom);
  
  // const setCurrentUser = useUserStore(state => state.setCurrentUser);

  const anchorRefLanguageButton = useRef(null);
  const [openLanguageMenu, setOpenLanguageMenu] = useState(false);

  const inputLogin = useRef();
  const inputPassword = useRef();

  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [bgIndex, setBgIndex] = useState<number>(1);
  //const {setCurrentUser} = useUserStore();

  const createVisitor = async (visiorInfo: any) => 
    await (await axios.post('/api/identity/token/add-visit', {...visiorInfo, appName: 'app' })).data;

  const postCredential = async (md5Credential: IUserCredential) => 
    await (await axios.post('/api/identity/token/get-token', {...md5Credential })).data;

  


  const {isLoading, isError, isSuccess ,error,mutate} = useMutation< IResult<IUserSession>,Error,IUserCredential>(postCredential,
     {
       retry:2,
       onSuccess: (data: IResult<IUserSession>) => {
        try {
          
          if(!data.succeeded) {
            enqueueSnackbar( data.messages.join( '\n'), { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 }); 
            return;
          }
          
          if(!data.data.isAuthenticated) {
            enqueueSnackbar( t('Invalid user credential'), { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 }); 
            return;
          }

          var shouldResetPassword = data.data.shouldResetPassword;

          if(!data.data.shouldResetPassword && data.data.displayPasswordExpirationWarning) {
            enqueueSnackbar( t('Your password is going to expire in few days, you have to change it.'), { variant: 'warning',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 4500 });
          }

          if(data.data.isPasswordComplexityAllowed && !isPasswordStrong(getValues().password) ) {
            enqueueSnackbar( t('You must change your password because the complexity is not respeted'), { variant: 'error',
                anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
            //data.data.shouldResetPassword
            shouldResetPassword = true;
          }
            
          
          // setCurrentUserSession({...data.data, shouldResetPassword });
          // if(!isFalsy(data.data.applicationSetup.applicationTheme)){
          //   setColors(data.data.applicationSetup.applicationTheme);
          //   setStoreAppThemeBackground(data.data.applicationSetup.applicationTheme.background);
          //   setStoreAppThemePrimary(data.data.applicationSetup.applicationTheme.primary);
          //   setStoreAppThemeSecondary(data.data.applicationSetup.applicationTheme.secondary);
          // }
          
          navigate('/home');  
          // const {isConnected} = data;
          // if(isConnected) 
          //   connectUser();

        } catch {

        }
       }
    });

  
    const handleChangeLanguage = (
      event: React.MouseEvent<HTMLElement>,
      newLanguage: string,
    ) => {
      //setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
      setOpenLanguageMenu(false);
      setStoreLanguage(newLanguage);
      setValue('language', newLanguage);
    };

    const onClickLanguageMenu = () => {
      setOpenLanguageMenu(true);  
    };
  
    const menuLanguageItemClick = (lg: string) => (event: any) =>{
      i18n.changeLanguage(lg);
      setOpenLanguageMenu(false);
      setStoreLanguage(lg);
      setValue('language', lg);

      // console.log(i18n);
      // console.log(i18n.getResource('fr','common','Signin'));
      //localStorage.setItem('lastLanguage', lg);
    }
  
    const closeLanguageMenu = () => {
      setOpenLanguageMenu(false);
    };


  const postLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    
    event.preventDefault();
    
    const  {userName, password, language } = getValues();
    const {hostname, host} = window.location;

    const tempTenant = window.location.search.replace('?','');
    //const tenantAlias =  host.split('.')[0];

    const tenantAlias = isFalsy(tempTenant) ? (storeTenant || '') : tempTenant;
    
    if(tenantAlias === '') {
      enqueueSnackbar( t('The url is invalid, you have to add ?xxxx at the of url'), { variant: 'error',
          anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });

      const tenant = 'xxxx';
      window.location.replace(`${host}?${tenant}`);
      return;
    }

    setStoreTenant(tenantAlias);

     mutate( { userName, password: md5(password), language, tenantAlias,  hubConnectionId } );

    //console.log(data);
    //event.preventDefault();
    //const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };


  useEffect( () => {
    const _ = async () => {

      setColors({...Colors, 
          background: storeAppThemeBackground || defaultAppTheme.background, 
          primary: storeAppThemePrimary || defaultAppTheme.primary, 
          secondary: storeAppThemeSecondary|| defaultAppTheme.secondary});
    }

    _();
  }, [] );

  const COUNT_BG_IMAGES = 3;
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex( Math.floor(Math.random()* COUNT_BG_IMAGES ) + 1 );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await __axios.get('https://api.ipify.org?format=json');
        const {ip} = response.data;

        const visitorInfo = await fetchCountry(ip);
        await createVisitor(visitorInfo);

      } catch (error) {
        console.log(error);
      }
    };

    const fetchCountry = async (ip: string) : Promise<any> => {
      try {
        const response = await __axios.get(`https://ipapi.co/${ip}/json`);
        const countryData = response.data;

        //console.log(countryData);
        return countryData;
        //setCountry(countryData);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    
    const createVisitorInfo = async () => {
      try {
        const response = await __axios.get(`http://ip-api.com/json/`);
        const visitorInfo = response.data;

        await createVisitor(visitorInfo);
        
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    const tempTenant = window.location.search.replace('?','');
    const tenantAlias = isFalsy(tempTenant) ? (storeTenant || '') : tempTenant;

    if(isFalsy(tenantAlias))
      fetchIPAddress();

    
  }, []);

  return (    
    <Grid container component="main" sx={{ height: '100vh', 
                    backgroundImage: `url(/images/${bgIndex}.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', }}
        >
        <Grid item xs={1} sm={4} md={4} lg={5}></Grid>
        
        <Grid item container xs={10} sm={5} md={4} lg={3} justifyContent="center" alignItems="center" >
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
              alignContent:'center', width: '100%',
              background: 'white', opacity: 0.9, borderRadius: 10 }} >
            <Box sx={{ mt: 1, width: '100%', px: 2  }} > 
              <ToggleButtonGroup size="small"
                color="primary"
                value={getValues().language}
                exclusive
                onChange={handleChangeLanguage}
                aria-label="Small sizes"
              >
                <ToggleButton value="fr">Francais</ToggleButton>
                <ToggleButton value="en">English</ToggleButton>                
              </ToggleButtonGroup>
            </Box>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t('Signin')}
            </Typography>
            <Box sx={{ mt: 1, width: '100%'}}>
              <TextField sx={{width:'calc(100% - 8px)'}} required  id="email" label={t('Login')} {...register('userName')} defaultValue={ (storeLogin || '') as string}
                inputRef={inputLogin} inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } autoFocus 
                InputProps={{
                  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                    if(event.key === 'Enter' && inputPassword.current)
                      (inputPassword.current as HTMLInputElement).focus();
                  },
                }}
              />
            </Box>
            <Box sx={{ mt: 1, width: '100%'}}>
              <TextField sx={{width:'calc(100% - 8px)'}} required label={t('Password')} {...register('password')}
                type="password" id="password" autoComplete="current-password" inputRef={inputPassword}
                inputProps={ { style: {textTransform: 'none'} } }
                InputProps={{
                  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                    if(event.key === 'Enter') {
                      const btnPostLogin = document.getElementById(`btnPostLogin`);
                      // if(btnPostLogin !== null)
                      //   btnPostLogin?.click();                        
                    }
                      //postLogin( new MouseEvent<HTMLButtonElement,MouseEvent>('button') );
                  },
                }} />
             </Box> 
             <Box sx={{ mt: 1, width: '100%', p:2}}> 
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, pl: 2, pr: 2 }} onClick={postLogin} id="btnPostLogin">
                {isLoading ? <ThreeDots
                        color='#00BFFF'
                        height={'100%'}
                        //width={100}
                        //timeout={3000} //3 secs
                      /> : t('Signin')}
              </Button>
              </Box>
              <Box sx={{ mt: 1, width: '100%'}}> 
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                   
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {isError? "Error" : ""}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1} sm={3} md={4} lg={4}></Grid>
      </Grid>
  )
}
