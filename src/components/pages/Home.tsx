import React from 'react';
import HeroSection from '../HeroSection';
import AboutSection from '../AboutSection';
import Values from '../Values';
import Reservation from '../Reservation';
import Speciality from '../Speciality';
import BestDeals from '../BestDeals';




function Home() {
  

  return (
    <div >
      <HeroSection/>
      <AboutSection/>
      <Values/>
      <BestDeals/>
      <Speciality/>
      <Reservation/>
     
    </div>
  );
}

export default Home;
