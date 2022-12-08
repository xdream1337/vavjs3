import React from "react";
import { useAuth } from "../helpers/Auth";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Container, Row, Table } from "react-bootstrap";



function Pressure () {

    const { user, setUser } = useAuth();

    const [pressures, setPressures] = useState([]);

    const [addPressure, showPressure] = useState(false);

    const [lowerPressure, setLowerPressure] = useState("");
    const [highPressure, setHigherPressure] = useState("");
    const [pressureMethods, setPressureMethods] = useState("");
    const [pressureMethod, setPressureMethod] = useState("");
    const [pressureTime, setPressureTime] = useState("");

    const [methodFilter, setMethodFilter] = useState("");

    const [timeTo, setTimeTo] = useState("");
    const [timeFrom, setTimeFrom] = useState("");

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
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

    function filter () {
        const data = { method: methodFilter, user_id: user.id, timeFrom: timeFrom, timeTo: timeTo };
        axios.post("http://localhost:8080/pressure/filter", {
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

    return (
        <div>
            <Container>
                <Row className="text-center my-5">
                    <h1>Merania tlaku</h1>
                </Row>
            </Container>

            <Container>
                <Row>
                    <table>
                        <tbody>
                            <tr className='filter'>
                                <td><input type="datetime-local" name="pressure-from" value={timeFrom} onChange={e => setTimeFrom(e.target.value)} /></td>
                                <td><input type="datetime-local" name="pressure-to" value={timeTo} onChange={e => setTimeTo(e.target.value)} /></td>
                                <td><select value={methodFilter} onChange={e => setMethodFilter(e.target.value)}>
                                    <option value="">Všetky</option>
                                    {pressureMethods && pressureMethods.length > 0 ? (pressureMethods.map((method, index) => {
                                        return <option key={index} value={method.name}>{method.name}</option>
                                    })) : (null)}
                                </select></td>
                                <td><button id="filter-pressure" className='btn btn-info' onClick={() => filter()}>Filtrovať</button></td>
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

export default Pressure;