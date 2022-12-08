import React from "react";
import { useAuth } from "../helpers/Auth";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Container, Row, Table } from "react-bootstrap";



function Stats () {

    const { user, setUser } = useAuth();

    const [pressures, setPressures] = useState([]);

    const [addPressure, showPressure] = useState(false);

    const [lowerPressure, setLowerPressure] = useState("");
    const [highPressure, setHigherPressure] = useState("");
    const [pressureMethods, setPressureMethods] = useState("");
    const [pressureMethod, setPressureMethod] = useState("");
    const [pressureTime, setPressureTime] = useState("");

    const [pressureMethodFilter, setPressureMethodFilter] = useState("");

    const [pressureTimeTo, setPressureTimeTo] = useState("");
    const [pressureTimeFrom, setPressureTimeFrom] = useState("");

    const [weights, setWeights] = useState([]);

    const [addWeight, showWeight] = useState(false);

    const [weight, setWeight] = useState("");
    const [weightMethods, setWeightMethods] = useState("");
    const [weightMethod, setWeightMethod] = useState("");
    const [weightTime, setWeightTime] = useState("");

    const [methodFilter, setMethodFilter] = useState("");

    const [timeTo, setTimeTo] = useState("");
    const [timeFrom, setTimeFrom] = useState("");

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
            axios.post("http://localhost:8080/weight/all", {
                data: { user_id: user.id },
                headers: {
                    auth_token: localStorage.getItem("auth_token"),
                },
            }).then((response) => {
                setWeights(response.data.weights);
            });

            axios.post("http://localhost:8080/weight/method/all", {
                data: { user_id: user.id },
                headers: {
                    auth_token: localStorage.getItem("auth_token"),
                },
            }).then((response) => {
                setWeightMethods(response.data.weights);
            });

            axios.post("http://localhost:8080/pressure/all", {
                data: { user_id: user.id },
                headers: {
                    auth_token: localStorage.getItem("auth_token"),
                },
            }).then((response) => {
                setPressures(response.data.pressure);
            });

            axios.post("http://localhost:8080/pressure/method/all", {
                data: { user_id: user.id },
                headers: {
                    auth_token: localStorage.getItem("auth_token"),
                },
            }).then((response) => {
                setPressureMethods(response.data.pressure);
            });
        }
    }, []);


    async function sendNewWeight () {
        const data = { weight: weight, method: weightMethod, user_id: user.id, date: weightTime };
        axios.post("http://localhost:8080/weight/add", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setWeights(response.data.weights);
                showWeight(false);
                //alert('metoda vahy bola pridana');
            }
        });
    }

    async function removeWeight (id) {
        const data = { weight_id: id, user_id: user.id };
        axios.post("http://localhost:8080/weight/remove", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setWeights(response.data.weights);
                showWeight(false);
            }
        });
    }

    function filterWeight () {
        const data = { method: methodFilter, user_id: user.id, timeFrom: timeFrom, timeTo: timeTo };
        axios.post("http://localhost:8080/weight/filter", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setWeights(response.data.weights);
                showWeight(false);
            }
        });
    }

    async function sendNewPressure () {
        const data = { high_pressure: highPressure, lower_pressure: lowerPressure, method: pressureMethod, user_id: user.id, date: pressureTime };
        axios.post("http://localhost:8080/pressure/add", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setPressures(response.data.pressure);
                showPressure(false);
                //alert('metoda vahy bola pridana');
            }
        });
    }

    async function removePressure (id) {
        const data = { presure_id: id, user_id: user.id };
        axios.post("http://localhost:8080/weight/remove", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setPressures(response.data.pressure);
                showPressure(false);
            }
        });
    }

    function filterPressure () {
        const data = { method: pressureMethodFilter, user_id: user.id, timeFrom: pressureTimeFrom, timeTo: pressureTimeTo };
        axios.post("http://localhost:8080/weight/filter", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setWeights(response.data.weights);
                showWeight(false);
            }
        });
    }

    return (
        <div>
            <Container>
                <Row className="text-center my-5">
                    <h1>Štatistiky</h1>
                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <h2>Merania váhy</h2>
                </Row>
            </Container>

            <Container>
                <Row>
                    <table>
                        <tbody>
                            <tr className='filter'>
                                <td><input type="datetime-local" name="timestamp-weight-from" value={timeFrom} onChange={e => setTimeFrom(e.target.value)} /></td>
                                <td><input type="datetime-local" name="timestamp-weight-to" value={timeTo} onChange={e => setTimeTo(e.target.value)} /></td>
                                <td><select value={methodFilter} onChange={e => setMethodFilter(e.target.value)}>
                                    <option value="">Všetky</option>
                                    {weightMethods && weightMethods.length > 0 ? (weightMethods.map((method, index) => {
                                        return <option key={index} value={method.name}>{method.name}</option>
                                    })) : (null)}
                                </select></td>
                                <td><button id="filter-weight" className='btn btn-info' onClick={() => filterWeight()}>Filtrovať</button></td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <Button className="btn btn-primary my-2" onClick={() => showWeight(true)}>Pridať meranie</Button>

                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="required">Váha</th>
                                <th>Metóda</th>
                                <th className="required">Čas merania</th>
                            </tr>
                            {addWeight ?
                                <tr>
                                    <td><input type="number" name="weight" id="weight" value={weight} onChange={e => setWeight(e.target.value)} /></td>
                                    <td><select name="method" id="method" onChange={e => setWeightMethod(e.target.value)}>
                                        <option value="">Žiadna</option>
                                        {weightMethods && weightMethods.length > 0 ? (weightMethods.map((method, index) => {
                                            return <option key={index} value={method.name}>{method.name}</option>
                                        })) : (null)}
                                    </select></td>
                                    <td><input type="datetime-local" name="timestamp" value={weightTime} onChange={e => setWeightTime(e.target.value)} /></td>
                                    <td><button className="btn btn-success" onClick={() => sendNewWeight()}>Uložiť</button></td>
                                </tr>
                                : null}
                        </thead>
                        <tbody>
                            {weights && weights.length > 0 ? (weights.map((weight) => (
                                <tr>
                                    <td>{weight.weight}</td>
                                    <td>{weight.method}</td>
                                    <td>{weight.date}</td>
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
                    <h2>Merania tlaku</h2>
                </Row>
            </Container>

            <Container>
                <Row>
                    <table>
                        <tbody>
                            <tr className='filter'>
                                <td><input type="datetime-local" name="pressure-from" value={pressureTimeTo} onChange={e => setPressureTimeFrom(e.target.value)} /></td>
                                <td><input type="datetime-local" name="pressure-to" value={pressureTimeFrom} onChange={e => setPressureTimeTo(e.target.value)} /></td>
                                <td><select value={pressureMethodFilter} onChange={e => setPressureMethodFilter(e.target.value)}>
                                    <option value="">Všetky</option>
                                    {pressureMethods && pressureMethods.length > 0 ? (pressureMethods.map((method, index) => {
                                        return <option key={index} value={method.name}>{method.name}</option>
                                    })) : (null)}
                                </select></td>
                                <td><button id="filter-pressure" className='btn btn-info' onClick={() => filterPressure()}>Filtrovať</button></td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <Button className="btn btn-primary my-2" onClick={() => showPressure(true)}>Pridať meranie</Button>

                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="required">Spodný tlak</th>
                                <th>Horný tlak</th>
                                <th>Metóda</th>
                                <th className="required">Čas merania</th>
                            </tr>
                            {addPressure ?
                                <tr>
                                    <td><input type="number" name="lower_pressure" id="lower_pressure" value={lowerPressure} onChange={e => setLowerPressure(e.target.value)} /></td>
                                    <td><input type="number" name="high_pressure" id="high_pressure" value={highPressure} onChange={e => setHigherPressure(e.target.value)} /></td>
                                    <td><select name="method" id="method" onChange={e => setPressureMethod(e.target.value)}>
                                        <option value="">Žiadna</option>
                                        {pressureMethods && pressureMethods.length > 0 ? (pressureMethods.map((method, index) => {
                                            return <option key={index} value={method.name}>{method.name}</option>
                                        })) : (null)}
                                    </select></td>
                                    <td><input type="datetime-local" name="timestamp" value={pressureTime} onChange={e => setPressureTime(e.target.value)} /></td>
                                    <td><button className="btn btn-success" onClick={() => sendNewPressure()}>Uložiť</button></td>
                                </tr>
                                : null}
                        </thead>
                        <tbody>
                            {pressures && pressures.length > 0 ? (pressures.map((pressure) => (
                                <tr>
                                    <td>{pressure.lower_pressure}</td>
                                    <td>{pressure.high_pressure}</td>
                                    <td>{pressure.method}</td>
                                    <td>{pressure.date}</td>
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

export default Stats;