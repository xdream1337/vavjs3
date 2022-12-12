import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import axios from "axios";
import './Add.css';

const Ad = () => {

    const [src, setSrc] = useState("");
    const [href, setHref] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchAdInterval = setInterval(() => {
            axios.get("http://localhost:8080/ad/get", {
                headers: {
                    auth_token: localStorage.getItem("auth_token"),
                },
            }).then((response) => {
                setSrc(response.data.ad.src);
                setHref(response.data.ad.href);
                setOpen(true);
            }).catch((error) => { console.log(error); })
        }, 60000);
        return () => clearInterval(fetchAdInterval);
    }, []);

    async function increment () {
        axios.get("http://localhost:8080/ad/increment", {
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
        }).catch((error) => { console.log(error); })
    }

    return (
        <>
            {open ?
                <div className="overlay">
                    <h1>Reklama</h1>
                    <a href={href} target="_blank" rel="noreferrer" onClick={increment}>
                        <img src={src} />
                    </a>
                    <button onClick={() => setOpen(false)}>Zavrieť</button>
                </div>
                : null}
        </>

    );
};

export default Ad;