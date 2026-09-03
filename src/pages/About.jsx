
import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/About.css";

function About() {

    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const response = await API.get("/achievements");

            setAchievements(response.data);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching achievements:", error);

            setError("Unable to load achievements.");
            setLoading(false);
        }
    };

    return (
        <div className="about-page">

            {/* About Header */}
            <section className="about-header">

                <h1>About Us</h1>

                <p>
                    We provide technology solutions that help
                    businesses grow and transform digitally.
                </p>

            </section>


            {/* Who We Are */}
            <section className="about-content">

                <h2>Who We Are</h2>

                <p>
                    We are a technology-focused company dedicated
                    to delivering reliable and customized software
                    solutions for modern businesses.
                </p>

                <p>
                    Our approach combines technical expertise,
                    innovation and customer value to create
                    solutions that make a real difference.
                </p>

            </section>


            {/* Achievements */}
            <section className="achievements-section">

                <h2>Our Achievements</h2>

                {loading && (
                    <p className="loading">
                        Loading achievements...
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {!loading &&
                    !error &&
                    achievements.length === 0 && (
                        <p className="no-achievements">
                            No achievements available.
                        </p>
                    )
                }


                {!loading &&
                    !error &&
                    achievements.length > 0 && (

                    <div className="achievements-container">

                        {achievements.map((achievement) => (

                            <div
                                className="achievement-card"
                                key={achievement.id}
                            >

                                <h3>
                                    {achievement.title}
                                </h3>

                                <p>
                                    {achievement.description}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default About;
