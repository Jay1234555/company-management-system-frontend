import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS_PAGES/AdminSidebar.css";

function AdminSidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="admin-sidebar">

            <div className="admin-sidebar-title">
                <h2>Admin Panel</h2>
            </div>


            <div className="admin-sidebar-links">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/admin/services">
                    Services
                </Link>

                <Link to="/admin/projects">
                    Projects
                </Link>

                <Link to="/admin/achievements">
                    Achievements
                </Link>

                <Link to="/admin/contacts">
                    Contacts
                </Link>

                <Link to="/admin/groups">
                    Groups
                </Link>

            </div>


            <div className="admin-sidebar-bottom">

                <button
                    onClick={handleLogout}
                    className="admin-sidebar-logout"
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default AdminSidebar;