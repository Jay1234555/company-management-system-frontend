
import React from "react";
import { Link } from "react-router-dom";
import "../CSS_PAGES/Navbar.css";

function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="navbar-logo">
                    Company
                </Link>

                <div className="navbar-links">

                    <Link to="/">Home</Link>

                    <Link to="/about">About</Link>

                    <Link to="/services">Services</Link>

                    <Link to="/projects">Projects</Link>

                    <Link to="/contact">Contact</Link>

                    {!user && (
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
