import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AuthContext } from "./helpers/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


function App () {

  const [authState, setAuthState] = useState({
    first_name: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/login", {
        headers: {
          auth_token: localStorage.getItem("auth_token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            first_name: response.data.first_name,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    localStorage.removeItem("auth_token");
    setAuthState({ first_name: "", id: 0, status: false });
  };

  const login = () => {
    localStorage.removeItem("auth_token");
    setAuthState({ first_name: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
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
                    <Button onclick={login}>Login</Button>
                  </>
                ) : (
                  <>
                    <Button onclick={logout}>Logout</Button>
                  </>
                )}

              </Nav>
            </Container>
          </Navbar>

          {!authState.status && (
            <>
              <Container className="mt-5 col-12 col-md-6 cl-md-offset-3">
                <Row>
                  <h1>Login</h1>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" name="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Meno</Form.Label>
                      <Form.Control type="text" placeholder="Meno" name="first_name" />
                    </Form.Group>

                    <>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Label>Vek</Form.Label>
                        <Form.Control type="number" label="Vek" name="age" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicHeight">
                        <Form.Label>Výška</Form.Label>
                        <Form.Control type="number" label="Výška" name="height" />
                      </Form.Group></>
                    <Button variant="primary" type="submit" onclick={login}>
                      Prihlásiť
                    </Button>
                  </Form>
                </Row>

              </Container>
            </>
          )}


          <Routes>
            <Route path="/" exact component={<Home />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
