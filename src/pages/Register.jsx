import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../CSS_PAGES/Register.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            await API.post(
                "/users/register",
                {
                    name: name,
                    email: email,
                    password: password
                }
            );

            setSuccess("Registration successful. Please login.");

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error("Registration error:", error);

            if (error.response) {

                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Registration failed"
                );

            } else {

                setError("Cannot connect to server");

            }
        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <h1>Register</h1>

                <p className="register-subtitle">
                    Create your user account
                </p>

                {error && (
                    <div className="register-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="register-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                    </div>

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

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="register-button"
                    >
                        Register
                    </button>

                </form>

                <p className="login-link">

                    Already have an account?

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Register;