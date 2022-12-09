import React from "react";
import { useAuth } from "../helpers/Auth";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Container, Row, Table } from "react-bootstrap";



function Dashboard () {

    const { user, setUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [ad, setAdData] = useState([]);

    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState("");
    const [src, setSrc] = useState("");
    const [href, setHref] = useState("");
    const [changeAd, setChangeAd] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/auth/users/all", {
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            setUsers(response.data.users);
        }).catch((error) => { console.log(error); })

        axios.get("http://localhost:8080/ad/get", {
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            setAdData(response.data.ad);
        }).catch((error) => { console.log(error); });
    }, []);

    async function addNewUser (event) {
        event.preventDefault();

        const data = {
            first_name: firstName,
            email: email,
            password: password,
            age: age,
            height: height,
        }

        axios.post("http://localhost:8080/auth/register", data).then(() => {
            alert('Ucet bol vytvoreny!');
            showaddUser(false);
        });
    };

    async function removeUser (id) {
        const data = { id: id };
        axios.post("http://localhost:8080/auth/user/remove", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.error) {
                alert(response.error);
            } else {
                setUsers(response.data.users);
            }
        }).catch((error) => { console.log(error); });
    }


    async function changeAd () {
        const data = { href: href, src: src };
        axios.post("http://localhost:8080/ad/change", {
            data: data,
            headers: {
                auth_token: localStorage.getItem("auth_token"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setAdData(response.data.ad);
                setChangeAd(false);
            }
        }).catch((error) => { console.log(error); });
    }

    return (
        <div>
            <Container>
                <Row className="text-center my-5">
                    <h1>Admin dashboard</h1>
                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <h2>Používatelia</h2>
                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <Button className="btn btn-primary my-2" onClick={() => showaddUser(true)}>Pridať meranie</Button>

                    <Table className="table table-striped">
                        <thead>
                            {showaddUser ?
                                <tr>
                                    <th>Email</th>
                                    <th>Heslo</th>
                                    <th>Meno</th>
                                    <th>Vek</th>
                                    <th>Výška</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td><input type="text" name="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /></td>
                                    <td><input type="text" name="password" className="form-control" placeholder="Heslo" value={password} onChange={e => setPassword(e.target.value)} /></td>
                                    <td><input type="text" name="firstName" className="form-control" placeholder="Meno" value={firstName} onChange={e => setFirstName(e.target.value)} /></td>
                                    <td><input type="number" name="age" className="form-control" placeholder="Vek" value={age} onChange={e => setAge(e.target.value)} /></td>
                                    <td><input type="number" name="height" className="form-control" placeholder="Výška" value={height} onChange={e => setHeight(e.target.value)} /></td>
                                    <td><button className="btn btn-success" onClick={() => addNewUser()}>Pridať</button></td>
                                </tr>
                                : null}
                            <tr>
                                <th>Email</th>
                                <th>Meno</th>
                                <th>Vek</th>
                                <th>Výška</th>
                                <th>Vymazať</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? (users.map((user) => (
                                <tr>
                                    <td>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.height}</td>
                                    <td>
                                        <Button className="btn btn-danger" onClick={() => { removeUser(user.id) }}>Vymazať</Button>
                                    </td>
                                </tr>
                            ))) : null}
                        </tbody>
                    </Table>

                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <h2>Reklama</h2>
                </Row>
            </Container>

            <Container>
                <Row className="text-center my-5">
                    <Button className="btn btn-primary my-2" onClick={() => showChangeAd(true)}>Zmeniť reklamu</Button>

                    <Table className="table table-striped">
                        <thead>

                            {addNewad ?
                                <tr>
                                    <td><input type="text" name="href" id="href" value={href} onChange={e => setHref(e.target.value)} /></td>
                                    <td><input type="text" name="src" id="src" value={src} onChange={e => setSrc(e.target.value)} /></td>
                                    <td><button className="btn btn-success" onClick={() => changeAd()}>Uložiť</button></td>
                                </tr>
                                : null}

                            <tr>
                                <th className="required">Link/Href</th>
                                <th>ImageSrc</th>
                                <th className="required">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{ad.href}</td>
                                <td>{ad.src}</td>
                                <td>{ad.count}</td>
                            </tr>
                        </tbody>
                    </Table>

                </Row>
            </Container>


        </div>


    );
}

export default Dashboard;