import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from "../../helpers/Auth";
import { Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';


const NavbarHeader = () => {

    const { user, logout } = useAuth();


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Osobná kondícia</Navbar.Brand>
                {user ? (
                    <Nav className="me-auto">
                        <Nav.Link href="/weights"> Meranie váhy</Nav.Link>
                        <Nav.Link href="/pressure"> Meranie tlaku </Nav.Link>
                        <Nav.Link href="/methods"> Metódy </Nav.Link>
                        <Nav.Link href="/stats"> Štatistiky </Nav.Link>
                    </Nav>
                ) : null
                }

                {user ? (
                    <Nav className="me-right d-flex">
                        <Button onClick={logout}>Odhlásenie</Button>
                        <br></br>
                        <p>logged in: {user.email}</p>
                    </Nav>
                ) : null
                }

            </Container>
        </Navbar>
    );
};

export default NavbarHeader;