import React, { useEffect, useState } from 'react';

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';
import RoutesTree from './components/RoutesTree';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "./lib/contextLib";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const navigate = useNavigate();
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    function failedToConnectAlert() {
        const notify = () => toast.error(`Failed to connect to server`, {
            toastId: 'failedToConnect'
        });
        notify();
    }

    async function handleLogout() {
        userHasAuthenticated(false);
        localStorage.removeItem("accessToken");
        const redirLogout = async () => {
            const notify = () => toast("Logging out!", {
                toastId: 'loggingOut'
            });
            notify();
            navigate('/login');
        }
        redirLogout();

    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            fetch(API_ENDPOINT + '/getUsername', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data)
                    if (data.isLoggedIn === true) {
                        // const redirLoggedIn = async () => {
                        //     const notify = () => toast("Already logged in! Redirecting...", {
                        //         toastId: 'alreadyLoggedIn'
                        //     });
                        //     notify();
                        //     await timeout(1000);
                        //     navigate('/');
                        // }
                        // redirLoggedIn();
                        userHasAuthenticated(true)
                        navigate('/');
                    } else {
                        console.log(`Token invalid: ${token}`)
                    }
                }
            })
            .catch (e => {
                failedToConnectAlert();
                console.log(e);
            });
        }
    }, []);

    return (
        <div className="App py-3">
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">

                    <LinkContainer to="/">
                        <Navbar.Brand className="font-weight-bold text-muted">
                            <img src="./logo192.png" width="30" height="30" alt="" />
                            Todo App
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Text className="text-muted">
                        For when it's due tomorrow, I'll do it tomorrow
                    </Navbar.Text>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {isAuthenticated ? (
                                <LinkContainer to="/login">
                                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                </LinkContainer>
                            ) : (
                                <>
                                    <LinkContainer to="/register">
                                        <Nav.Link>Register</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <RoutesTree />
            </AppContext.Provider>
            <ToastContainer />

        </div>
    );
}

export default App;
