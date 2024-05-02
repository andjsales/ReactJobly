import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <NavLink end to="/">Home</NavLink>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </nav>
    );
};

export default Navigation;
