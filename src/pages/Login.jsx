import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import "../CSS_PAGES/Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginType, setLoginType] = useState("USER");

    const navigate = useNavigate();


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("")
        

        try {

            const response = await API.post(
                "/users/login",
                {
                    email: email,
                    password: password
                }
            );

            if (
                loginType === "ADMIN" &&
                response.data.role !== "ADMIN"
            ) {

                setError("This account is not an Admin account.");

                return;
            }

            if (
                loginType === "USER" &&
                response.data.role === "ADMIN"
            ) {

                setError("Please switch to Admin Login.");

                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );
            
            if (response.data.role === "ADMIN") {


                navigate("/dashboard");

            } else {


                navigate("/");

            }


        } catch (error) {

            console.error("Login error:", error);

            if (error.response) {

                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Invalid email or password"
                );

            } else {

                setError("Cannot connect to server");

            }

        }

    };


    return (
        <div className="login-page">

            <div className="login-card">

                <h1>
                    {loginType === "ADMIN"
                        ? "Admin Login"
                        : "User Login"}
                </h1>

                <p className="login-subtitle">
                    {loginType === "ADMIN"
                        ? "Login to Admin Dashboard"
                        : "Login to your account"}
                </p>

                <div className="login-switch">

                    <button
                        type="button"
                        className={
                            loginType === "USER"
                                ? "switch-button active"
                                : "switch-button"
                        }
                        onClick={() => {
                            setLoginType("USER");
                            setError("");
                        }}
                    >
                        User
                    </button>

                    <button
                        type="button"
                        className={
                            loginType === "ADMIN"
                                ? "switch-button admin-active"
                                : "switch-button"
                        }
                        onClick={() => {
                            setLoginType("ADMIN");
                            setError("");
                        }}
                    >
                        Admin
                    </button>

                </div>

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
                        {loginType === "ADMIN"
                            ? "Login as Admin"
                            : "Login as User"}
                    </button>


                </form>

            </div>

        </div>
    );
}

export default Login;
