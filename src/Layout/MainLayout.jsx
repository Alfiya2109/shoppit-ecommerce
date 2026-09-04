import NavBar from '../components/ui/NavBar';
import { Outlet } from 'react-router-dom';
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/ui/Footer'
const MainLayout = ({numCartItems}) => {
  return (
    <>
      <ToastContainer />
      <NavBar numCartItems={numCartItems}/>

      <Outlet/>
      <Footer/>

     
    </>
  );
};

export default MainLayout;
