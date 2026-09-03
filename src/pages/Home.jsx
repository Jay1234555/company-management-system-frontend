
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../CSS_PAGES/Home.css";

function Home() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {

            const response = await API.get("/services");

            console.log("Home Services:", response.data);

            setServices(response.data);
            setLoading(false);

        } catch (error) {

            console.error("Error fetching services:", error);

            setLoading(false);
        }
    };

    return (
        <div className="home">

            {/* ================= HERO SECTION ================= */}

            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Building the Future Through Technology
                    </h1>

                    <p>
                        We provide innovative technology solutions
                        that help businesses grow, transform and
                        achieve their goals.
                    </p>

                    <Link to="/services">
                        <button className="hero-button">
                            Explore Our Services
                        </button>
                    </Link>

                </div>

            </section>


            {/* ================= ABOUT SECTION ================= */}

            <section className="home-about">

                <h2>Who We Are</h2>

                <p>
                    We are focused on delivering reliable and
                    customized software solutions for modern
                    businesses. Our approach combines expertise,
                    innovation and customer value.
                </p>

                <Link to="/about">
                    <button className="about-button">
                        Learn More About Us
                    </button>
                </Link>

            </section>


            {/* ================= SERVICES SECTION ================= */}

            <section className="home-services">

                <h2>What We Do</h2>

                <p className="services-intro">
                    Explore our technology services designed to
                    help businesses grow and succeed.
                </p>


                {loading && (
                    <p className="home-loading">
                        Loading services...
                    </p>
                )}


                {!loading && services.length === 0 && (
                    <p className="home-no-services">
                        No services available.
                    </p>
                )}


                {!loading && services.length > 0 && (

                    <div className="service-preview">

                        {services.slice(0, 3).map((service) => (

                            <div
                                className="service-box"
                                key={service.id}
                            >

                                {service.imageUrl && (
                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                        className="home-service-image"
                                    />
                                )}

                                <h3>
                                    {service.title}
                                </h3>

                                <p>
                                    {service.description}
                                </p>

                            </div>

                        ))}

                    </div>

                )}


                <Link to="/services">

                    <button className="view-services-button">
                        View All Services
                    </button>

                </Link>

            </section>

        </div>
    );
}

export default Home;
