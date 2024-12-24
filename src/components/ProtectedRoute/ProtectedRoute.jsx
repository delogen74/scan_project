import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const expire = useSelector((state) => state.auth.expire);

    const isAuthenticated = token && new Date(expire) > new Date();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
