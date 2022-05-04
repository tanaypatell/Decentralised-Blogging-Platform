import React, { Component, useEffect, useState } from 'react';
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ContractProvider } from './context/ContractProvider';


export default function App() {
    const currentUser = true;


    return (
        <div>
            <ContractProvider>
                <Router>
                    <Topbar />
                    <Switch>
                        <Route exact path="/">
                            <Homepage />
                        </Route>
                        <Route path="/posts">
                            <Homepage />
                        </Route>

                        <Route path="/register">
                            {currentUser ? <Homepage /> : <Register />}
                        </Route>
                        <Route path="/login">{currentUser ? <Homepage /> : <Login />}</Route>
                        <Route path="/post/:blogHash">
                            <Single />
                        </Route>
                        <Route path="/write">{currentUser ? <Write /> : <Login />}</Route>
                        <Route path="/settings">
                            {currentUser ? <Settings /> : <Login />}
                        </Route>
                    </Switch>
                </Router>
            </ContractProvider>
        </div>
    );
}
