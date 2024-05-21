

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
import Services from 'features/Services';
import QuotationForm from 'features/setup/QuotationForm';
import News from '../features/setup/News';
import AllProducts from 'features/setup/AllProducts';
import OurServices from 'features/setup/OurServices';


            

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
         <Route path="/aboutUs" element={<Abouts />} />
         <Route  path="/services" element={<Services />} />
         <Route path="/service/:id" element={<QuotationForm />} />
         <Route path="/all-products" element={<AllProducts />} />
         <Route path="/surveillance" element={<OurServices />} />





         


         
       {/* <Route path="/service/poseGel" element={<PoseGel />} />*/}
       {/*<Route path="/service/:typeService" element={<Services/>} />*/}

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


