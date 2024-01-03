{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import DashboardRecruteurSociete from "../../views/Recruteur/DashboardRecruteurSociete/DashboardRecruteurSociete.js";
import DashboardRecruteurOffre from "../../views/Recruteur/DashboardRecruteurOffre/DashboardRecruteurOffre.js";
// import Caroussel from "../../ViewsDefault/Caroussel/Caroussel.js";
import Caroussel from "../../ViewsDefault/Caroussel/Caroussel.js";
import FormProfil from "../../views/Recruteur/DashboardRecruteurProfil/FormProfil.js";
import FormCandidat from "../../views/Recruteur/DashboardRecruteurCandidat/FormCandidat.js";
import ProfilRecruteur from "../../views/Recruteur/DashboardRecruteurProfil/ProfilRecruteur.js";
import ListSociete from "../../views/Recruteur/DashboardRecruteurSociete/ListSociete/ListSociete.js";
import { useNavigate } from 'react-router-dom';

const HeadCaroussel = () => {


  const [expanded, setExpanded] = useState(false);
  /*  const [nouvelleSociete, setNouvelleSociete] = useState({
     nom_de_lentreprise: '',
     secteur_activite: '',
     raison_sociale: '',
     statut_juridique: '',
     telephone: '',
     adresse: '',
     effectif: '',
     mail: '',
     site_web: '',
     reseaux_sociaux: '',
     code_NAF_principal: '',
     politique_teletravail: '',
     code_utilisateur: id,
   }); */
  const [societes, setSocietes] = useState([]);


  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderSelectedContent = () => {
    switch (selectedButton) {
      case "Profil":
        return <ProfilRecruteur />;


      case "Sociétés":

        return <DashboardRecruteurSociete /* nouvelleSociete={nouvelleSociete} setNouvelleSociete={setNouvelleSociete}*/ societes={societes} setSocietes={setSocietes} />;
      case "Candidats":
        return <FormCandidat />;
      case "OffresEmploi":
        return <DashboardRecruteurOffre societes={societes} />;
      default:
        return null;
    }
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
            label="Toggle Navigation"
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
                  block="true"
                  aria-label="Voir mon Profil"
                  onClick={() => handleButtonClick("Profil")}
                >
                  Mon Profil
                </Button>

                <Button
                  variant="primary"
                  className={`m-1 ${selectedButton === "Sociétés" ? "active" : ""
                    }`}
                  block="true"
                  aria-label="Voir mes Sociétés"
                  onClick={() => handleButtonClick("Sociétés")}
                >
                  Mes Sociétés
                </Button>

                <Button
                  variant="primary"
                  className={`m-1 ${selectedButton === "Candidats" ? "active" : ""
                    }`}
                  block="true"
                  aria-label="Voir mes Candidats"
                  onClick={() => handleButtonClick("Candidats")}
                >
                  Mes Candidats
                </Button>

                <Button
                  variant="primary"
                  className={`m-1 ${selectedButton === "OffresEmploi" ? "active" : ""
                    }`}
                  block="true"
                  aria-label="Voir mes offres d'emploi"
                  onClick={() => handleButtonClick("OffresEmploi")}
                >
                  Mes Offres d'emploi
                </Button>
              </div>
              <Button variant="danger" className={`m-1 ${selectedButton === "Déconnexion" ? "active" : ""}`} block="true" aria-label="deconnexion" onClick={handleLogout}>
                Deconnexion
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Caroussel />
      <div className="mt-4">{renderSelectedContent()}</div>
    </>
  );
};

export default HeadCaroussel;
