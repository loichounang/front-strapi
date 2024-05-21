import React, {FC, PropsWithChildren, useState, MouseEvent} from 'react';


// mui ...
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Breakpoint, useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { currentUserSessionAtom } from 'library/store';


export interface FormDialogProps  {
    open: boolean;
    title : string;    

    okText: string;
    cancelText: string;

    fullWidth? : boolean;
    maxWidth?: Breakpoint;

    height?: string,


    onCancel: () => void;
    onOk: (event : MouseEvent<HTMLButtonElement>) => void;
    onClose: () => void;
} 

 

type ActionFunc = () => void;

const styles = {
  dialogPaper: {
      minHeight: '80vh',
      maxHeight: '80vh',
  },
};


export function FormDialog  (props : PropsWithChildren<FormDialogProps>)  {

    const {isAuthenticated } = useRecoilValue(currentUserSessionAtom);

    const theme = useTheme();
    const isXs = useMediaQuery( theme.breakpoints.up('xs'));
    const isSm = useMediaQuery( theme.breakpoints.up('sm'));
    const isMd = useMediaQuery( theme.breakpoints.up('md'));
    const isLg = useMediaQuery( theme.breakpoints.up('lg'));
    const isXl = useMediaQuery( theme.breakpoints.up('xl'));

    const sz = isXl? 'xl' : isLg? 'lg': isMd? 'md': isSm? 'sm': 'xs';

    const {open, title, okText, cancelText, onOk, onCancel, onClose, fullWidth, maxWidth, height,
       children} = props;
    return (
      <Dialog open={open} onClose={onClose} PaperProps={{
        sx: {
         // width: "50%",
          maxHeight: 600,
          height: height || '90vh',
          //minHeight: 600
          }
        }}
          maxWidth={maxWidth?maxWidth:sz} fullWidth={(fullWidth===undefined)?true:fullWidth}>
        <DialogTitle sx={{backgroundImage: 'linear-gradient(to right, black, #EA489E)', color: 'white'}}
          >{title}
        </DialogTitle>
        <DialogContent>
          {children}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogContent>
        <DialogActions>
          { cancelText!==''? <Button variant="outlined" onClick={onCancel} sx={{mb:2, ml: 1 }}>{cancelText}</Button>: null }
          { okText !== ''? <Button variant="contained" onClick={onOk} sx={{mb:2, ml: 4 }}>{okText}</Button>: null}
        </DialogActions>
      </Dialog>);    
}

