

import React from 'react';
import { Navigate, Outlet, Route, Routes} from 'react-router-dom';


import {  useRecoilValue, } from 'recoil';

///
import { currentUserSessionAtom } from 'library/store';

import { Login } from './Login';
//import { Home } from 'features/Home';

// import { ApplicationSetupForm, defaultApplicationSetup,
//     ApplicationQueryForm, defaultApplicationQuery, ContentTypeForm, defaultContentType } from 'features/setup';

// import { RoleForm, defaultRole,
//          UserForm, defaultUser } from 'features/security';

// import { ExternalLibraryForm, defaultExternalLibrary,
//          EnumerationForm, defaultEnumeration,
//          ReportForm, defaultReport,
//          ExtensionTypeForm, defaultExtensionType } from 'features/configuration';


// import { 
//     ContentForm,
//          MediaForm, defaultContent, defaultMedia,
         
//            } from 'features/production';

// import { JobForm, defaultJob,
//          SmsApiForm, defaultSmsApi } from 'features/misc';


import { PasswordChangeForm, defaultPasswordChange } from 'features/identity';
import Home from 'features/Home';
import Contact from 'features/Contact';
import Abouts from 'features/Abouts';
import PoseGel from './PoseGel';
import Services from './Services';
import SoinsDeVisage from 'features/SoinsDeVisage';
import SoinsDeCorps from 'features/SoinsDeCorps';
import MainEtPied from 'features/MainEtPied';
import BienEtre from 'features/BienEtre';
import GalerySpa from 'features/GalerySpa';
import ResultatSoins from 'features/ResultatSoins';
import Reservations from 'features/Reservations';



            

const ProtectedRoute = ( props: {redirectPath?: string} ) : React.ReactElement => {
    const {redirectPath} = props;

    const {isAuthenticated } = useRecoilValue(currentUserSessionAtom);
    
    return !isAuthenticated ? <Navigate to={redirectPath || '/login'} replace /> : <Outlet />;
}


export const AppRoute = () => {
    
    return (
    <Routes>
         <Route index element={<Home />} />

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/le-spa-en-image" element={<GalerySpa/>} />
       <Route path="/aboutUs" element={<Abouts />} />
       {/* <Route path="/service/poseGel" element={<PoseGel />} />*/}
       {/*<Route path="/service/:typeService" element={<Services/>} />*/}
       
        <Route path='/soins-de-visage' element={<SoinsDeVisage/>} />
        <Route path='/soins-de-corps' element={<SoinsDeCorps/>} />
        
        <Route path='/mains-et-pieds' element={<MainEtPied/>} />
        <Route path='/bien-être' element={<BienEtre/>} />
        <Route path="/les-resultats-de-nos-soins" element={<ResultatSoins/>} />
        <Route path="/reservation" element={<Reservations />} />

        
       

        <Route path="login" element={<Login />} />
        
        {/* <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} /> */}

          {/* ------ Setup ----- */}
          {/* <Route path="applicationSetup/:id" element={<ApplicationSetupForm {...defaultApplicationSetup} />} />          
          <Route path="applicationQuery/:id" element={<ApplicationQueryForm {...defaultApplicationQuery} />} />

          
          <Route path="contentType/:id" element={<ContentTypeForm {...defaultContentType} />} /> */}

          
          {/* ------ Security ----- */}
          {/* <Route path="role/:id" element={<RoleForm {...defaultRole} />} />
          <Route path="user/:id" element={<UserForm {...defaultUser} />} /> */}

          {/* ------ Configuration ----- */}
          {/* <Route path="externalLibrary/:id" element={<ExternalLibraryForm {...defaultExternalLibrary} />} />
          <Route path="extensionType/:id" element={<ExtensionTypeForm {...defaultExtensionType} />} />
          <Route path="enumeration/:id" element={<EnumerationForm {...defaultEnumeration} />} />
          <Route path="report/:id" element={<ReportForm {...defaultReport} />} /> */}
        
          {/* ------ Production ----- */}
          {/* <Route path="media/:id" element={<MediaForm {...defaultMedia} />} />
          <Route path="content/:id" element={<ContentForm {...defaultContent} />} /> */}
          
          {/* ------ Misc ----- */}
                   

          {/* ------ Misc ----- */}
          {/* <Route path="job/:id" element={<JobForm {...defaultJob} />} />
          <Route path="smsApi/:id" element={<SmsApiForm {...defaultSmsApi} />} /> */}

          {/* ------ User profile ----- */}
          {/* <Route path="passwordChange" element={<PasswordChangeForm {...defaultPasswordChange} />} />
          
        </Route> */}
        
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
    );
    
}


