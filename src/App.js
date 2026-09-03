
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminServices from "./pages/AdminServices";
import AdminProjects from "./pages/AdminProjects";
import AdminAchievements from "./pages/AdminAchievements";
import AdminContacts from "./pages/AdminContacts";
import PrivateRoute from "./pages/PrivateRoute";


function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* ================= PUBLIC ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/services"
                    element={<Services />}
                />

                <Route
                    path="/projects"
                    element={<Projects />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ================= ADMIN ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin/services"
                    element={
                        <PrivateRoute>
                            <AdminServices />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin/projects"
                    element={
                        <PrivateRoute>
                            <AdminProjects />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin/achievements"
                    element={
                        <PrivateRoute>
                            <AdminAchievements />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin/contacts"
                    element={
                        <PrivateRoute>
                            <AdminContacts />
                        </PrivateRoute>
                    }
                />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;
