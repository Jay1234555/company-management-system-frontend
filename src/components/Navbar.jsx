import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS_PAGES/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

        window.location.reload();
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="navbar-logo">
                    Company
                </Link>

                <div className="navbar-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/services">
                        Services
                    </Link>

                    <Link to="/projects">
                        Projects
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className="navbar-login"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="navbar-register"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {user && user.role === "ADMIN" && (
                        <Link
                            to="/dashboard"
                            className="navbar-dashboard"
                        >
                            Dashboard
                        </Link>
                    )}

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="navbar-logout"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
