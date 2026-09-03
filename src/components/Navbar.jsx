
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS_PAGES/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo */}

                <Link to="/" className="navbar-logo">
                    Company
                </Link>


                {/* Navigation */}

                <div className="navbar-links">

                    <Link to="/">Home</Link>

                    <Link to="/about">About</Link>

                    <Link to="/services">Services</Link>

                    <Link to="/projects">Projects</Link>

                    <Link to="/contact">Contact</Link>


                    {/* Admin */}

                    {user ? (

                        <>
                            <Link to="/dashboard">
                                Dashboard
                            </Link>

                            <button
                                className="navbar-logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>

                    ) : (

                        <Link
                            to="/login"
                            className="navbar-login"
                        >
                            Login
                        </Link>

                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
