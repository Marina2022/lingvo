import React from 'react';
import AdminHeader from "./AdminHeader/AdminHeader";
import Sidebar from "./Sidebar/Sidebar";
import s from './Admin.module.scss'
import AuthorsBlock from "./AuthorsBlock/AuthorsBlock";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {    
  return (
      <div className={`${s.adminLayout} adminPage`}>
        <ToastContainer />
        <Sidebar/>
        <AdminHeader/>
        <AuthorsBlock/>        
      </div>
  );
};

export default Admin;