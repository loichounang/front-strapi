import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import TopMenuInfo from '../TopMenuInfo';
import TopMenu from '../TopMenu';
import Footer from '../Footer';
import BackToTop from '../BackToTop';
import Home from '../pages/Home';

function AppRoute() {
  return (
   <>
    <TopMenuInfo/>
    <TopMenu/>

    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    <BackToTop/>
    
    <Footer/>
   </>
  )
}

export default AppRoute;
