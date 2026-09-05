import React from "react"; 
import { Link } from "react-router-dom";
 import "../CSS_PAGES/Navbar.css";
  function Navbar()
   { const user = JSON.parse(localStorage.getItem("user"));
     return ( <nav className="navbar"> <div className="navbar-container">
         {/* Logo */} <Link to="/" className="navbar-logo"> Company </Link> 
         {/* Navigation */} <div className="navbar-links"> 
            <Link to="/">Home</Link> 
            <Link to="/about">About</Link>
             <Link to="/services">Services</Link>
              <Link to="/projects">Projects</Link>
               <Link to="/contact">Contact</Link>
             {/* Login Buttons */} 
             {!user && ( <> <Link to="/login" className="navbar-login" > User Login </Link> 
             <Link to="/login" className="navbar-admin-login" > Admin Login </Link> </> )} 
                </div> 
                </div>
                 </nav> ); }
 export default Navbar;