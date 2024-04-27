import React, { useCallback, useEffect, useRef, useState } from 'react';

import { currentUserSessionAtom, currentUserSessionSetAuthentication, lastUnixTimeStampAtom} from 'library/store';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getUnixTime } from 'date-fns';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide, Typography, useMediaQuery, useTheme } from '@mui/material';
import {ThreeDots, Watch} from "react-loader-spinner";

import { useTranslation } from 'react-i18next';
import { flexCenter } from 'themes/commonStyles';
import { Colors } from 'themes/theme';
import { useLocalStorage } from 'react-use';


export const SessionTimeout = ( props: {intialUnixTimeStamp: number} ) => {

    const { t, i18n } = useTranslation();

    const {intialUnixTimeStamp} = props;
    
    const [ lastUnixTimeStamp, setLastUnixTimeStamp] = useRecoilState(lastUnixTimeStampAtom);
    const [currentUserSession, setCurrentUserSession] = useRecoilState(currentUserSessionAtom);
    const {isAuthenticated } = currentUserSession;
    const disconnectUser = useSetRecoilState(currentUserSessionSetAuthentication);

    const refNewAuthentication = useRef<boolean>(true);
    const refUnixTimeStamp = useRef<number>(intialUnixTimeStamp);

    const theme = useTheme();
    const isSm = useMediaQuery( theme.breakpoints.up('xs'));

    const [events, setEvents] = useState<string[]>(['click','load','scroll','keypress','mousedown']);
    const [second, setSecond] = useState(0);

    
    const [isOpen, setOpen] = useState(false);

    let timeStamp;
    let unixTimeStamp : number;
    let warningInactiveInterval = useRef<NodeJS.Timer>();
    let refLogoutTimer = useRef<NodeJS.Timeout>();
    let refLogoutWarningTimer = useRef<NodeJS.Timeout>();

    const resetTimer = () => {      
      
      console.log("resetTimer");
      //if (refLogoutTimer.current) clearTimeout(refLogoutTimer.current);
      if (refLogoutWarningTimer.current) clearTimeout(refLogoutWarningTimer.current);

      if (refLogoutTimer.current) clearTimeout(refLogoutTimer.current);

      setOpen(false);
    }

  // handle close popup
  const handleClose = () => {
    setOpen(false);

    resetTimer();
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, () => {
        //resetTimer();
        //handleLogoutTimer();

        
        if (refLogoutWarningTimer.current) clearTimeout(refLogoutWarningTimer.current);
        setOpen(false);
        handleLogoutWarningTimer();        
      })});

      // resetTimer();
      console.log(' handleLogoutWarningTimer + handleLogoutTimer');
      if (refLogoutWarningTimer.current) clearTimeout(refLogoutWarningTimer.current);
      handleLogoutWarningTimer();   
      //handleLogoutTimer();
       
    }, []);


  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutWarningTimer = () => {
    console.log(" handleLogoutWarningTimer ::: ");
    refLogoutWarningTimer.current = setTimeout(() => {
      // clears any pending timer.

      console.log(" handleLogoutWarningTimer ");
      //if (refLogoutWarningTimer.current) clearTimeout(refLogoutWarningTimer.current);
      // Listener clean up. Removes the existing event listener from the window
      // Object.values(events).forEach((item) => {
      //   window.removeEventListener(item, resetTimer);
      // });
  
      if (refLogoutTimer.current) clearTimeout(refLogoutTimer.current);
      handleLogoutTimer();
      setOpen(true);
    }, 9*60*1000); 
   
  };


    // this function sets the timer that logs out the user after 10 secs
const handleLogoutTimer = () => {
  console.log(" handleLogoutTimer ::: ");
  refLogoutTimer.current = setTimeout(() => {
    
    console.log(" handleLogoutTimer ");
    //if (refLogoutTimer.current) clearTimeout(refLogoutTimer.current);
    // Listener clean up. Removes the existing event listener from the window
    // Object.values(events).forEach((item) => {
    //   window.removeEventListener(item, resetTimer);
    // });

    setOpen(false);
    // logs out user
    disconnectUser(currentUserSession); 

    //if (refLogoutTimer.current) clearTimeout(refLogoutTimer.current);

  }, 1*60*1000); 
  
};


  if (!isOpen) {
    return null;
  }


  return (
    <Slide direction="down" in={isOpen} >
        <Box sx={ {position: "absolute",
            top: '40%',
            left: '25%',
            width: "50%",
            height: "20%",
            background: Colors.primary,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: 99,
            opacity: 0.70,}  }>
            <Typography
                  sx={{
                    color: 'white', // (theme) => theme.palette.text.primary,
                    fontWeight: 'bold',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                  }}
                >
                  {/* {`${t('The time remaining for auto logout is')} : ${second} ${t('second(s)')}` } */}
                  {`${t('You are going to be auto logout')} .... ` }
            </Typography>    
                <Watch
                        color='#00BFFF'
                        height={'100%'}
                        //width={100}
                        //timeout={3000} //3 secs
                />        
        </Box>        
    </Slide>
    // <Dialog open={isOpen} onClose={handleClose} PaperProps={{
        
    //   }}
    //       maxWidth={isSm?'sm':'sm'}
    //       fullWidth >
    //     <DialogTitle></DialogTitle>
    //     <DialogContent>
    //         <Box sx={flexCenter}>
    //             {`The time remaining for auto logout is : ${second} second(s)` }
    //         </Box>          
    //     </DialogContent>        
    //   </Dialog> 
  )
}
