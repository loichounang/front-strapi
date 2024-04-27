import { SvgIconProps } from "@mui/material";
import { ElementType, MutableRefObject, useRef, useState } from "react";

import { useTranslation  } from 'react-i18next';
import { IconType } from "react-icons";

import { IoSearchCircleSharp } from 'react-icons/io5';
import { JsxElement } from "typescript";

export interface IAuthorizationItem {
    authorizationId: number,
    authorizationType: string,

    authorizationDescription: string,

    
    isAllowed: boolean,        
    isDeny: boolean,    
  }
  
  export interface IAuthorization {
    id: number,
    
    groupId: number,
    groupName: string,
    groupDescription: string,
    
    entityName: string,
    entityId: number,
  
    authorizationItems: IAuthorizationItem[]
  }

  export interface IEntityAuthorization {
    id: number,

    entityHeaderInfo: string,

    entityName: string,
    entityId: number,
  
    authorizations: IAuthorization[]
  }

  export const defaultEntityAuthorization : IEntityAuthorization =  {
    id: 0,
        
    entityHeaderInfo: '',

    entityName: '',
    entityId: 0,
  
    authorizations: []
  }


  
  
  