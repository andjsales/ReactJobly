import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import CompanyList from "../components/CompanyList";
import CompanyDetails from "../components/CompanyDetails";
import JobList from "../components/JobList";
import Login from "../components/Login";
import Profile from "../components/Profile";
import SignupForm from "../components/SignupForm";

// MARK: RoutesComponent
const RoutesComponent = ({ signup }) => {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/companies" element={ <CompanyList /> } />
            <Route path="/companies/:handle" element={ <CompanyDetails /> } />
            <Route path="/jobs" element={ <JobList /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <SignupForm signup={ signup } /> } />
            <Route path="/profile" element={ <Profile /> } />
        </Routes>
    );
};

export default RoutesComponent;
