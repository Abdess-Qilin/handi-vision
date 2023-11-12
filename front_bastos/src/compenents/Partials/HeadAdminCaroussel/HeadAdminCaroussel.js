{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import AdminProfil from "../../views/Administrateur/DashboardAdmin/AdminProfil";
import DashboardAdmin from "../../views/Administrateur/DashboardAdmin/DashboardAdmin";
import AdminOffre from "../../views/Administrateur/DashboardAdminOffre/AdminOffre";
import AdminCandidat from "../../views/Administrateur/DashboardAdminCandidat/AdminCandidat.js";
import AdminSocietes from "../../views/Administrateur/DashboardAdminSociete/AdminSocietes";
import AdminRecruteurs from "../../views/Administrateur/DashboardAdminRecruteur/Adminrecruteurs";
import { useNavigate } from 'react-router-dom';

const HeadAdminCaroussel = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Supprimez les informations d'authentification de localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("statut");

    // Redirigez l'utilisateur vers la page de connexion 

    navigate("/");
  };

  const renderSelectedContent = () => {
    switch (selectedButton) {
      case "Profil":
        return <AdminProfil />;
      case "Sociétés":
        return <AdminSocietes />;
      case "Candidats":
        return <AdminCandidat />;
      case "Recruteurs":
        return <AdminRecruteurs />;
      case "OffresEmploi":
        return <AdminOffre />;
      default:
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
          className="border-bottom col-12"
        >
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavToggle}
            aria-expanded={expanded}
            label="Basculer la navigation"
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={expanded ? "show" : ""}
          >
            <Nav className="d-flex justify-content-between col-12">
              <div>
                <Button
                  variant="primary"
                  className={`m-1 ${selectedButton === "Profil" ? "active" : ""
                    }`}
                  block={true}
                  aria-label="Voir mon Profil"
                  onClick={() => handleButtonClick("Profil")}
                >
                  Profil
                </Button>

                <Button
                  variant="primary"
                  className={`m-1 ${selectedButton === "Sociétés" ? "active" : ""
                    }`}
                  block={true}
                  aria-label="Voir mes Sociétés"
                  onClick={() => handleButtonClick("Sociétés")}
                >
                  Les Sociétés
                </Button>

                <Button
                  variant="primary"
                  className={`m-1 ${selectedButton === "Candidats" ? "active" : ""
                    }`}
                  block="true"
                  aria-label="Voir mes Candidats"
                  onClick={() => handleButtonClick("Candidats")}
                >
                  Les Candidats
                </Button>

                <Button
                  variant="primary"
                  className={`m-1 ${selectedButton === "Recruteurs" ? "active" : ""
                    }`}
                  block={true}
                  aria-label="Voir les Recruteurs"
                  onClick={() => handleButtonClick("Recruteurs")}
                >
                  Les Recruteurs
                </Button>

                <Button
                  variant="primary"
                  className={`m-1 ${selectedButton === "OffresEmploi" ? "active" : ""
                    }`}
                  block={true}
                  aria-label="Voir mes offres d'emploi"
                  onClick={() => handleButtonClick("OffresEmploi")}
                >
                  Les Offres d'emploi
                </Button>
              </div>
              <Button
                variant="primary"
                className={`btn-danger ${selectedButton === "Déconnexion" ? "active" : ""}`}
                block={true}
                aria-label="Déconnexion"
                onClick={handleLogout}>
                Déconnexion
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <DashboardAdmin />
      <div className="mt-4">{renderSelectedContent()}</div>
    </>
  );
};

export default HeadAdminCaroussel;
