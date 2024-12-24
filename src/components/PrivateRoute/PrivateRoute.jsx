import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const expire = localStorage.getItem('expire');

    const isTokenValid = () => {
        if (!token || !expire) return false;
        const expireDate = new Date(expire);
        const currentDate = new Date();
        return currentDate < expireDate;
    };

    return isTokenValid() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
