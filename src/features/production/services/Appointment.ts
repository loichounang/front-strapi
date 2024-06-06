
import { useSnackbar } from 'notistack';

import { useRecoilValue } from 'recoil';

import useAxios from 'library/axios'; 
import { useState } from 'react';
import {IAppointment, IAppointmentSearch } from "../models/Appointment";
import { useTranslation  } from 'react-i18next';
import { IPagination, ITextFilterElement } from 'components/ui/BasicTextFilterForm';
import { IResult } from 'library/interface';
import { HeadCell, RowCheckedMode } from 'components/ui/EnhancedTable';


import { globalConfig } from 'config';

import { currentUserSessionAtom } from 'library/store';
//import { IPolicyRisk, IPolicyRiskCoverage } from 'features/appointmention/models/Policy';


const _ = () => {

    const axios = useAxios(); 

    const createAppointment = async (appointment: IAppointment)  =>       
        await (await axios.post(`${globalConfig.get().shineApiUrl}/public-api/appointment/v1/create`, appointment)).data;       
        
    const updateAppointment = async (appointment: IAppointment)  =>       
        await (await axios.post(`${globalConfig.get().shineApiUrl}/public-api/appointment/v1/update`, appointment)).data; 
    
    const getAppointment = async (id  : number )  => {
      const {data} = (await axios.get(`${globalConfig.get().shineApiUrl}/public-api/appointment/v1/${id}`));
      return await data;
    }
   

    const getAppointments = async (criteria: IAppointmentSearch, pagination?: IPagination) : Promise<IAppointment[]> => {

      const { firstName, lastName } = criteria;

      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/public-api/appointment/v1/get-appointments?&firstName=${firstName}&lastName=${lastName}&pageSize=${pageSize}&pageNumber=${pageNumber}`));
      return await data;
    }
     
    return {    
      createAppointment,
      updateAppointment,
      getAppointment,
      getAppointments,

    } 
}

export default _;

export interface IFilterAppointmentOption {
  rowCheckedMode: RowCheckedMode,
  stateSelected?: [string[], React.Dispatch<React.SetStateAction<string[]>>],
  stateFiltered?: [IAppointment[], React.Dispatch<React.SetStateAction<IAppointment[]>>],
}

const defaultFilterAppointmentOption: IFilterAppointmentOption = {
  rowCheckedMode: 'single'
  //stateSelected: navigate
}


export const useBasicFilterAppointment = ( onRowDoubleClick: (event: React.MouseEvent<unknown>, row: IAppointment) => void,
                                            filterOption?: IFilterAppointmentOption  ) => {

  const { getAppointments } = _();

  const { t, i18n } = useTranslation();   
  const {rowCheckedMode, stateSelected, stateFiltered} = filterOption || defaultFilterAppointmentOption;



  const [headAppointmentCells, setHeadAppointmentCells]  = useState<HeadCell<IAppointment>[]>([
    {id:'id', label : t('Id'),  display: true, type: 'numeric', },
    
    {id:'firstName', label : t('Name'),  display: true, type: 'string', },
    {id:'lastName', label : t('Description'),  display: true, type: 'string', },
    
    
  ]); 
  const [filterElements,] = useState<ITextFilterElement[]>( [
    
      {name: 'firstName', text: t('Name'), value: ''},
      {name: 'lastName', text: t('Description'), value: ''},
      
    ]);    

  const [filteredAppointments, ] = useState<IAppointment[]>([]); 

  const onFilterButtonClick = async (filterElements: ITextFilterElement[], pagination?: IPagination) : Promise<IAppointment[]> => {
   
    const firstName = filterElements.find( elt => elt.name === 'firstName')?.value || '';
    const lastName = filterElements.find( elt => elt.name === 'lastName')?.value || '';
    
    
    const arr = await getAppointments({ firstName, lastName}, pagination );
    
    return arr;
  }

  const objKey: keyof IAppointment = 'id';

  return {
    title: t('Appointment'), headCells: headAppointmentCells, objKey,
    filterElements, rows: filteredAppointments, 
    onFilterButtonClick, onRowDoubleClick, rowCheckedMode, stateSelected, stateFiltered
  }
}

