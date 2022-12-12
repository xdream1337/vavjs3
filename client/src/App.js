import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Weights from "./pages/Weights";
import Methods from "./pages/Methods";
import Pressure from "./pages/Pressure";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import Admin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Ad from './components/Ad';

import NavbarHeader from './components/navbar/navbarapp';
import RequireAuth from './components/RequireAuth';


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


function App () {
  return (
    <div className="root">
      <NavbarHeader />
      <Ad />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route index path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route element={<RequireAuth />}>
          <Route path="/methods" element={<Methods />} />
          <Route path="/weights" element={<Weights />} />
          <Route path="/pressure" element={<Pressure />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
