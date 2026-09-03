
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../CSS_PAGES/Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        try {

            const response = await API.post(
                "/users/login",
                {
                    email: email,
                    password: password
                }
            );


            console.log(
                "Login successful:",
                response.data
            );


            // Save complete user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );


            // Check user role
            if (response.data.role === "ADMIN") {

                // Admin → Dashboard
                navigate("/dashboard");

            } else {

                // Normal User → Home
                navigate("/");

            }


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            if (error.response) {

                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Invalid email or password"
                );

            } else {

                setError(
                    "Cannot connect to server"
                );

            }

        }

    };


    return (
        <div className="login-page">

            <div className="login-card">

                <h1>Login</h1>

                <p className="login-subtitle">
                    Login to your account
                </p>


                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}


                <form onSubmit={handleLogin}>


                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>


                </form>

            </div>

        </div>
    );
}

export default Login;
