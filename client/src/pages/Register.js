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
    const [age, setAge] = useState("");
    const [weight, setHeight] = useState("");

    const register = (data) => {
        axios.post("http://localhost:8080/users/register", data).then(() => {
            console.log(data);
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

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Meno</Form.Label>
                        <Form.Control type="text" placeholder="Meno" name="email" onChange={(event) => {
                            setFirstName(event.target.value);
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control type="password" placeholder="Heslo" name="password" onChange={(event) => {
                            setPassword(event.target.value);
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Vek</Form.Label>
                        <Form.Control type="number" placeholder="Vek" name="password" onChange={(event) => {
                            setHeight(event.target.value);
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
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