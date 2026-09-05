import React from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {

    return (
        <>

            <AdminSidebar />

            <div className="admin-content">
                {children}
            </div>

        </>
    );
}

export default AdminLayout;