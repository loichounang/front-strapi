import axios, { AxiosError } from "axios";


import { useSetRecoilState, useRecoilValue, } from 'recoil';

import {currentUserSessionSetAuthentication, currentUserSessionAtom} from './store';

import { globalConfig } from "config";
import { useTranslation } from "react-i18next";

import { useSnackbar } from 'notistack';
import { isFalsy } from "utility-types";


type ICustomAxiosError  = {
  response: { data : {data: any, detail: string, messages: string[], succeeded: boolean} }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const { enqueueSnackbar } = useSnackbar();

  const currentUserSession = useRecoilValue(currentUserSessionAtom);
  const {token, refreshToken, isAuthenticated} = currentUserSession;
  const disconnectUser = useSetRecoilState(currentUserSessionSetAuthentication);

  const { t, i18n } = useTranslation();

  //const {currentUser, disconnectUser, getToken, getRefreshToken, refreshUserToken} = useUserStore();

  const _axios = axios.create( {
    //baseURL : 'http://localhost/Welios',
    //baseURL : globalConfig.get().apiUrl,

    headers: {      
      'Content-Type':'application/json; charset=utf-8',
      //'Access-Control-Allow-Origin': 'application/json',
      //'Accepts': '*',
      'Accept-Language': i18n.language.includes('en') ? 'en-US' : 'fr-FR',
      'Authorization': isAuthenticated ? `Bearer ${token}` : ''
      }   
  });

  // axios.defaults.headers.get['Accepts'] = 'application/json'
  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  
  _axios.interceptors.response.use( response => response,
    async (error: AxiosError) => {
        
        const status = error.response ? error.response.status : null;
        // Reject promise if usual error
        if (status !== 401) {
            if( axios.isAxiosError(error) ) {
              const customError : ICustomAxiosError = error as unknown as ICustomAxiosError;
              
              if( customError.response && customError.response.data && customError.response.data.detail)
                enqueueSnackbar( customError.response.data.detail, { variant: 'error',
                    anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 2000 });
            }
            
            return new Promise((resolve, reject) => {
                reject(error);
              });
        }

        // Logout user if token refresh didn't work or user is disabled
        if ( !isFalsy(error.config) &&  error.config.url === '/security/user/refreshtoken' /*|| error?.response?.message === 'Account_is_disabled.'*/) {
      
            disconnectUser(currentUserSession);
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
      
      try {
        //const token_1 = await getNewToken(token, refreshToken, refreshUserToken, disconnectUser);
        const token_1 = await getNewToken(token, refreshToken, (accessToken: string) => {}, 
          () => {});
        // New request with new token
        const config = error.config;
        //config.headers['Authorization'] = `Bearer ${token}`;
        
        _axios.defaults.headers.common["Authorization"] = `Bearer ${token_1}`;
        return await new Promise((resolve_2, reject_2) => {
          axios.request(config!).then(response => {
            resolve_2(response);

          }).catch((error_1) => {
            reject_2(error_1);
          });
        });
      } catch (err) {
        Promise.reject(error);
      }       
    });

    return _axios;
  };

  const getNewToken = ( token: string, refreshToken: string, refreshUserToken: (accessToken: string) => void, disconnectUser: () => void ) => new Promise( (resolve, reject) => {
    
    axios.post(`${globalConfig.get().apiUrl}/security/user/refreshtoken`, {
        accessToken : token,
        refreshToken : refreshToken
    }, ).then( reponse => {    
      
        if(reponse.data === '') disconnectUser();

        refreshUserToken( reponse.data );
        resolve(reponse);
    })
    .catch( error => {
      
        reject(error);
    });
});