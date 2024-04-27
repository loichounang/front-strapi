import { HeadCell } from 'components/ui/EnhancedTable';
//import useAxios from 'library/axios'; 
import { useState } from 'react';

import axios from 'axios';

import { useTranslation  } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


import { IPagination, ITextFilterElement } from 'components/ui/BasicTextFilterForm';
import { IAboutPage, IArrierePlan, IGaleryPhoto, IIMage4Carousel, IMainInformation, IPoseGel, IPoseVernis, IReservation, ISlideImage, ISpecialOffer, ISpecialOfferDefintion, ISpeciality, ISpecialityDefinition, IValueDefintion, IValueSpa  } from "../models/MainInformation";

import { globalConfig } from 'config';
import { IService } from 'features/production/models/Appointment';
import { get } from 'lodash';


const _ = () => {

    //const axios = useAxios();     

    // const createContact = async (contact: IContact)  =>       
    //     await (await axios.post('/api/production/contact/create', contact)).data;       
        
    // const updateContact = async (contact: IContact)  =>       
    //     await (await axios.post('/api/production/contact/update', contact)).data; 
    
    // const getContact = async (id  : number )  => {
    //   const {data} = (await axios.get(`/api/production/contact/get-contact/${id}`));
    //   return await data;
    // }

    const getMainInformations = async (pagination?: IPagination) : Promise<IMainInformation[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;

      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/main/get-contents`));
      return await data;
    }

    const getImages4Carousel = async (pagination?: IPagination) : Promise<IIMage4Carousel[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;

      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/carouselImage/get-contents`));
      return await data;
    }

    const getSlideImages = async (pagination?: IPagination) : Promise<ISlideImage[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/slide/get-contents`));
      return await data;
    }


    const getValueDefinitions = async (pagination?: IPagination) : Promise<IValueDefintion[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/valueDef/get-contents`));
      return await data;
    }

    const getValueSpas = async (pagination?: IPagination) : Promise<IValueSpa[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/values/get-contents`));
      return await data;
    }

    const getSpecialOfferDefintions = async (pagination?: IPagination) : Promise<ISpecialOfferDefintion[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/offerDef/get-contents`));
      return await data;
    }

    const getSpecialOffers = async (pagination?: IPagination) : Promise<ISpecialOffer[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/offer/get-contents`));
      return await data;
    }

    const getSpecialityDefinitions = async (pagination?: IPagination) : Promise<ISpecialityDefinition[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/specialityDef/get-contents`));
      return await data;
    }

    const getSpecialities = async (pagination?: IPagination) : Promise<ISpeciality[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/speciality/get-contents`));
      return await data;
    }

    const getReservations = async (pagination?: IPagination) : Promise<IReservation[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/reservation/get-contents`));
      return await data;
    }

    const getGaleryPhotos = async (pagination?: IPagination) : Promise<IGaleryPhoto[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/photoGalery/get-contents`));
      return await data;
    }

    const getServices = async (pagination?: IPagination) : Promise<IService[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/service/get-contents`));
      return await data;
    }

    // const getContactsByPage = async (pagination?: IPagination) : Promise<IContact[]> => {
    //   const pageSize = pagination?.pageSize ?? 50;
    //   const pageNumber = pagination?.pageNumber ?? 1;

    //   const {data} = (await axios.get(`/api/production/contact/get-contacts-by-page?pageSize=${pageSize}&pageNumber=${pageNumber}`));
    //   return await data;
    // }

   
    const getArrierePlan = async (pagination?: IPagination) : Promise<IArrierePlan[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/PageContact/get-contents`));
      return await data;
    }

    const getAboutsPage = async (pagination?: IPagination) : Promise<IAboutPage[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;

      //const {name, description, phoneNumber} = criteria;
      
      const {data} = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/AboutsPage/get-contents`));
      return await data;
    }

    const getPoseGelPage = async ( pagination?: IPagination): Promise<IPoseGel[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;
    
      const { data } = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/ServicesPoseGel/get-contents`));
    
      return data;
    };
    
    const getPoseVernisPage = async ( pagination?: IPagination): Promise<IPoseVernis[]> => {
      const pageSize = pagination?.pageSize ?? 50;
      const pageNumber = pagination?.pageNumber ?? 1;
    
      const { data } = (await axios.get(`${globalConfig.get().apiUrl}/api/production/content/v1/${globalConfig.get().applicationApiToken}/ServicesPoseVernis/get-contents`));
     
      return data;
    };
    

    


  
      
    return {    
      getMainInformations,
      getImages4Carousel,
      getSlideImages,

      getValueDefinitions,
      getValueSpas,

      getSpecialOfferDefintions,
      getSpecialOffers,

      getSpecialityDefinitions,
      getSpecialities,

      getReservations,

      getGaleryPhotos,

      getServices,

      getArrierePlan,

      getAboutsPage,

      getPoseGelPage,
      getPoseVernisPage
    } 
}

export default _;
