import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Login.css";
import { useAppContext } from "../../lib/contextLib";
import {
    useNavigate
} from 'react-router-dom';

import { toast } from 'react-toastify';
import helper from '../../lib/helper';

const Login = (props) => {
    const { userHasAuthenticated } = useAppContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

    const navigate = useNavigate();

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    async function loginUser(credentials) {

        return fetch(API_ENDPOINT + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())
        .catch (e => {
            helper.failedToConnectAlert();
            console.log(e);
            return {};
        })


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
            const notify = () => toast("Successfully logged in! Redirecting...", {
                toastId: 'loggedIn'
            });
            notify();
            await timeout(1500);
            navigate('/', { replace: true })
        } else {
            const notify = () => toast.error(`Error: ${res.message}`, {
                toastId: 'failedLogin'
            });
            notify();
            console.log(`error: ${res.message}`);
        }

    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <h2 style={{
                    textAlign: 'center'
                }}>Login</h2>
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

export default Login;