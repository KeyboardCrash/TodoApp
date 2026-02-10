import React from 'react';
import {
    Routes,
    Route,
    Navigate
  } from 'react-router-dom';

import Login from './Login/Login';
import Home from './Home/Home';
import Register from './Register/Register';

import NotFound from './NotFound/NotFound';
import { useAppContext } from "../lib/contextLib";

const RoutesTree = (props) => {
    const { isAuthenticated } = useAppContext();

    return (
        <Routes>
            <Route exact path="/" element={isAuthenticated ? <Home /> : <Navigate to='/login' /> } />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RoutesTree;