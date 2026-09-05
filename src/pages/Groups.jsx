import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/Groups.css";

function Groups() {

    const [groups, setGroups] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        loadGroups();
    }, []);


    // GET all groups
    const loadGroups = async () => {

        try {

            const response = await API.get("/groups");

            setGroups(response.data);

        } catch (error) {

            console.error("Error loading groups:", error);

        }
    };


    // Clear form
    const clearForm = () => {

        setName("");
        setDescription("");

        setEditingId(null);

    };


    // ADD / UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        const groupData = {
            name: name,
            description: description
        };


        try {

            if (editingId) {

                await API.put(
                    `/groups/${editingId}`,
                    groupData
                );

                alert("Group updated successfully");

            } else {

                await API.post(
                    "/groups",
                    groupData
                );

                alert("Group added successfully");

            }


            clearForm();

            loadGroups();

        } catch (error) {

            console.error("Error saving group:", error);

            alert("Failed to save group");

        }
    };


    // EDIT
    const handleEdit = (group) => {

        setEditingId(group.id);

        setName(group.name);

        setDescription(group.description);


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this group?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await API.delete(`/groups/${id}`);

            alert("Group deleted successfully");

            loadGroups();

        } catch (error) {

            console.error("Error deleting group:", error);

            alert("Failed to delete group");

        }
    };


    return (
        <div className="admin-groups">

            {/* Header */}

            <div className="admin-groups-header">

                <h1>
                    {editingId
                        ? "Edit Group"
                        : "Add New Group"}
                </h1>

                <p>
                    Manage your customer groups
                </p>

            </div>


            {/* Form */}

            <form
                className="group-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Group Name</label>

                    <input
                        type="text"
                        placeholder="Enter group name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        placeholder="Enter group description"
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
                            ? "Update Group"
                            : "Add Group"}
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


            {/* Groups List */}

            <div className="groups-list">

                <h2>Existing Groups</h2>


                {groups.length === 0 ? (

                    <p className="no-groups">
                        No groups found.
                    </p>

                ) : (

                    <div className="admin-group-grid">

                        {groups.map((group) => (

                            <div
                                className="admin-group-card"
                                key={group.id}
                            >

                                <div className="admin-group-content">

                                    <h3>
                                        {group.name}
                                    </h3>

                                    <p>
                                        {group.description}
                                    </p>


                                    <div className="admin-group-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(group)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(group.id)
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

export default Groups;