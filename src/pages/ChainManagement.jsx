import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/Chains.css";

function ChainManagement() {

    const [chains, setChains] = useState([]);
    const [groups, setGroups] = useState([]);

    const [companyName, setCompanyName] = useState("");
    const [gstnNo, setGstnNo] = useState("");
    const [groupId, setGroupId] = useState("");

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        loadChains();
        loadGroups();
    }, []);


    // GET all chains
    const loadChains = async () => {

        try {

            const response = await API.get("/chains");

            setChains(response.data);

        } catch (error) {

            console.error("Error loading chains:", error);

        }
    };


    // GET all groups
    const loadGroups = async () => {

        try {

            const response = await API.get("/groups");

            // Only show active groups
            const activeGroups = response.data.filter(
                (group) => group.deleted === false
            );

            setGroups(activeGroups);

        } catch (error) {

            console.error("Error loading groups:", error);

        }
    };


    // Clear form
    const clearForm = () => {

        setCompanyName("");
        setGstnNo("");
        setGroupId("");

        setEditingId(null);

    };


    // ADD / UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (gstnNo.length !== 15) {

            alert("GSTN number must be exactly 15 characters");

            return;
        }

        if (!groupId) {

            alert("Please select a group");

            return;
        }


        const chainData = {

            companyName: companyName,

            gstnNo: gstnNo,

            group: {
                id: Number(groupId)
            }

        };


        try {

            if (editingId) {

                await API.put(
                    `/chains/${editingId}`,
                    chainData
                );

                alert("Chain updated successfully");

            } else {

                await API.post(
                    "/chains",
                    chainData
                );

                alert("Chain added successfully");

            }


            clearForm();

            loadChains();

        } catch (error) {

            console.error("Error saving chain:", error);

            const message =
                error.response?.data ||
                "Failed to save chain";

            alert(message);

        }
    };


    // EDIT
    const handleEdit = (chain) => {

        setEditingId(chain.chainId);

        setCompanyName(chain.companyName);

        setGstnNo(chain.gstnNo);

        setGroupId(chain.group?.id || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this chain?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await API.delete(`/chains/${id}`);

            alert("Chain deleted successfully");

            loadChains();

        } catch (error) {

            console.error("Error deleting chain:", error);

            alert(
                error.response?.data ||
                "Failed to delete chain"
            );

        }
    };


    return (

        <div className="admin-chains">

            {/* Header */}

            <div className="admin-chains-header">

                <h1>
                    {editingId
                        ? "Edit Chain"
                        : "Add New Chain"}
                </h1>

                <p>
                    Manage company chains
                </p>

            </div>


            {/* Form */}

            <form
                className="chain-form"
                onSubmit={handleSubmit}
            >

                {/* Company Name */}

                <div className="form-group">

                    <label>Company Name</label>

                    <input
                        type="text"
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) =>
                            setCompanyName(e.target.value)
                        }
                        required
                    />

                </div>


                {/* GSTN */}

                <div className="form-group">

                    <label>GSTN Number</label>

                    <input
                        type="text"
                        placeholder="Enter 15 character GSTN"
                        value={gstnNo}
                        maxLength={15}
                        onChange={(e) =>
                            setGstnNo(e.target.value.toUpperCase())
                        }
                        required
                    />

                </div>


                {/* Group Dropdown */}

                <div className="form-group">

                    <label>Select Group</label>

                    <select
                        value={groupId}
                        onChange={(e) =>
                            setGroupId(e.target.value)
                        }
                        required
                    >

                        <option value="">
                            -- Select Group --
                        </option>

                        {groups.map((group) => (

                            <option
                                key={group.id}
                                value={group.id}
                            >
                                {group.name}
                            </option>

                        ))}

                    </select>

                </div>


                {/* Buttons */}

                <div className="form-buttons">

                    <button
                        type="submit"
                        className="save-button"
                    >
                        {editingId
                            ? "Update Chain"
                            : "Add Chain"}
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


            {/* Chains List */}

            <div className="chains-list">

                <h2>Existing Chains</h2>


                {chains.length === 0 ? (

                    <p className="no-chains">
                        No chains found.
                    </p>

                ) : (

                    <div className="admin-chain-grid">

                        {chains.map((chain) => (

                            <div
                                className="admin-chain-card"
                                key={chain.chainId}
                            >

                                <div className="admin-chain-content">

                                    <h3>
                                        {chain.companyName}
                                    </h3>

                                    <p>
                                        <strong>GSTN:</strong>{" "}
                                        {chain.gstnNo}
                                    </p>

                                    <p>
                                        <strong>Group:</strong>{" "}
                                        {chain.group?.name || "N/A"}
                                    </p>


                                    <div className="admin-chain-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(chain)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    chain.chainId
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

export default ChainManagement;