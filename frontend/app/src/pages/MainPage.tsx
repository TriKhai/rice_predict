import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ParallaxProvider } from 'react-scroll-parallax';

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF3E0]">
      <ParallaxProvider>
        <Header />
        <div className="flex-1 container mx-auto mt-10">
          <Outlet /> 
        </div>
        <Footer />
      </ParallaxProvider>
    </div>
  );
};

export default MainPage;