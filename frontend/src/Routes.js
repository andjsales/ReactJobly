import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CompanyList from "./components/CompanyList";
import CompanyDetails from "./components/CompanyDetails";
import JobList from "./components/JobList";
import Login from "./components/Login";
// import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/companies" component={ CompanyList } />
            <Route path="/companies/:handle" component={ CompanyDetails } />
            <Route path="/jobs" component={ JobList } />
            <Route path="/login" component={ Login } />
            <Route path="/signup" component={ SignUp } />
            <Route path="/profile" component={ Profile } />
        </Switch>
    );
};

export default Routes;
