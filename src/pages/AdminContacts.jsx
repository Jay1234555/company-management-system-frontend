
import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/AdminContacts.css";

function AdminContacts() {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        loadContacts();
    }, []);

    // GET all contacts
    const loadContacts = async () => {

        try {

            const response = await API.get("/contacts");

            setContacts(response.data);

        } catch (error) {

            console.error(
                "Error loading contacts:",
                error
            );

        }
    };


    // DELETE contact
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this message?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(`/contacts/${id}`);

            alert("Message deleted successfully");

            loadContacts();

        } catch (error) {

            console.error(
                "Error deleting contact:",
                error
            );

            alert("Failed to delete message");

        }
    };


    return (
        <div className="admin-contacts">

            <div className="admin-contacts-header">

                <h1>Contact Messages</h1>

                <p>
                    View messages received from website visitors.
                </p>

            </div>


            <div className="contacts-container">

                {contacts.length === 0 ? (

                    <div className="no-contacts">
                        No contact messages found.
                    </div>

                ) : (

                    <div className="contact-table-wrapper">

                        <table className="contact-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Message</th>

                                    <th>Date</th>

                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {contacts.map((contact) => (

                                    <tr key={contact.id}>

                                        <td>
                                            {contact.id}
                                        </td>

                                        <td>
                                            {contact.name}
                                        </td>

                                        <td>
                                            {contact.email}
                                        </td>

                                        <td>
                                            {contact.phone}
                                        </td>

                                        <td className="message-cell">
                                            {contact.message}
                                        </td>

                                        <td>
                                            {contact.createdAt
                                                ? new Date(
                                                    contact.createdAt
                                                ).toLocaleString()
                                                : "-"}
                                        </td>

                                        <td>

                                            <button
                                                className="delete-contact-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        contact.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminContacts;