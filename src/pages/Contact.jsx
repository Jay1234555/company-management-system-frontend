
import React, { useState } from "react";
import API from "../services/api";
import "../CSS_PAGES/Contact.css";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus("Sending...");

        try {

            await API.post("/contacts", formData);

            setStatus("Message sent successfully! ✅");

            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            });

        } catch (error) {

            console.error("Error sending message:", error);

            setStatus("Failed to send message. Please try again.");

        }
    };

    return (
        <div className="contact-page">

            {/* Header */}
            <section className="contact-header">

                <h1>Contact Us</h1>

                <p>
                    Have a question or want to work with us?
                    Send us a message and we'll get back to you.
                </p>

            </section>


            {/* Contact Section */}
            <section className="contact-section">

                {/* Contact Information */}
                <div className="contact-info">

                    <h2>Get In Touch</h2>

                    <p>
                        We would love to hear from you.
                        Contact us for any questions,
                        services or project requirements.
                    </p>

                    <div className="contact-detail">

                        <h3>Email</h3>

                        <p>
                            info@company.com
                        </p>

                    </div>


                    <div className="contact-detail">

                        <h3>Phone</h3>

                        <p>
                            +91 XXXXX XXXXX
                        </p>

                    </div>


                    <div className="contact-detail">

                        <h3>Business Hours</h3>

                        <p>
                            Monday - Saturday
                            <br />
                            9:00 AM - 6:00 PM
                        </p>

                    </div>

                </div>


                {/* Contact Form */}
                <div className="contact-form-container">

                    <h2>Send Us a Message</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Message</label>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your message"
                                rows="6"
                                required
                            ></textarea>

                        </div>


                        <button
                            type="submit"
                            className="contact-button"
                        >
                            Send Message
                        </button>

                    </form>


                    {status && (
                        <p className="contact-status">
                            {status}
                        </p>
                    )}

                </div>

            </section>

        </div>
    );
}

export default Contact;
