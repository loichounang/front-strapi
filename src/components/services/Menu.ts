
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IMenu } from "components/models/Menu";

import { IoSearchCircleSharp } from 'react-icons/io5';


const _ = () => {

    const { t, i18n } = useTranslation();

    const [applicationMenus,setApplicationMenus] = useState<IMenu[]>([]);

    const menu1 : IMenu = { name: '', text: '', anchorRef: useRef(null), isOpen: false, iconName: '',  menuItems: [] }
    const menu2 : IMenu = { name: '', text: '', anchorRef: useRef(null), isOpen: false, iconName: '',  menuItems: [] }
    const menu3 : IMenu = { name: '', text: '', anchorRef: useRef(null), isOpen: false, iconName: '',  menuItems: [] }

    const menu4 : IMenu = { name: '', text: '', anchorRef: useRef(null), isOpen: false, iconName: '',  menuItems: [] }
    const menu5 : IMenu = { name: '', text: '', anchorRef: useRef(null), isOpen: false, iconName: '',  menuItems: [] }
    const menu6 : IMenu = { name: '', text: '', anchorRef: useRef(null), isOpen: false, iconName: '',  menuItems: [] }

    //const [applicationMenus,setApplicationMenus] = useState<IMenu[]>();

        useEffect( () => {
          setApplicationMenus(
            [
              {
                ...menu1, name: 'param', text: t('Setting'), iconName:'FiSettings', isOpen: false,
                menuItems: [
                  {name: 'applicationSetup', text: t('Company Setup'), iconName: 'MdSettingsApplications', entityName: 'ApplicationSetup', routeToGo: '/applicationSetup',   order: 1, group: 1},
                  {name: 'applicationQuery', text: t('Application Query'), iconName: 'AiOutlineConsoleSql', entityName: 'ApplicationQuery', routeToGo: '/applicationQuery',  order: 1, group: 2},
                  
                  {name: 'contentType', text: t('ContentType'), iconName: 'TbBrandProducthunt', entityName: 'ContentType', routeToGo: '/contentType',  order: 1, group: 3},

                  // {name: 'employee', text: `${t('Employee')}`, iconName: 'TbUser', entityName: 'Employee',routeToGo: '/employee', order: 1, group: 4},               
                ]
              }, 
              {
                ...menu2, name: 'security', text: t('Security'), iconName:'MdSecurity', isOpen: false,
                menuItems: [
                  {name: 'role', text: t('Role'), iconName: 'TbUserCheck', entityName: 'Role', routeToGo: '/role',  order: 1, group: 1},
                  //{name: 'group', text: 'Group', entityName: 'Role', routeToGo: '/',  order: 1, group: 1},
                  //{name: 'profile', text: 'Profile', entityName: 'Profile', routeToGo: '/',  order: 1, group: 1},
                  {name: 'user', text: t('User'), iconName: 'MdGroup', entityName: 'User', routeToGo: '/user',order: 2, group: 1},
                ]
              },
              {
                ...menu3, name: 'config', text: t('Configuration'), iconName:'MdPermDataSetting', isOpen: false,
                menuItems: [
                  {name: 'extensionType', text: t('Extension type'), iconName: 'VscExtensions' , entityName: 'ExtensionType',routeToGo: '/extensionType', order: 0, group: 1},
                  {name: 'enumeration', text: t('Codification'), iconName: 'RiQrCodeFill' , entityName: 'Enumeration',routeToGo: '/enumeration', order: 1, group: 1},
                  // {name: 'matrix', text: 'Matrix', entityName: 'Matrix',routeToGo: '/', order: 2, group: 1},
                  // {name: 'vector', text: 'Vector', entityName: 'Vector',routeToGo: '/', order: 2, group: 1},
                   {name: 'report', text: t('Report'), iconName: 'TbFileReport', entityName: 'Report',routeToGo: '/report', order: 1, group: 2},
                   //{name: 'externalLibrary', text: t('Api file'), iconName: 'VscFileBinary', entityName: 'ExternalLibrary',routeToGo: '/externalLibrary', order: 2, group: 2},
                  //{name: 'tarification', text: t('Tarification'), entityName: 'Tarification',routeToGo: '/tarification', order: 1, group: 1},
                 
                 
                  //{name: 'workflow', text: 'Workflow', entityName: 'Workflow',routeToGo: '/', order: 1, group: 2},
                  //{name: 'entityData', text: 'EntityData', entityName: 'EntityData',routeToGo: '/', order: 1, group: 3},
                  //{name: 'queryData', text: 'QueryData', entityName: 'QueryData',routeToGo: '/', order: 2, group: 3},
                  //{name: 'report', text: 'Report', entityName: 'Report',routeToGo: '/', order: 1, group: 4},            
      
                ]
              },
              
              {
                ...menu4, name: 'production', text: t('Web site'), iconName:'MdProductionQuantityLimits', isOpen: false,
                menuItems: [
                  {name: 'media', text: t('Media'), iconName: 'FaFileContract', entityName: 'Media',routeToGo: '/media', order: 1, group: 1}, 

                  {name: 'content', text: t('Content'), iconName: 'FaFileContract', entityName: 'Content',routeToGo: '/content', order: 1, group: 2}, 

                  // {name: 'message', text: t('Message'), iconName: 'MdHealing', entityName: 'Message',routeToGo: '/message', order: 1, group: 3}, 
                 
                  
                  // {name: 'appointment', text: t('Appointment'), iconName: 'MdOutlineSchedule', entityName: 'Appointment', routeToGo: '/appointment',  order: 1, group: 4},
                  // {name: 'appointmentTimeTable', text: `${t('Scheduling')} - ${t('Appointment')}`, iconName: 'MdOutlineCalendarViewMonth', entityName: 'AppointmentTimeTable',routeToGo: '/appointmentTimeTable', order: 2, group: 4}, 

                  // {name: 'billing', text: t('Customer billing'), iconName: 'MdOutlineSchedule', entityName: 'Billing', routeToGo: '/billing',  order: 1, group: 5},

                  // {name: 'person', text: t('Person'), iconName: 'MdPeopleOutline', entityName: 'Person',routeToGo: '/person', order: 1, group: 6}, 
                ]
              },
              // {
              //   ...menu5, name: 'serviceActivation', text: t('Service activation'), iconName:'SiWebmoney', isOpen: false,
              //   menuItems: [
              //     // {name: 'messageRefill', text: t('Message refill'), entityName: 'MessageRefill',routeToGo: '/messageRefill', order: 1, group: 1},       
              //     // {name: 'CreditTransfert', text: t('Credit transfert'), entityName: 'CreditTransfert',routeToGo: '/creditTransfert', order: 2, group: 1},

              //     {name: 'sysBilling', text: t('Purchase of services'), entityName: 'SysBilling',routeToGo: '/sysBilling', order: 1, group: 1},       
                  
              //     //{name: 'paymentOperation', text: 'Payment Operation', entityName: 'Payment Operation',routeToGo: '/', order: 1, group: 2},
              //   ]
              // },
              {
                ...menu6, name: 'more', text: t('More'), iconName:'CgMoreO', isOpen: false,
                menuItems: [
                  
                  {name: 'job', text: t('Job schedule'), iconName: 'MdScheduleSend', entityName: 'Job',routeToGo: '/job', order: 1, group: 2},


                  // {name: 'postingRule', text: 'PostingRule', entityName: 'PostingRule',routeToGo: '/', order: 1, group: 3},
                ]
              },
              ]
          );
        },[t, i18n]);

        return {
            applicationMenus, setApplicationMenus
        }
  }

  export default _;