import { SvgIconProps } from "@mui/material";
import { ElementType, MutableRefObject, useRef, useState } from "react";

import { useTranslation  } from 'react-i18next';
import { IconType } from "react-icons";

import { IoSearchCircleSharp } from 'react-icons/io5';
import { JsxElement } from "typescript";

export interface IMenuItem {
    name: string,
    text: string,
    entityName: string,
    order: number,
    group: number,

    iconName?: string,
    
    routeToGo: string
    //linkAction: 
  }
  
  export interface IMenu {
    name: string,
    text: string,
    anchorRef: MutableRefObject<null>,
    isOpen: boolean,    

    iconName?: string,
  
    menuItems: IMenuItem[]
  }

  


  
  
  