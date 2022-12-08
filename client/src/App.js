import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Weights from "./pages/Weights";
import Methods from "./pages/Methods";
import Pressure from "./pages/Pressure";
import Login from "./pages/Login";
import Stats from "./pages/Stats";

import NavbarHeader from './components/navbar/navbarapp';
import RequireAuth from './components/RequireAuth';


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

        <Route element={<RequireAuth />}>
          <Route path="/methods" element={<Methods />} />
          <Route path="/weights" element={<Weights />} />
          <Route path="/pressure" element={<Pressure />} />
          <Route path="/stats" element={<Stats />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
