import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from "./helpers/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Weights from "./pages/Weights";
import Methods from "./pages/Methods";
import LowPressure from "./pages/LowPressure";
import HighPressure from "./pages/HighPressure";
import Login from "./pages/Login";

import NavbarHeader from './components/navbar/navbarapp';

import { AuthProvider, RequireAuth } from "./helpers/Auth";


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


function App () {

  /*const login = () => {
    localStorage.removeItem("auth_token");
    setAuthState({ first_name: "", id: 0, status: false });
  };*/

  return (
    <div className="root">
      <NavbarHeader />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route index path="/" element={<Login />} />

        <Route path="/methods" element={<Methods />} />

        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
