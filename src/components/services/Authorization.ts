

import { useState } from "react";

import {RefetchOptions, RefetchQueryFilters, QueryObserverResult } from "react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

import { useSetRecoilState, useRecoilState } from "recoil"; 

import { IEntity, IEntityProperty, IFeatureDescription, IFeatureParameter, IReportDescription } from "library/interface";

import useAxios from 'library/axios'; 
import { isActionDrawerOpenAtom, isPrintDrawerOpenAtom, currentEntityNameForActionDrawerAtom, currentEntityIdForActionDrawerAtom, 
  currentUserSessionAtom, isSearchBoxShowAtom, isAuthorizationBoxShowAtom ,currentBasicTextFilterPropsAtom } from "library/store";
import { BasicTextFilterProps, ITextFilterElement } from "components/ui/BasicTextFilterForm";

import { HeadCell, RowCheckedMode } from "components/ui/EnhancedTable";

import { isFalsy } from "utility-types";
import { IEntityAuthorization ,IAuthorization } from "components/models/Authorization";


const _ = () => {

    const axios = useAxios();   

    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();


    const updateEntityAuthorization = async (entityAuthorization: IEntityAuthorization)  =>       
        await (await axios.post('/api/security/authorization/updateEntityAuthorization', entityAuthorization)).data;  
    

    const getAuthorizationsByEntityType = async ( entityName: string) : Promise<{value: string, name: string}[]>  => {       
        
        const {data} = (await axios.get(`/api/home/get-authorizations-by-entity-type/?entityName=${entityName}`));
        return await data;
      } 

    
    const getEntityAuthorizations = async (entityName: string, entityId: number) : Promise<IAuthorization[]> => {
      
      const {data} = (await axios.get(`/api/security/authorization/get-entity-authorizations?entityName=${entityName}&entityId=${entityId}`));
      return await data;
    }


    return {    
      updateEntityAuthorization,

        getAuthorizationsByEntityType,

        getEntityAuthorizations
    } 
}

export default _;

export interface IFilterAuthOption {
    rowCheckedMode: RowCheckedMode,
    stateSelected?: [string[], React.Dispatch<React.SetStateAction<string[]>>],
    stateFiltered?: [{value: string, name: string}[], React.Dispatch<React.SetStateAction<{value: string, name: string}[]>>],
  }
  
  const defaultFilterAuthOption: IFilterAuthOption = {
    rowCheckedMode: 'single'
    //stateSelected: navigate
  }
  
  export interface IFilterPropertyOption {
    rowCheckedMode: RowCheckedMode,
    stateSelected?: [string[], React.Dispatch<React.SetStateAction<string[]>>],
    stateFiltered?: [IEntityProperty[], React.Dispatch<React.SetStateAction<IEntityProperty[]>>],
  }
  
  const defaultFilterPropertyOption: IFilterPropertyOption = {
    rowCheckedMode: 'single'
    //stateSelected: navigate
  }
  
  export const useBasicFilterEntityAuthorization = ( getEntityName: () => string,
      onRowDoubleClick: (event: React.MouseEvent<unknown>, row: {value: string, name: string}) => void, filterOption?: IFilterAuthOption  ) => {
  
    const { getAuthorizationsByEntityType } = _();
  
    const { t, i18n } = useTranslation();   
    const navigate = useNavigate();
    
    const {rowCheckedMode, stateSelected, stateFiltered} = filterOption || defaultFilterAuthOption;  
  
    const [headCells, setHeadCells]  = useState<HeadCell<{value: string, name: string}>[]>([
      {id:'name', label : t('Description'),  display: true, type: 'string', },
      {id:'value', label : t('Value'),  display: false, type: 'string', },
    ]);  
    const [filterElements,] = useState( [       
    //   {name: 'featureName', text: t('Name'), value: ''}, 
       //{name: 'featureDescription', text: t('Description'), value: ''},   
      ]);    
  
    const [filteredAuths, setFilteredAuths] = useState<{value: string, name: string}[]>([]); 
  
    const onFilterButtonClick = async (filterElements: ITextFilterElement[]): Promise<{value: string, name: string}[]> => {
                                 
      const arr = await getAuthorizationsByEntityType( getEntityName() );
      
      return arr;
    }
  
    const objKey: keyof {value: string, name: string} = 'value';
  
    return {
      title: t('Features'), headCells: headCells, objKey,
      filterElements, rows: filteredAuths, 
      onFilterButtonClick, onRowDoubleClick, rowCheckedMode, stateSelected, stateFiltered
    }
  }