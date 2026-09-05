
import React, { useEffect, useState } from "react";
 import API from "../services/api"; 
 import "../CSS_PAGES/Services.css";
  function Services() { const [services, setServices] = useState([]);
     const [loading, setLoading] = useState(true); const [error, setError] = useState(""); 
     useEffect(() => { fetchServices(); }, []); const fetchServices = async () => { try { console.log("Fetching services...");
         const response = await API.get("/services");
          console.log("Services received:", response.data); setServices(response.data);
          setError(""); } catch (error) { console.error("Services API Error:", error); 
            if (error.response) { console.error("Status:", error.response.status);
                 console.error("Response:", error.response.data); } 
                 setError("Unable to load services."); 
                } finally { setLoading(false); } };
                 return ( <div className="services-page"> 
                 {/* Header */} <section className="services-header"> 
                    <h1>Our Services</h1> <p> We provide innovative technology solutions to help businesses grow and transform. </p> 
                    </section> {/* Services Container */} <section className="services-container"> 
                        {/* Loading */} {loading && ( <p className="loading"> Loading services... </p> )}
                         {/* Error */} {!loading && error && ( <p className="error"> {error} </p> )}
                          {/* No Services */} {!loading && !error && services.length === 0 && ( <p className="no-services"> No services available. </p> )}
                           {/* Services List */} {!loading && !error && services.length > 0 && ( services.map((service) => ( <div className="service-card" key={service.id} >
                             {/* Service Image */} {service.imageUrl && ( <img src={service.imageUrl} alt={service.title} className="service-image" onError={(e) => { e.target.style.display = "none"; }} /> )}
                              {/* Service Content */} <div className="service-content"> <h2> {service.title} </h2> <p> {service.description} </p> </div> </div> )) )} 
                              </section> </div> );
                               } 
                               export default Services;