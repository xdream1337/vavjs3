import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { AuthContext } from "../helpers/AuthContext";
function Home () {


    const { authState, setAuthState } = React.useContext(AuthContext);

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