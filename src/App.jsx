import React from "react";
import Header from "./header/header";
import Home from "./home/home";
import { Routes,Route } from "react-router-dom";
import DashboardHMS from "./Dashboard/dashboard";
import Login from "./Dashboard/Login";
import Register from "./Dashboard/Register";
import ForgotPswd from "./Dashboard/components/ForgotPswd";

import IndexPage from "./home/IndexPage";
import Services from "./home/HomeComponents/Services";


import ContactUs from "./home/HomeComponents/ContactUSMain";
import AboutUs from "./home/HomeComponents/AboutUsMain";
import Support from "./home/HomeComponents/Support";
import PrivateRoute from './home/HomeComponents/PrivateRoute';
import ProtectedRoute from './Dashboard/ProtectedRoute';



const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<IndexPage />} />
        {/* <Route path="/Dashboard" element={<ProtectedRoute>
                                         <DashboardHMS />
                                         </ProtectedRoute>
                                         } /> */}
        <Route path="/Dashboard" element={<DashboardHMS />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/pswd" element={<ForgotPswd />} />
        <Route path="/Treatments" element={<Services />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Support" element={<Support />} />
        
      </Routes>

    </>
  );
};

export default App;
