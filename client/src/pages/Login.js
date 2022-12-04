import React from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Login () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [authState, setAuthState] = useState({
        first_name: "",
        id: 0,
        status: false,
    });

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                });
            }
        });
    };

    return (
        <div>
            {!authState.status ? (
                <>
                    <Container className="mt-5 col-12 col-md-6 cl-md-offset-3">
                        <Row>
                            <h1>Login</h1>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" name="email" onChange={(event) => {
                                        setUsername(event.target.value);
                                    }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Heslo</Form.Label>
                                    <Form.Control type="password" placeholder="Heslo" name="password" onChange={(event) => {
                                        setPassword(event.target.value);
                                    }} />
                                </Form.Group>

                                <Button onClick={login} variant="primary" type="submit">
                                    Prihlásiť
                                </Button>
                            </Form>
                        </Row>

                    </Container>

                    <Container className="mt-5">
                        Pokiaľ sa chcete registrovať, <Link to="/register">zaregistrujte sa.</Link>
                    </Container>
                </>
            ) : (
                <>
                    <Link to="/dashboard" />
                </>
            )}
        </div>
    );
}

export default Login;