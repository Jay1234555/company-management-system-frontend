
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

    const userData = localStorage.getItem("user");


    // Not logged in
    if (!userData) {
        return <Navigate to="/login" replace />;
    }


    let user;

    try {

        user = JSON.parse(userData);

    } catch (error) {

        localStorage.removeItem("user");

        return <Navigate to="/login" replace />;
    }


    // Logged in but not admin
    if (user.role !== "ADMIN") {

        return <Navigate to="/" replace />;

    }


    // Admin
    return children;
}

export default PrivateRoute;
