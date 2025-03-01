import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        if (!loading) {
            setIsAuthenticated(!!user);
        }
    }, [loading, user]);

    if (loading || isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;