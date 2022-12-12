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


function AdminLogin () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, login } = useAuth();

    /*useEffect(() => {
        if (user.role !== 'admin') {
            login(null);
        }
    }, []);*/

    const loginUser = (event) => {
        event.preventDefault();
        const data = { password: password, email: email };
        axios.post("http://localhost:8080/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("auth_token", response.data.auth_token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                login(response.data.user);

                if (response.data.user.role == 'admin')
                    window.location.href = '/admin/dashboard';
                else
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
                        <p>default email: admin@admin.com</p>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control type="password" placeholder="Heslo" name="password" onChange={(event) => {
                                setPassword(event.target.value);
                            }} />
                        </Form.Group>
                        <p>default pass: admin</p>


                        <Button onClick={loginUser} variant="primary" type="submit">
                            Prihlásiť
                        </Button>
                    </Form>
                </Row>

            </Container>


        </div>
    );
}

export default AdminLogin;