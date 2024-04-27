import React, { CSSProperties, SVGAttributes } from 'react';
//import { IconContext } from 'react-icons';
//import loadable from "@loadable/component";

import { FiSettings, FiType } from 'react-icons/fi';
import { MdSecurity } from 'react-icons/md';
import { MdPermDataSetting } from 'react-icons/md'; // Configure
import { MdProductionQuantityLimits, MdCalculate, MdOutlineFolderSpecial } from 'react-icons/md';
import { SiWebmoney, SiMatrix,  } from 'react-icons/si';
import { CgMoreO } from 'react-icons/cg';

import { FaFileContract, FaChalkboardTeacher, FaCashRegister, FaUniversity, FaMoneyBill, 
    FaTicketAlt, FaExclamationTriangle, FaWhatsapp, FaComments, FaSpa,    } from 'react-icons/fa';
//import { SlCalculator } from 'react-icons/Sl';

import { RiQrCodeFill } from 'react-icons/ri';
import { TbFileReport, TbApiApp, TbMessages, TbBrandWhatsapp, TbBrandGmail, 
  TbReportMoney,
    TbFileCertificate, TbDatabaseExport, TbBrandProducthunt, TbReportAnalytics,
    TbSchool, TbMathSymbols, TbLayoutBoardSplit, TbPackage, TbUser, TbLockAccess, TbUserCheck } from 'react-icons/tb';

import { HiOfficeBuilding } from 'react-icons/hi';
import { BiDirections, BiBusSchool, BiBrain } from 'react-icons/bi';
import { BsPersonCheck } from 'react-icons/bs';
import { AiOutlineConsoleSql } from 'react-icons/ai';


import { IoGitPullRequestOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { MdSettingsApplications, MdOutlineTextsms, MdOutlineCancel, MdPeopleOutline, MdConfirmationNumber, MdErrorOutline, MdPhone, MdChat, MdHealing,
     MdMoneyOff, MdGeneratingTokens, MdGroup, MdOutlineSchedule, MdOutlineCalendarViewMonth, MdScheduleSend } from 'react-icons/md';
     
import { GrDocumentConfig, GrShieldSecurity, GrUserAdmin, GrSchedulePlay, 
    GrBusinessService, GrGroup, GrArticle, GrSchedules, GrHostMaintenance, GrResources  } from 'react-icons/gr';
import { VscExtensions, VscFileBinary, VscNotebookTemplate } from 'react-icons/vsc';
import { WiCloud } from 'react-icons/wi';

import { SiGoogleclassroom, SiOpslevel, SiFuturelearn } from 'react-icons/si';

import { GiReceiveMoney, GiPayMoney, GiProtectionGlasses, GiTeacher, GiMoneyStack, GiSaloon } from 'react-icons/gi';


interface IProps {
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
}

// const DynamicIcon: React.FC<IProps> = ({ ...props }) => {
//   const [library, iconComponent] = props.icon.split("/");

//   if (!library || !iconComponent) return <div>Could Not Find Icon</div>;

//   const lib = library.toLowerCase();
//   const Icon = loadable(() => import(`react-icons/${lib}/index.js`), {
//     resolveComponent: (el: JSX.Element) =>
//       el[iconComponent as keyof JSX.Element]
//   });

//   const value: IconContext = {
//     color: props.color,
//     size: props.size,
//     className: props.className,
//     style: props.style,
//     attr: props.attr
//   };

//   return (
//     <IconContext.Provider value={value}>
//       <Icon color={color}/>
//     </IconContext.Provider>
//   );
// };

// RiQrCodeFill

export const iconFromName = (iconName: string, color?: string) : React.ReactNode => {

  switch(iconName) {

    case 'FiSettings': return <FiSettings color={color}/>
    case 'MdSecurity': return <MdSecurity color={color}/>    
    case 'MdPermDataSetting': return <MdPermDataSetting color={color}/>    // configure
    case 'MdProductionQuantityLimits': return <MdProductionQuantityLimits color={color}/>    
    case 'SiWebmoney': return <SiWebmoney color={color}/>    
    case 'CgMoreO': return <CgMoreO color={color}/>    
    case 'TbFileReport': return <TbFileReport color={color}/>    
 case 'TbSchool': return <TbSchool color={color}/>    
 case 'FaChalkboardTeacher': return <FaChalkboardTeacher color={color}/> 
 case 'MdPeopleOutline': return <MdPeopleOutline color={color}/> 
 case 'FaCashRegister': return <FaCashRegister color={color}/> 
 case 'GiTeacher': return <GiTeacher color={color}/> 
 case 'IoCheckmarkDoneOutline': return <IoCheckmarkDoneOutline color={color}/> 
 case 'SiFuturelearn': return <SiFuturelearn color={color}/> 
 case 'BsPersonCheck': return <BsPersonCheck color={color}/> 
 case 'GrHostMaintenance': return <GrHostMaintenance color={color}/> 
 case 'GrResources': return <GrResources color={color}/> 
 case 'MdGeneratingTokens': return <MdGeneratingTokens color={color}/> 
 case 'TbLockAccess': return <TbLockAccess color={color}/> 
 case 'TbUserCheck': return <TbUserCheck color={color}/> 
 case 'MdGroup': return <MdGroup color={color}/> 
 case 'MdOutlineFolderSpecial': return <MdOutlineFolderSpecial color={color}/> 
 case 'MdOutlineSchedule': return <MdOutlineSchedule color={color}/> 
 case 'MdOutlineCalendarViewMonth': return <MdOutlineCalendarViewMonth color={color}/> 
 case 'MdScheduleSend': return <MdScheduleSend color={color}/> 

    case 'IoGitPullRequestOutline': return <IoGitPullRequestOutline color={color}/>
    case 'MdSettingsApplications': return <MdSettingsApplications color={color}/>
    case 'GrDocumentConfig': return <GrDocumentConfig color={color}/>
    case 'GrShieldSecurity': return <GrShieldSecurity color={color}/>
    case 'GrUserAdmin': return <GrUserAdmin color={color}/>
    case 'GrGroup': return <GrGroup color={color}/>
    case 'VscExtensions': return <VscExtensions color={color}/>
    case 'VscFileBinary': return <VscFileBinary color={color}/>
    case 'VscNotebookTemplate': return <VscNotebookTemplate color={color}/>

case 'GiMoneyStack': return <GiMoneyStack color={color}/>
case 'TbReportMoney': return <TbReportMoney color={color}/>
case 'MdMoneyOff': return <MdMoneyOff color={color}/>    
case 'FaMoneyBill': return <FaMoneyBill color={color}/>     

    case 'RiQrCodeFill': return <RiQrCodeFill color={color}/>
    case 'SiGoogleclassroom': return <SiGoogleclassroom color={color}/>
    case 'SiOpslevel': return <SiOpslevel color={color}/>

    case 'GrArticle': return <GrArticle color={color}/>
      case 'FaUniversity': return <FaUniversity color={color}/>  

    case 'HiOfficeBuilding': return <HiOfficeBuilding color={color}/>    
  case 'FaFileContract': return <FaFileContract color={color}/>      
  case 'AiOutlineConsoleSql': return <AiOutlineConsoleSql color={color}/>    
    
    case 'MdOutlineTextsms': return <MdOutlineTextsms color={color}/>
    case 'GrSchedulePlay': return <GrSchedulePlay color={color}/>    
    case 'TbApiApp': return <TbApiApp color={color}/>    
     case 'BiDirections': return <BiDirections color={color}/>       
     case 'BiBusSchool': return <BiBusSchool color={color}/>   
     case 'BiBrain': return <BiBrain color={color}/>      
     case 'TbMessages': return <TbMessages color={color}/>
    case 'TbBrandWhatsapp': return <TbBrandWhatsapp color={color}/>
    case 'TbBrandGmail': return <TbBrandGmail color={color}/>
    case 'TbLayoutBoardSplit': return <TbLayoutBoardSplit color={color}/>
    case 'TbPackage': return <TbPackage color={color}/>
   case 'TbUser': return <TbUser color={color}/>

    case 'GrBusinessService': return <GrBusinessService color={color}/>   

    case 'GrSchedules': return <GrSchedules color={color}/>   

    
    case 'FaChalkboardTeacher': return <FaChalkboardTeacher color={color}/>   

    case 'TbFileCertificate': return <TbFileCertificate color={color}/> 

    case 'MdOutlineCancel': return <MdOutlineCancel color={color}/> 
    case 'TbMathSymbols': return <TbMathSymbols color={color}/> 

    case 'SiMatrix': return <SiMatrix color={color}/> 
    case 'MdCalculate': return <MdCalculate color={color}/> 
    case 'TbDatabaseExport': return <TbDatabaseExport color={color}/>

    case 'FiType': return <FiType color={color}/>
    case 'TbBrandProducthunt': return <TbBrandProducthunt color={color}/>
    case 'TbReportAnalytics': return <TbReportAnalytics color={color}/>

    case 'GiReceiveMoney': return <GiReceiveMoney color={color}/>
    case 'GiPayMoney': return <GiPayMoney color={color}/>
    case 'GiProtectionGlasses': return <GiProtectionGlasses color={color}/>
    case 'GiSaloon': return <GiSaloon color={color}/>

    case 'FaTicketAlt': return <FaTicketAlt color={color}/>
    case 'FaExclamationTriangle': return <FaExclamationTriangle color={color}/>
    case 'FaWhatsapp': return <FaWhatsapp color={color}/>
    case 'FaComments': return <FaComments color={color}/>
    case 'FaSpa': return <FaSpa color={color}/>

    case 'MdConfirmationNumber': return <MdConfirmationNumber color={color}/>
    case 'MdErrorOutline': return <MdErrorOutline color={color}/>

    case 'MdPhone': return <MdPhone color={color}/>
    case 'MdChat': return <MdChat color={color}/>
    case 'MdHealing': return <MdHealing color={color}/>

    default: return <WiCloud color={color}/>;
  }


}

//export default DynamicIcon;