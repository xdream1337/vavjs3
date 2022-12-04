import React from 'react'

function Register () {
    return (
        <Container className="mt-5 col-12 col-md-6 cl-md-offset-3">
            <Row>
                <h1>Registrácia</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Meno</Form.Label>
                        <Form.Control type="text" placeholder="Meno" name="first_name" />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Label>Vek</Form.Label>
                        <Form.Control type="number" label="Vek" name="age" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicHeight">
                        <Form.Label>Výška</Form.Label>
                        <Form.Control type="number" label="Výška" name="height" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onclick={register}>
                        Registrovať
                    </Button>
                </Form>
            </Row>

        </Container >
    )
}

export default Register;