
import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/Services.css";

function Services() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {

            console.log("Fetching services...");

            const response = await API.get("/services");

            console.log("Services received:", response.data);

            setServices(response.data);
            setLoading(false);

        } catch (error) {

            console.error("Services API Error:", error);

            setError("Unable to load services.");
            setLoading(false);
        }
    };

    return (
        <div className="services-page">

            <section className="services-header">

                <h1>Our Services</h1>

                <p>
                    We provide innovative technology solutions
                    to help businesses grow and transform.
                </p>

            </section>


            <section className="services-container">

                {loading && (
                    <p className="loading">
                        Loading services...
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {!loading &&
                    !error &&
                    services.length === 0 && (

                    <p className="no-services">
                        No services available.
                    </p>
                )}


                {!loading &&
                    !error &&
                    services.map((service) => (

                    <div
                        className="service-card"
                        key={service.id}
                    >

                        {service.imageUrl && (
                            <img
                                src={service.imageUrl}
                                alt={service.title}
                                className="service-image"
                            />
                        )}

                        <div className="service-content">

                            <h2>
                                {service.title}
                            </h2>

                            <p>
                                {service.description}
                            </p>

                        </div>

                    </div>

                ))}

            </section>

        </div>
    );
}

export default Services;
