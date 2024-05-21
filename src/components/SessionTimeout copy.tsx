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

    const [events, setEvents] = useState<string[]>(['click','load','scroll','']);
    const [second, setSecond] = useState(0);

    
    const [isOpen, setOpen] = useState(false);

    let timeStamp;
    let unixTimeStamp : number;
    let warningInactiveInterval = useRef<NodeJS.Timer>();
    let startTimerInterval = useRef<NodeJS.Timeout>();

    console.log(intialUnixTimeStamp);


    // start inactive check
    let timeChecker = () => {
        
        startTimerInterval.current = setTimeout( () => {
            
            if(!isAuthenticated)
                return;

                //let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            //let storedUnixTimeStamp = sessionStorage.getItem('lastUnixTimeStamp');
            console.log(lastUnixTimeStamp);
            console.log(intialUnixTimeStamp);

            warningInactive(lastUnixTimeStamp? lastUnixTimeStamp : 0);
        }, 3000);
    }

    // warning timer
//let warningInactive = (timeString: string) => {
let warningInactive = (unixTime: number) => {

    //if(unixTime === 0) return;

    console.log(unixTime);
    clearTimeout(startTimerInterval.current);

    if(!isAuthenticated)
        return;

  
    warningInactiveInterval.current = setInterval(() => {

      if (!isAuthenticated) {
        console.log('Here !!!!!!');
        clearInterval(warningInactiveInterval.current);
        return;
      }

      // if( refNewAuthentication.current ) {
      //   console.log('new authentication !!!!');
      //   refNewAuthentication.current = false;
      //   setLastUnixTimeStamp( getUnixTime( (new Date())) );
      //   console.log(lastUnixTimeStamp);
      //   return;
      // }

      const maxTime = 2; // Maximum ideal time given before logout 
      const popTime = 1; // remaining time (notification) left to logout.
  
      //const diff = moment.duration(moment().diff(moment(timeString)));
      //const diff = getUnixTime( (new Date())) -  unixTime;

      console.log(lastUnixTimeStamp);
      console.log(intialUnixTimeStamp);

      const diff = getUnixTime( (new Date())) -  lastUnixTimeStamp;

      console.log(diff);
      console.log(getUnixTime( (new Date())) -  unixTime);
      console.log(getUnixTime( (new Date())) -  refUnixTimeStamp.current);

    //   const minPast = diff.minutes();
    //   const leftSecond = 60 - diff.seconds();

      const minPast = Math.floor( diff/ 60);
      const leftSecond = 60 - (diff%60);
  
      if (minPast === popTime) {

        console.log('open => '+ String(leftSecond));
        setSecond(leftSecond);
        
        setOpen(true);
      }
  
      if (minPast >= maxTime) {
        clearInterval(warningInactiveInterval.current);
        //sessionStorage.removeItem('lastTimeStamp');
        
        setOpen(false);
        //sessionStorage.removeItem('lastUnixTimeStamp');
        // your logout function here
        disconnectUser(currentUserSession); 
      }
    }, 2000);
  };

  // reset interval timer
  let resetTimer = useCallback(() => {
    
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);

    if (isAuthenticated) {
      //  unixTimeStamp = getUnixTime(new Date());
      //timeStamp = moment();
      //sessionStorage.setItem('lastTimeStamp', timeStamp);
      //sessionStorage.setItem('lastUnixTimeStamp', String(unixTimeStamp) );
      setLastUnixTimeStamp(getUnixTime(new Date()));
      refUnixTimeStamp.current = lastUnixTimeStamp;

      timeChecker(); // xxx ### ==> here because we want time to be enable only when user is authenticate.
    } else {
      clearInterval(warningInactiveInterval.current);
      clearTimeout(startTimerInterval.current);
      //sessionStorage.removeItem('lastTimeStamp');
      //sessionStorage.removeItem('lastUnixTimeStamp');
    }    

     // timeChecker(); //==> remove it here and add in xxx ###
    setOpen(false);
    
  }, [isAuthenticated]);

  // handle close popup
  const handleClose = () => {
    setOpen(false);

    resetTimer();
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    if(isAuthenticated) // Add this test just for be sure that timeChecker only call in case of authenticated user.
        timeChecker();

    return () => {
      clearTimeout(startTimerInterval.current);
      clearInterval(warningInactiveInterval.current);
      //   resetTimer();
    };
  }, [resetTimer, events, timeChecker]);


  
  useEffect(() => {
    refNewAuthentication.current = true;
  },[isAuthenticated]);

  // add this to be sure that reset timer will be call at least one time.
  useEffect(() => {
    resetTimer();
  },[]);

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
                  {`${t('The time remaining for auto logout is')} : ${second} ${t('second(s)')}` }
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
