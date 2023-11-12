// Fait par Vincent, GitHub : Vyn100 (https://github.com/Vyn100);
// Email : blaize.vincent@hotmail.com

import React, { useState, useEffect } from "react";
// import logo from "../../../images/img/image.png";
import logo from "../../../../images/img/image.png"
import ModifierProfil from "./ModifierProfil/ModifierProfil.js";
import SupprimerProfil from "./SupprimerProfil/SupprimerProfil.js";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormProfilCandidat = () => {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSupprimer, setShowSupprimer] = useState(false);

  const [shownComponent, setShownComponent] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem('token');

        // console.log("Avant l'appel à fetch");
        const response = await fetch('http://localhost:3000/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // console.log("Après l'appel à fetch");
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        console.log("Après l'attente de la réponse JSON", data);

        setUserData(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchDataFromAPI();
  }, []);

  const renderUserData = () => {
    if (loading) {
      return <p>Chargement en cours...</p>;
    } else if (userData && Object.keys(userData).length > 0) {
      return (
        <div className="con-a col-9">
          <p align="center">
            <FontAwesomeIcon icon={faUser} className="text-primary fa-5x mb-3" />
          </p>

          <div className="row col-12 text-center mx-auto">
            {/* Affichage des données du profil */}
            <div className="col-md-6 mb-2 mx-auto">
              <div className="mb-3">
                <p className="btn btn-primary form-label col-md-12 col-12">
                  Nom: {userData.nom}
                </p>
              </div>
              <div className="mb-3">
                <p className="btn btn-primary form-label col-md-12 col-12">
                  Prénom: {userData.prenom}
                </p>
              </div>
              <div className="mb-3">
                <p className="btn btn-primary form-label col-md-12 col-12">
                  Email: {userData.email}
                </p>
              </div>
              <div className="mb-3">
                <p className="btn btn-primary form-label col-md-12 col-12">
                  Téléphone: {userData.numero_telephone}
                </p>
              </div>
            </div>

          </div>
        </div >
      );

    }
    return null;
  };

  return (
    <>
      <div className="container">
        <div className="row col-md-12">
          <div className="col-md-4">
            <button
              className="btn btn-info col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfile')}
            >
              Voir mon Profil
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-success col-12 m-2"
              type="button"
              onClick={() => setShownComponent('updateProfile')}
            >
              Modifier mon Profil
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-danger col-12 m-2"
              type="button"
              onClick={() => setShownComponent('deleteProfile')}
            >
              Supprimer mon Profil
            </button>
          </div>

        </div>
      </div>

      <div className="conexion">
        <div className="col-md-9 ibox-content column con-b">
          <p align="center">
            <img
              src={logo}
              alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
              width="80"
            />
          </p>

          <div className="m-t">

            <div className="col-md-12 text-center">

              {shownComponent === 'readProfile' && renderUserData()}
              {shownComponent === 'updateProfile' && <ModifierProfil userData={userData} />}
              {shownComponent === 'deleteProfile' && <SupprimerProfil onDelete={() => setShowSupprimer(false)} />}

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default FormProfilCandidat;