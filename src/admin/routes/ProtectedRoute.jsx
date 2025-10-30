import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/api";
import Loader from '../components/Loader';

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await getProfile();
                if (res.data.success) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    if (loading) return <Loader message="Checking Authentication..." size={2} />;

    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};
