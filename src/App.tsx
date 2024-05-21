import React, { useEffect, useState, Suspense } from 'react';

import { useTheme } from '@mui/material/styles';

import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import Box  from '@mui/material/Box';
import Container from '@mui/material/Container/Container';

import {  useRecoilValue, useRecoilState } from 'recoil';

// import frLocale from 'date-fns/locale/fr';
// import ruLocale from 'date-fns/locale/ru';
// import deLocale from 'date-fns/locale/de';
// import enLocale from 'date-fns/locale/en-US';

// import * as frLocale from 'date-fns/locale/fr';
// import * as ruLocale from 'date-fns/locale/ru';
// import * as deLocale from 'date-fns/locale/de';
// import * as enUSLocale from 'date-fns/locale/en-US';

//import { getUnixTime } from 'date-fns';

//import { Locale } from 'date-fns/locale';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { SystemMenu } from 'components/SystemMenu';
import { AppRoute } from 'components/Route';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';
//import { DateAdapter } from '@mui/x-date-pickers/adapter/DateFnsUtils';

import { EntityActionDrawer } from 'components/EntityActionDrawer';

import { currentUserSessionAtom, isActionDrawerOpenAtom, isAuthorizationBoxShowAtom, isDesktopPublishingBoxShowAtom, isExportBoxShowAtom, isPrintDrawerOpenAtom, isSearchBoxShowAtom } from 'library/store';
import { FilterBox } from 'components/FilterBox';
import { FilterFormDialog } from 'components/FilterFormDialog';
import { RequestNotification } from 'components/RequestNotification';
import { SessionTimeout } from 'components/SessionTimeout';
import { displayOnDesktop } from 'themes/commonStyles';
import { Typography } from '@mui/material';

import { QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ExportFormDialog } from 'components/ExportFormDialog';
import { DesktopPublishingFormDialog } from 'components/DesktopPublishingFormDialog';
import { AuthorizationFormDialog } from 'components/AuthorizationFormDialog';
import { EntityPrintDrawer } from 'components/EntityPrintDrawer';


//import { enUS, fr } from 'date-fns/locale';
import { enUS } from 'date-fns/locale/en-US';
import { fr } from 'date-fns/locale/fr';
import { HeaderTop } from 'components/HeaderTop';
import { HeaderMenu } from 'components/HeaderMenu';
import WhatsApp from 'features/setup/WhatsApp';

//import { Locale } from '@mui/x-date-pickers'; // Import the Locale type


// const getLocale = (lg: string) : Locale => {

//   if(lg.includes('fr'))
//     return fr;
//   else if(lg.includes('en'))
//     return enUS;

//   return fr as unknown as Locale;
// }

function App() {

  const {isAuthenticated, language } = useRecoilValue(currentUserSessionAtom);
  const [dateFnsLocale, setDateFnsLocale] = useState(fr); // Default to fr

  const boxProps = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: 100,
    //overflowY: isAuthenticated?'scroll':'hidden',
    overflowY: 'scroll',
    overflowX: 'hidden' 
  }

  useEffect(() => {
    console.log(language);
    if (language.includes('en')) {
      setDateFnsLocale(enUS);
    } else {
      setDateFnsLocale(fr);
    }


  }, [language]);
  // const [dateFnsLocale, setDateFnsLocale] = useState<Locale>(getLocale(language));
  // const adapterLocale: Locale = enUS;

  // useEffect( () =>{
    
  //   setDateFnsLocale(getLocale(language));
    
  // }, [language] );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={dateFnsLocale}>
        <CssBaseline />
        <RequestNotification />
        <Box sx={{  display: 'flex', flexDirection: 'column', height: '100vh', }} >
          <Box>
            <HeaderTop />          
          </Box>
          <Box>
          <HeaderMenu />            
          </Box>          
          <Box sx={ {...boxProps} } >
            <Container maxWidth="xl" disableGutters={true} sx={{ mb: 1 }}>
              <AppRoute />
              
              <WhatsApp  />
              <Box /*sx={displayOnDesktop}*/>
               <Footer /> 
              </Box>
            </Container>
          </Box>

          
          
        </Box>
      </LocalizationProvider>
    </>
  );
}

export default App;
