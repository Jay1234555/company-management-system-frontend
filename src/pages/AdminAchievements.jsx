
import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/AdminAchievements.css";

function AdminAchievements() {

    const [achievements, setAchievements] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        loadAchievements();
    }, []);


    // GET all achievements
    const loadAchievements = async () => {

        try {

            const response = await API.get("/achievements");

            setAchievements(response.data);

        } catch (error) {

            console.error(
                "Error loading achievements:",
                error
            );

        }
    };


    // Clear form
    const clearForm = () => {

        setTitle("");
        setDescription("");

        setEditingId(null);

    };


    // ADD / UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        const achievementData = {
            title: title,
            description: description
        };


        try {

            if (editingId) {

                await API.put(
                    `/achievements/${editingId}`,
                    achievementData
                );

                alert(
                    "Achievement updated successfully"
                );

            } else {

                await API.post(
                    "/achievements",
                    achievementData
                );

                alert(
                    "Achievement added successfully"
                );

            }


            clearForm();

            loadAchievements();

        } catch (error) {

            console.error(
                "Error saving achievement:",
                error
            );

            alert("Failed to save achievement");

        }
    };


    // EDIT
    const handleEdit = (achievement) => {

        setEditingId(achievement.id);

        setTitle(achievement.title);

        setDescription(achievement.description);


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this achievement?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await API.delete(
                `/achievements/${id}`
            );

            alert(
                "Achievement deleted successfully"
            );

            loadAchievements();

        } catch (error) {

            console.error(
                "Error deleting achievement:",
                error
            );

            alert(
                "Failed to delete achievement"
            );

        }
    };


    return (
        <div className="admin-achievements">

            {/* Header */}

            <div className="admin-achievements-header">

                <h1>
                    {editingId
                        ? "Edit Achievement"
                        : "Add New Achievement"}
                </h1>

                <p>
                    Manage your company achievements
                </p>

            </div>


            {/* Form */}

            <form
                className="achievement-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Achievement Title</label>

                    <input
                        type="text"
                        placeholder="Enter achievement title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        placeholder="Enter achievement description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-buttons">

                    <button
                        type="submit"
                        className="save-button"
                    >
                        {editingId
                            ? "Update Achievement"
                            : "Add Achievement"}
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


            {/* Achievement List */}

            <div className="achievements-list">

                <h2>Existing Achievements</h2>


                {achievements.length === 0 ? (

                    <p className="no-achievements">
                        No achievements found.
                    </p>

                ) : (

                    <div className="admin-achievement-grid">

                        {achievements.map((achievement) => (

                            <div
                                className="admin-achievement-card"
                                key={achievement.id}
                            >

                                <div className="achievement-icon">
                                    🏆
                                </div>

                                <div className="admin-achievement-content">

                                    <h3>
                                        {achievement.title}
                                    </h3>

                                    <p>
                                        {achievement.description}
                                    </p>


                                    <div className="admin-achievement-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(
                                                    achievement
                                                )
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    achievement.id
                                                )
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

export default AdminAchievements;
