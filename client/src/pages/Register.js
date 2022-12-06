import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
//import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios';
import { Form, Button, Container, Row } from 'react-bootstrap';
//import { Redirect } from 'react-router-dom';



function Register () {
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState("");

    const register = (event) => {
        event.preventDefault();
        const data = {
            first_name: firstName,
            email: email,
            password: password,
            birth_date: birthday,
            height: height,
        }
        axios.post("http://localhost:8080/auth/register", data).then(() => {
            alert('Ucet bol vytvoreny!');
            navigator('/dashboard');
        });
    };

    return (
        <Container className="mt-5 col-12 col-md-6 cl-md-offset-3">
            <Row>
                <h1>Register</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" onChange={(event) => {
                            setEmail(event.target.value);
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Meno</Form.Label>
                        <Form.Control type="text" placeholder="Meno" name="email" onChange={(event) => {
                            setFirstName(event.target.value);
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Vek</Form.Label>
                        <Form.Control type="date" placeholder="yyyy/mm/dd" name="birth_date" onChange={(event) => {
                            setBirthday(event.target.value);
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPass">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control type="password" placeholder="Heslo" name="password" onChange={(event) => {
                            setPassword(event.target.value);
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicHeight">
                        <Form.Label>Výška</Form.Label>
                        <Form.Control type="number" placeholder="Výška" name="password" onChange={(event) => {
                            setHeight(event.target.value);
                        }} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={register}>
                        Registrovať
                    </Button>
                </Form>
            </Row>

        </Container>

    );
}

export default Register;