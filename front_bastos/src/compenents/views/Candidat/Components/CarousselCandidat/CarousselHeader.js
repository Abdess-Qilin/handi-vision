// Fait par Vincent, GitHub : Vyn100 (https://github.com/Vyn100);
// Email : blaize.vincent@hotmail.com

import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import MonProfilCandidat from "../ProfilCandidat/MonProfil"; // Ok
/* import OffreCandidat from "../OffresCandidat/OffresCandidat"; */
import CarousselCandidat from "../AccueilCandidat/DashboardCandidat"; // Ok
import DocumentsCandidat from "../DocumentsCandidats/DocumentsCandidat"; // Ok
import OffreCandidat from "../OffresCandidat/OffresCandidat2"; // Ok
import MatchOffres from "../../../MatchOffre/MatchOffre";
import MesFavoris from "../OffresCandidat/MesFavoris"; // Ok
import MonProfilCandidat2 from "../ProfilCandidat/Monprofil2";

// Import de fonctions et données depuis d'autres fichiers
import { favoritedOffersList, removeFromFavorites } from '../../../Table/FavorisTable';
import FormCompetenceCandidat from "../../../../ViewsDefault/Inscription/FormCompetenceCandidat";

import { useNavigate } from 'react-router-dom';


const CarousselCandidatH = () => {
    // Utilisation de l'état pour gérer l'état d'expansion (ouvert/fermé) d'un composant
    const [expanded, setExpanded] = useState(false);

    // Utilisation de l'état pour gérer la sélection d'offres
    const [selectedOffers, setSelectedOffers] = useState(null);

    // Fonction pour basculer l'état d'expansion
    const handleNavToggle = () => {
        // Inverse la valeur de 'expanded'
        setExpanded(!expanded);
    };

    // Utilisation de l'état pour gérer le bouton sélectionné
    const [selectedButton, setSelectedButton] = useState(null);

    // Fonction pour gérer les clics sur les boutons
    const handleButtonClick = (buttonName) => {
        // Met à jour l'état avec le nom du bouton sélectionné
        setSelectedButton(buttonName);
    };

    // Hook pour naviguer programmatically entre les pages
    const navigate = useNavigate();

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        // Supprimez les informations d'authentification de localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        localStorage.removeItem("statut");

        // Redirigez l'utilisateur vers la page de connexion 
        navigate("/");
    };

    // Fonction pour afficher le contenu sélectionné en fonction du bouton cliqué
    const renderSelectedContent = () => {

        // Utilisation de l'instruction switch pour sélectionner le composant à afficher
        switch (selectedButton) {

            case "Profil":

                // Affiche le composant MonProfilCandidat si "Profil" est sélectionné
                return <MonProfilCandidat2 />;

            case "Offres":

                // Affiche le composant OffreCandidat avec la propriété setSelectedOffers si "Offres" est sélectionné
                return <OffreCandidat setSelectedOffers={setSelectedOffers} />;

            case "Documents":

                // Affiche le composant DocumentsCandidat si "Documents" est sélectionné
                return <DocumentsCandidat />;

            case "MesOffres":

                // Affiche le composant MesFavoris avec des propriétés si "MesOffres" est sélectionné
                return <MesFavoris removeFromFavorites={removeFromFavorites} favoritedOffersList={favoritedOffersList} />;

            case "MesOffresBIS":

                // Affiche le composant MatchOffres si "MesOffresBIS" est sélectionné
                return <MatchOffres />;

            case "FormCompetenceCandidat":

                // Affiche le composant FormCompetenceCandidat si "FormCompetenceCandidat" est sélectionné
                return <FormCompetenceCandidat />;

            default:

                // Ne renvoie rien si aucun bouton n'est sélectionné
                return null;
        }
    };

    return (
        <>
            <div>
                <Navbar
                    role="navigation"
                    aria-label="Menu de navigation"
                    bg="dark"
                    variant="dark"
                    expand="lg"
                    className="border-bottom col-12">
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        onClick={handleNavToggle}
                        aria-expanded={expanded}
                        label="Ouvrir le menu pour naviguer" />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className={expanded ? "show" : ""}>
                        <Nav
                            className="d-flex justify-content-between col-12">
                            <div>
                                <Button variant="primary" className={`m-1 ${selectedButton === "Profil" ? "active" : ""}`} block="true" aria-label="Voir mon Profil" onClick={() => handleButtonClick("Profil")}>
                                    Mon Profil
                                </Button>

                                <Button variant="primary" className={`m-1 ${selectedButton === "FormCompetenceCandidat" ? "active" : ""}`} block="true" aria-label="Mettre à jour mes compétences" onClick={() => handleButtonClick("FormCompetenceCandidat")}>
                                    Mes Compétences
                                </Button>

                                <Button variant="primary" className={`m-1 ${selectedButton === "Documents" ? "active" : ""}`} block="true" aria-label="Uploader mes documents" onClick={() => handleButtonClick("Documents")}>
                                    Mes Documents
                                </Button>

                                <Button variant="primary" className={`m-1 ${selectedButton === "Offres" ? "active" : ""}`} block="true" aria-label="Voir les Offres" onClick={() => handleButtonClick("Offres")}>
                                    Rechercher une Offre
                                </Button>

                                <Button variant="primary" className={`m-1 ${selectedButton === "MesOffres" ? "active" : ""}`} block="true" aria-label="Voir mes Offres favories" onClick={() => handleButtonClick("MesOffres")}>
                                    Mes Favoris
                                </Button>

                                <Button variant="primary" className={`m-1 ${selectedButton === "MesOffresBIS" ? "active" : ""}`} block="true" aria-label="Voir les offres qui match avec mon profil" onClick={() => handleButtonClick("MesOffresBIS")}>
                                    Mes Match
                                </Button>
                            </div>
                            <Button variant="danger" className={`m-1 ${selectedButton === "Déconnexion" ? "active" : ""}`} block="true" aria-label="Deconnexion" onClick={handleLogout}>
                                Deconnexion
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div >
            <CarousselCandidat />
            <div className="mt-4">{renderSelectedContent()}</div>
        </>
    );
};

export default CarousselCandidatH;
