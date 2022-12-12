import React, { useEffect } from "react";
import { useState, } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../helpers/Auth";

import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, login } = useAuth();

    useEffect(() => {
        if (user) {
            login(null);
        }
    }, []);

    const loginUser = (event) => {
        event.preventDefault();
        const data = { password: password, email: email };
        axios.post("http://localhost:8080/auth/login", data).then((response) => {
            if (response.error) {
                alert(response.error);
            } else {
                localStorage.setItem("auth_token", response.data.auth_token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                login(response.data.user);
                window.location.href = '/stats';
            }
        }).catch((error) => {
            alert('PRIHLÁSENIE SA NEPODARILO');
        });
    };

    return (
        <div>

            <Container className="mt-5 col-12 col-md-6 cl-md-offset-3">
                <Row>
                    <h1>Login</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" name="email" onChange={(event) => {
                                setEmail(event.target.value);
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control type="password" placeholder="Heslo" name="password" onChange={(event) => {
                                setPassword(event.target.value);
                            }} />
                        </Form.Group>

                        <Button onClick={loginUser} variant="primary" type="submit">
                            Prihlásiť
                        </Button>
                    </Form>
                </Row>

            </Container>

            <Container className="mt-5 text-center">
                Pokiaľ sa chcete registrovať, <Link to="/register">zaregistrujte sa.</Link>
            </Container>

            <Container className="mt-5 text-center">
                Admin rozhranie je dostupné na <Link to="/admin">/admin</Link>
            </Container>


        </div>
    );
}

export default Login;