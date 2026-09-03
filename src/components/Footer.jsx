
import React from "react";
import { Link } from "react-router-dom";
import "../CSS_PAGES/Footer.css";

function Footer() {

    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Company */}

                <div className="footer-section">

                    <h2>Company</h2>

                    <p>
                        We provide innovative technology
                        solutions that help businesses grow,
                        transform and achieve their goals.
                    </p>

                </div>


                {/* Quick Links */}

                <div className="footer-section">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>

                    <Link to="/about">About</Link>

                    <Link to="/services">Services</Link>

                    <Link to="/projects">Projects</Link>

                    <Link to="/contact">Contact</Link>

                </div>


                {/* Contact */}

                <div className="footer-section">

                    <h3>Contact</h3>

                    <p>Email: info@company.com</p>

                    <p>Phone: +91 XXXXX XXXXX</p>

                    <p>India</p>

                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} Company.
                    All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;
