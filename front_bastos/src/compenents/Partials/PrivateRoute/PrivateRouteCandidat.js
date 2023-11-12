import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRouteCandidat = ({ children }) => {

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Vous devez stocker le rôle de l'utilisateur dans le localStorage


    if (token) {
        if (userRole == 2) {
            // Si le jeton existe et le rôle de l'utilisateur correspond au rôle requis, autorisez l'accès au composant passé en tant qu'élément
            return children;
        } else {
            // Redirigez l'utilisateur vers une page d'interdiction d'accès ou effectuez une autre action en cas de rôle incorrect
            return <Navigate to="/forbidden" />;
        }
    } else {
        // Si le jeton n'existe pas, redirigez l'utilisateur vers la page de connexion
        return <Navigate to="/" />;
    }
};

export default PrivateRouteCandidat;
