import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AuthContext } from "./helpers/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Weights from "./pages/Weights";
import Methods from "./pages/Methods";
import LowPressure from "./pages/LowPressure";
import HighPressure from "./pages/HighPressure";
import Login from "./pages/Login";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


function App () {

  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/check-token", {
        headers: {
          auth_token: localStorage.getItem("auth_token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const logout = () => {
    localStorage.removeItem("auth_token");
    setAuthState({ email: "", id: 0, status: false });
  };

  /*const login = () => {
    localStorage.removeItem("auth_token");
    setAuthState({ first_name: "", id: 0, status: false });
  };*/

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Osobná kondícia</Navbar.Brand>
            <Nav className="me-auto">
              {!authState.status ?
                <>

                </>
                : (
                  <>
                    <Nav.Link href="/weights"> Meranie váhy</Nav.Link>
                    <Nav.Link href="/low_pressures"> Meranie spodného tlaku </Nav.Link>
                    <Nav.Link href="/high_pressures"> Meranie horného tlaku </Nav.Link>
                    <Nav.Link href="/methods"> Metódy </Nav.Link>
                  </>
                )}

            </Nav>
            <Nav className="me-right">
              {authState.first_name}
              {!authState.status ? (
                <>
                </>
              ) : (
                <>
                  <Button onclick={logout}>Logout</Button>
                </>
              )}

            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/weights" element={<Weights />} />
          <Route path="/low-pressure" element={<LowPressure />} />
          <Route path="/high-pressure" element={<HighPressure />} />
          <Route path="/methods" element={<Methods />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
