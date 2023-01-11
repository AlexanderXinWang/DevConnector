import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {

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
