import React from "react";

function CreateMethod () {
    return (
        <div>
            <h1>Pridať metódu</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Názov metódy</Form.Label>
                    <Form.Control type="email" placeholder="Email" name="email" onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                </Form.Group>

                <Button onClick={login} variant="primary" type="submit">
                    Prihlásiť
                </Button>
            </Form>
        </div>
    );
}