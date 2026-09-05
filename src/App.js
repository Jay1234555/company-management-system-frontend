import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";

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
import Groups from "./pages/Groups";


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

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <Dashboard />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />


                {/* Admin Services */}

                <Route
                    path="/admin/services"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <AdminServices />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />


                {/* Admin Projects */}

                <Route
                    path="/admin/projects"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <AdminProjects />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />


                {/* Admin Achievements */}

                <Route
                    path="/admin/achievements"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <AdminAchievements />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />


                {/* Admin Contacts */}

                <Route
                    path="/admin/contacts"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <AdminContacts />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />


                {/* Admin Groups */}

                <Route
                    path="/admin/groups"
                    element={
                        <PrivateRoute>
                            <AdminLayout>
                                <Groups />
                            </AdminLayout>
                        </PrivateRoute>
                    }
                />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;
