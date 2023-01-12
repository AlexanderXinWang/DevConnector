import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import './App.css';

const App = () => {
    useEffect(() => {
        // check for token in LS when app first runs
        if (localStorage.token) {
            // if there is a token set axios headers for all requests
            setAuthToken(localStorage.token);
        }
        // try to fetch a user, if no token or invalid token we
        // will get a 401 response from our API
       store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Alert />
                <Route path="/" element={<Landing />} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Router>
        </Provider>
    )
};

export default App;
