import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../helpers/Auth";
function Home () {


    const [authState, setAuthState] = useState({
        email: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/check-token", {
                headers: {
                    auth_token: localStorage.getItem("auth_token"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, status: false });
                } else {
                    setAuthState({
                        email: response.data.email,
                        id: response.data.id,
                        status: true,
                    });
                }
            });
    }, []);

    return (
        <div>
            <h1>Homeeee</h1>
        </div>
    );
}

export default Home;