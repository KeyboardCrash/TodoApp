import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Register.css";
import {
    useNavigate
} from 'react-router-dom';

import { toast } from 'react-toastify';

import helper from '../../lib/helper';


const Register = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

    const navigate = useNavigate();

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function registerUser(credentials) {
        return fetch(API_ENDPOINT + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .catch(e => {
            helper.failedToConnectAlert();
            console.log(e);
            return {};
        })

    

    }

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const credentials = {
            username,
            password
        };

        const res = await registerUser(credentials);
        console.log(res);
        const body = await res.json()
        console.log(body)
        if (res.ok) {
            // console.log(`success: ${res.message}`);
            const notify = () => toast("User Account Created", {
                toastId: 'registered'
            });
            notify();
            await timeout(1500);
            navigate('/');
        } else {
            const notify = () => toast.error(`Failed to create account ${username}: ${body.message}`, {
                toastId: 'failToRegister'
            });
            notify();
            // console.log(`error: ${res.message}`);
        }

    }

    return (
        <div className="Register">

            <Form onSubmit={handleSubmit}>
                <h2 style={{
                    textAlign: 'center'
                }}>Register</h2>
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
                    Create new account
                </Button>

            </Form>
        </div>
    );
}

export default Register;