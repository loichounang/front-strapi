import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

//import "typeface-raleway";

import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { RecoilRoot} from 'recoil';

import axios from "axios";

// import MUI.
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import {ThreeDots} from "react-loader-spinner";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/';

///////////////////////////


import './library/i18n';

import {theme} from './themes/theme';
import { defaultConfig, globalConfig, globalConfigUrl} from './config';
import { ThemeProviderEx } from 'themes/ThemeContext';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      //staleTime: twentyFourHoursInMs,
    },
  },
});


const eWebsite: React.ReactElement =
                        <RecoilRoot>
                          <ThemeProviderEx>
                            <SnackbarProvider maxSnack={3}>
                              <Suspense fallback={<ThreeDots color='#00BFFF' />}>
                                <QueryClientProvider client={queryClient}>
                                  <BrowserRouter>
                                    <React.StrictMode>                                    
                                        
                                          <App />                                        
                                      
                                    </React.StrictMode>
                                  </BrowserRouter>                                  
                                  <ReactQueryDevtools initialIsOpen={false} />
                                </QueryClientProvider>
                              </Suspense>
                            </SnackbarProvider>
                          </ThemeProviderEx>
                        </RecoilRoot>;


axios.get(globalConfigUrl).then((response) => {
  globalConfig.set(response.data);
  //console.log("Global config fetched: ",response.data);
  //log.debug("Global config fetched: ", response.data);
  return eWebsite;
}).catch((e) => {
// In Codesandbox.io: deleting `config.json` will not trigger this branch, because the request response code will still be 200, not 404.
// To test this case in codesanbox.io, add "throw {};" to line 22.

// In development, treat this case as a warning, render the app and use default config values.
// In production (and test) on the other hand, show error instead of rendering the app.

// In Codesandbox.io: You cannot change the value of NODE_ENV. To test this if, change "development"
if (process.env.NODE_ENV === "development") {
// You cannot change the value of NODE_ENV. To test this if, change "development"
// log.warn(`Failed to load global configuration from '${globalConfigUrl}', using the default configuration instead:`,
//   defaultConfig
// );
globalConfig.set(defaultConfig);
return eWebsite;
} else {
const errorMessage = "Error while fetching global config, the App wil not be rendered. (This is NOT a React error.)";
//log.error(errorMessage, `Have you provided the config file '${globalConfigUrl}'?`, e );
return ( <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p> );
}
})
.then((reactElement: React.ReactElement) => {
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(reactElement);
//ReactDOM.render(reactElement, document.getElementById("root"));
});



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();