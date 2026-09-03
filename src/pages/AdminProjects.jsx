
import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/AdminProjects.css";

function AdminProjects() {

    const [projects, setProjects] = useState([]);

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [technology, setTechnology] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        loadProjects();
    }, []);


    // GET all projects
    const loadProjects = async () => {

        try {

            const response = await API.get("/projects");

            setProjects(response.data);

        } catch (error) {

            console.error("Error loading projects:", error);

        }
    };


    // Clear form
    const clearForm = () => {

        setProjectName("");
        setDescription("");
        setTechnology("");
        setImageUrl("");

        setEditingId(null);

    };


    // ADD / UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        const projectData = {
            projectName: projectName,
            description: description,
            technology: technology,
            imageUrl: imageUrl
        };


        try {

            if (editingId) {

                await API.put(
                    `/projects/${editingId}`,
                    projectData
                );

                alert("Project updated successfully");

            } else {

                await API.post(
                    "/projects",
                    projectData
                );

                alert("Project added successfully");

            }


            clearForm();

            loadProjects();

        } catch (error) {

            console.error("Error saving project:", error);

            alert("Failed to save project");

        }
    };


    // EDIT
    const handleEdit = (project) => {

        setEditingId(project.id);

        setProjectName(project.projectName);

        setDescription(project.description);

        setTechnology(project.technology);

        setImageUrl(project.imageUrl || "");


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this project?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await API.delete(`/projects/${id}`);

            alert("Project deleted successfully");

            loadProjects();

        } catch (error) {

            console.error("Error deleting project:", error);

            alert("Failed to delete project");

        }
    };


    return (
        <div className="admin-projects">

            {/* Header */}

            <div className="admin-projects-header">

                <h1>
                    {editingId
                        ? "Edit Project"
                        : "Add New Project"}
                </h1>

                <p>
                    Manage your company projects
                </p>

            </div>


            {/* Form */}

            <form
                className="project-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Project Name</label>

                    <input
                        type="text"
                        placeholder="Enter project name"
                        value={projectName}
                        onChange={(e) =>
                            setProjectName(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        placeholder="Enter project description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Technology</label>

                    <input
                        type="text"
                        placeholder="Example: React, Spring Boot, MySQL"
                        value={technology}
                        onChange={(e) =>
                            setTechnology(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Image URL</label>

                    <input
                        type="text"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) =>
                            setImageUrl(e.target.value)
                        }
                    />

                </div>


                <div className="form-buttons">

                    <button
                        type="submit"
                        className="save-button"
                    >
                        {editingId
                            ? "Update Project"
                            : "Add Project"}
                    </button>


                    {editingId && (

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={clearForm}
                        >
                            Cancel
                        </button>

                    )}

                </div>

            </form>


            {/* Project List */}

            <div className="projects-list">

                <h2>Existing Projects</h2>


                {projects.length === 0 ? (

                    <p className="no-projects">
                        No projects found.
                    </p>

                ) : (

                    <div className="admin-project-grid">

                        {projects.map((project) => (

                            <div
                                className="admin-project-card"
                                key={project.id}
                            >

                                {project.imageUrl && (

                                    <img
                                        src={project.imageUrl}
                                        alt={project.projectName}
                                    />

                                )}


                                <div className="admin-project-content">

                                    <h3>
                                        {project.projectName}
                                    </h3>

                                    <p>
                                        {project.description}
                                    </p>

                                    <strong>
                                        Technology:
                                    </strong>

                                    <p>
                                        {project.technology}
                                    </p>


                                    <div className="admin-project-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(project)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(project.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminProjects;
