import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    console.log("voici le token: " + token);
    if (token) {
        // Si le jeton existe, autorisez l'accès au composant passé en tant qu'élément
        return children;
    } else {
        // Si le jeton n'existe pas, redirigez l'utilisateur vers la page de connexion
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;