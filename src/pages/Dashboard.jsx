
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS_PAGES/Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="dashboard-page">

            {/* Dashboard Header */}

            <div className="dashboard-header">

                <div>
                    <h1>Admin Dashboard</h1>

                    <p>
                        Welcome, {user?.name || "Admin"}
                    </p>
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>


            {/* Dashboard Cards */}

            <div className="dashboard-container">

                {/* Services */}

                <div className="dashboard-card">

                    <div className="card-icon">
                        🛠️
                    </div>

                    <h2>Services</h2>

                    <p>
                        Manage company services.
                    </p>

                    <Link to="/admin/services">
                        <button>
                            Manage Services
                        </button>
                    </Link>

                </div>


                {/* Projects */}

                <div className="dashboard-card">

                    <div className="card-icon">
                        📁
                    </div>

                    <h2>Projects</h2>

                    <p>
                        Manage company projects.
                    </p>

                    <Link to="/admin/projects">
                        <button>
                            Manage Projects
                        </button>
                    </Link>

                </div>


                {/* Achievements */}

                <div className="dashboard-card">

                    <div className="card-icon">
                        🏆
                    </div>

                    <h2>Achievements</h2>

                    <p>
                        Manage company achievements.
                    </p>

                    <Link to="/admin/achievements">
                        <button>
                            Manage Achievements
                        </button>
                    </Link>

                </div>


                {/* Contacts */}

                <div className="dashboard-card">

                    <div className="card-icon">
                        📩
                    </div>

                    <h2>Contacts</h2>

                    <p>
                        View customer messages.
                    </p>

                    <Link to="/admin/contacts">
                        <button>
                            View Contacts
                        </button>
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;