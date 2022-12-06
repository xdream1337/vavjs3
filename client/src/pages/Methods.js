import React from "react";
import { useAuth } from "../helpers/Auth";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Container, Row, Table } from "react-bootstrap";



function Methods () {


    const { user, setUser } = useAuth();

    const [weights, setWeight] = useState([]);
    const [pressure, setPressure] = useState([]);

    const [addWeight, showWeight] = useState(false);
    const [addPressure, showPressure] = useState(false);

    const [weightName, setWeightName] = useState("");
    const [weightDescription, setWeightDescription] = useState("");

    const [pressureName, setPressureName] = useState("");
    const [pressureDescription, setPressureDescription] = useState("");


    useEffect(() => {

        const loggedInUser = localStorage.getItem("user");
        console.log(loggedInUser)
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            console.log(foundUser);
        }

        if (localStorage.getItem("auth_token")) {
            axios.post("http://localhost:8080/weight/method/all", {
                data: { user_id: user.id },
                headers: {
                    auth_token: localStorage.getItem("auth_token"),
                },
            }).then((response) => {
                setWeight(response.data.weights);
            });

            axios.post("http://localhost:8080/pressure/method/all", {
                data: { user_id: user.id },
                headers: {
                    auth_token: localStorage.getItem("auth_token"),
                },
            }).then((response) => {
                setPressure(response.data.pressure);
            });
        }
    }, []);


    async function sendNewWeight () {

        const data = { name: weightName, description: weightDescription, user_id: user.id };
        axios.post("http://localhost:8080/weight/method/add", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setWeight([...weights, response.data.weights]);
                showWeight(false);
                alert('metoda vahy bola pridana');
            }
        });
    }

    async function removeWeight (id) {
        const data = { weight_id: id, user_id: user.id };
        axios.post("http://localhost:8080/weight/method/remove", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setWeight([...weights, response.data.weights]);
                showWeight(false);
            }
        });
    }

    async function sendNewPressure () {

        const data = { name: pressureName, description: pressureDescription, user_id: user.id };
        axios.post("http://localhost:8080/pressure/method/add", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setPressure([...pressure, response.data.weights]);
                showPressure(false);
                alert('metoda tlaku bola pridana');
            }
        });
    }

    async function removePressure (id) {
        const data = { pressure_id: id, user_id: user.id };
        axios.post("http://localhost:8080/pressure/method/remove", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setPressure([...pressure, response.data.pressure]);
                showPressure(false);
            }
        });
    }

    return (
        <div>
            <Container>
                <Row className="text-center my-5">
                    <h1>Metódy</h1>
                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <h2>Metódy váhy</h2>
                    <Button className="btn btn-primary my-2" onClick={() => showWeight(true)} >Pridať metódu váženia</Button>

                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Názov metódy</th>
                                <th scope="col">Popis metódy</th>
                                <th scope="col">Vymazať</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addWeight ? (
                                <tr>
                                    <td><input type="text" name="weight_method" className="form-control" placeholder="Názov metódy" value={weightName} onChange={e => setWeightName(e.target.value)} /></td>
                                    <td><input type="text" name="weight_description" placeholder="Popis" value={weightDescription} onChange={e => setWeightDescription(e.target.value)} /></td>
                                    <td><button type="button" className="btn btn-success" onClick={sendNewWeight}>Pridať</button></td>
                                </tr>)
                                : null}
                            {weights && weights.length > 0 ? (weights.map((weight) => (
                                <tr>
                                    <td>{weight.name}</td>
                                    <td>{weight.description}</td>
                                    <td>
                                        <Button className="btn btn-danger" onClick={() => { removeWeight(weight.id) }}>Vymazať</Button>
                                    </td>
                                </tr>
                            ))) : null}
                        </tbody>
                    </Table>

                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <h2>Metódy tlaku</h2>
                    <Button className="btn btn-primary my-2" onClick={() => showPressure(true)} >Pridať metódu tlaku</Button>

                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Názov metódy</th>
                                <th scope="col">Popis metódy</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {addPressure ? (
                                <tr>
                                    <td><input type="text" name="weight_method" className="form-control" placeholder="Názov metódy" value={pressureName} onChange={e => setPressureName(e.target.value)} /></td>
                                    <td><input type="text" name="weight_description" placeholder="Popis" value={pressureDescription} onChange={e => setPressureDescription(e.target.value)} /></td>
                                    <td><button type="button" className="btn btn-success" onClick={sendNewPressure}>Pridať</button></td>
                                </tr>)
                                : null}
                            {pressure && pressure.length > 0 ? (pressure.map((pressure) => (
                                <tr>
                                    <td>{pressure.name}</td>
                                    <td>{pressure.description}</td>
                                    <td>
                                        <Button className="btn btn-danger" onClick={() => { removePressure(pressure.id) }}>Vymazať</Button>
                                    </td>
                                </tr>
                            ))) : null}
                        </tbody>
                    </Table>
                </Row>
            </Container>


        </div>
    );
}

export default Methods;