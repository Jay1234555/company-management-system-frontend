
import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/Projects.css";

function Projects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await API.get("/projects");

            setProjects(response.data);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching projects:", error);

            setError("Unable to load projects.");
            setLoading(false);
        }
    };

    return (
        <div className="projects-page">

            {/* Header */}
            <section className="projects-header">

                <h1>Our Projects</h1>

                <p>
                    Explore some of our completed and ongoing
                    technology projects.
                </p>

            </section>


            {/* Projects */}
            <section className="projects-container">

                {loading && (
                    <p className="loading">
                        Loading projects...
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {!loading && !error && projects.length === 0 && (
                    <p className="no-projects">
                        No projects available.
                    </p>
                )}

                {!loading && !error && projects.map((project) => (

                    <div
                        className="project-card"
                        key={project.id}
                    >

                        {project.imageUrl && (
                            <img
                                src={project.imageUrl}
                                alt={project.projectName}
                                className="project-image"
                            />
                        )}

                        <div className="project-content">

                            <h2>
                                {project.projectName}
                            </h2>

                            <p>
                                {project.description}
                            </p>

                            <div className="project-technology">
                                <strong>Technology:</strong>{" "}
                                {project.technology}
                            </div>

                        </div>

                    </div>

                ))}

            </section>

        </div>
    );
}

export default Projects;

