
import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/AdminServices.css";

function AdminServices() {

    const [services, setServices] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadServices();
    }, []);

    // Get services
    const loadServices = async () => {

        try {

            const response = await API.get("/services");

            setServices(response.data);

        } catch (error) {

            console.error("Error loading services:", error);

        }
    };


    // Clear form
    const clearForm = () => {

        setTitle("");
        setDescription("");
        setImageUrl("");
        setEditingId(null);

    };


    // Add / Update
    const handleSubmit = async (e) => {

        e.preventDefault();

        const serviceData = {
            title: title,
            description: description,
            imageUrl: imageUrl
        };

        try {

            if (editingId) {

                await API.put(
                    `/services/${editingId}`,
                    serviceData
                );

                alert("Service updated successfully");

            } else {

                await API.post(
                    "/services",
                    serviceData
                );

                alert("Service added successfully");

            }

            clearForm();

            loadServices();

        } catch (error) {

            console.error("Error saving service:", error);

            alert("Failed to save service");

        }
    };


    // Edit
    const handleEdit = (service) => {

        setEditingId(service.id);

        setTitle(service.title);

        setDescription(service.description);

        setImageUrl(service.imageUrl || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // Delete
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this service?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(`/services/${id}`);

            alert("Service deleted successfully");

            loadServices();

        } catch (error) {

            console.error("Error deleting service:", error);

            alert("Failed to delete service");

        }
    };


    return (
        <div className="admin-services">

            <div className="admin-services-header">

                <h1>
                    {editingId
                        ? "Edit Service"
                        : "Add New Service"}
                </h1>

                <p>
                    Manage your company services
                </p>

            </div>


            {/* Form */}

            <form
                className="service-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Service Title</label>

                    <input
                        type="text"
                        value={title}
                        placeholder="Enter service title"
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        value={description}
                        placeholder="Enter service description"
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Image URL</label>

                    <input
                        type="text"
                        value={imageUrl}
                        placeholder="Enter image URL"
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
                            ? "Update Service"
                            : "Add Service"}
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


            {/* Services List */}

            <div className="services-list">

                <h2>Existing Services</h2>


                {services.length === 0 ? (

                    <p className="no-services">
                        No services found.
                    </p>

                ) : (

                    <div className="admin-service-grid">

                        {services.map((service) => (

                            <div
                                className="admin-service-card"
                                key={service.id}
                            >

                                {service.imageUrl && (

                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                    />

                                )}


                                <div className="admin-service-content">

                                    <h3>
                                        {service.title}
                                    </h3>

                                    <p>
                                        {service.description}
                                    </p>


                                    <div className="admin-service-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(service)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(service.id)
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

export default AdminServices;
