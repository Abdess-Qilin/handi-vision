{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState, useEffect } from "react";
import logo from "../../../images/img/image.png";
import ModifierProfil from "./ModifierProfil/ModifierProfil.js";
import SupprimerProfil from "./SupprimerProfil/SupprimerProfil.js";
import { apiUrl } from "../../../config/config.js";

const FormProfil = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSupprimer, setShowSupprimer] = useState(false);
  /* const [CodeRole, setCodeRole] = useState('');// permet de passer id utilisateur aux autres elements */

  const id = localStorage.getItem('id');
  const role = localStorage.getItem('role');
  console.log("voici l'id: ", id)
  console.log("voici le role: ", role)
  const [shownComponent, setShownComponent] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem('token');
        // console.log("Avant l'appel à fetch");
        const response = await fetch(`${apiUrl}/api/me`, {
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
        <div className=" row container text-center col-md-12 mx-auto">
          <h2 className="h2">Mon Profil</h2>
          <p className="btn btn-primary form-label col-md-6 ">Nom: {userData.nom}</p>
          <p className="btn btn-primary form-label col-md-6 ">Prénom: {userData.prenom}</p>
          <p className="btn btn-primary form-label col-md-6 ">Email: {userData.email}</p>
          <p className="btn btn-primary form-label col-md-6 ">Téléphone: {userData.numero_telephone}</p>
          <p className="btn btn-primary form-label col-md-6 ">id: {userData.id}</p>
          {/*    <p className="btn btn-primary form-label col-md-6 ">Adresse: {userData.address.street}</p>
          <p className="btn btn-primary form-label col-md-6 ">Pays: {userData.address.city}</p>
          <p className="btn btn-primary form-label col-md-6 ">Ville: {userData.address.city}</p>
          <p className="btn btn-primary form-label col-md-6 ">Code Postal: {userData.address.zipcode}</p> */}
        </div>
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
              className="btn btn-info text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfile')}
            >
              Voir mon Profil
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-success text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('updateProfile')}
            >
              Modifier mon Profil
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-danger text-black font-bold col-12 m-2"
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

export default FormProfil;
