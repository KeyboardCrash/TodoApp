import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Register.css";
import { useAppContext } from "../../lib/contextLib";


const Register = (props) => {
  const { userHasAuthenticated } = useAppContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function loginUser(credentials) {
    return fetch('http://localhost:7999/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
  

  async function handleSubmit(event) {
    event.preventDefault();

    const credentials = {
        username,
        password
    };

    const res = await loginUser(credentials);
    if ('token' in res) {
        localStorage.setItem('accessToken', res.token);
        userHasAuthenticated(true);
    } else {
        console.log(`error: ${res.message}`);
    }

  }

  return (
    <div className="Login">

      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>

      </Form>
    </div>
  );
}

export default Register;