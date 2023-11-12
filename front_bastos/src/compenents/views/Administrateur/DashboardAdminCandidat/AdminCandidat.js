{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../images/img/image.png";
// import ChercherCandidat from '../../Recruteur/DashboardRecruteurCandidat/ChercherCandidat/ChercherCandidat';
// import SupprimerCandidat from '../../Recruteur/DashboardRecruteurCandidat/SupprimerCandidat/SupprimerCandidat';
//import 
// import AdminSupprimerCandidat from './AdminSupprimerCandidat';
import AdminChercherCandidat from './AdminChercherCandidat.js';
import SupprimerElementAdmin from '../../SupprimerElement/SupprimerElementAdmin.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { apiUrl } from '../../../config/config.js';


const AdminCandidat = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [shownComponent, setShownComponent] = useState(null);
  const [id, setId] = useState(null);
  const [isPressButton, setIsPressButton] = useState(false);

  const handleSubmitValider = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Envoyer les données du nouveau candidat à votre API 
    try {

      let fetchOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          statut: 3
        }),
      };
      const response = await fetch(`${apiUrl}/api/admin/updateuser`, fetchOptions);
      if (response.ok) {
        // La requête s'est terminée avec succès
        console.log("le statut a été modifié avec succès.");
        // Rediriger l'utilisateur vers la page de succès ou faire d'autres actions nécessaires
      } else {
        // Gérer les erreurs de requête ici, par exemple :
        console.error("Erreur lors de la validation :", response.statusText);
      }
    } catch (error) {
      console.log('Fetch error: ', error);
    }

  };


  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);
      setIsPressButton(false);

      try {

        const token = localStorage.getItem('token');

        let roadAPI;

        if (shownComponent === 'readProfile') roadAPI = `${apiUrl}/api/admin/getusers/2/3`;           // Rubrique 'Liste des candidats'
        else if (shownComponent === 'readProfileWait') roadAPI = `${apiUrl}/api/admin/getusers/2/1`;  // Rubrique 'Candidats en attente'

        const response = await fetch(roadAPI, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Vous pouvez spécifier le type de contenu si nécessaire
          },
        });
        if (response.status !== 200) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        console.log(data);
        setUserData(data);

      } catch (error) {
        console.error(error.message);
      }

      setLoading(false);
    };

    fetchDataFromAPI();
  }, [shownComponent, isPressButton]);


  const renderUserData = (title) => {

    const handleButtonClick = (e, id) => {
      e.preventDefault();
      setId(id);
      console.log("ID cliqué : " + id);
      handleSubmitValider(e, id);
      setIsPressButton(true);
    };

    const handleDeleteButtonClick = (e, id) => {
      e.preventDefault();
      setId(id);
      console.log("ID cliqué : " + id);
      handleSubmitValider(e, id);
      setIsPressButton(true);
    };

    const handleDownloadRqth = async (userId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/downloadFile/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Vous pouvez spécifier le type de contenu si nécessaire
          },
        });

        if (response.status === 200) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          // Ouvrir une nouvelle fenêtre pour le téléchargement
          window.open(url);

          // Libérer l'URL après le téléchargement
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Erreur lors du téléchargement du fichier');
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error);
      }
    };

    if (loading) {
      return <p>Chargement en cours...</p>;
    } else if (userData && Object.keys(userData).length > 0) {
      return (
        <>
          <h2 className="h2">{title}</h2>
          <div className="container text-center">
            <div className="row">
              {userData.map((user, index) => (
                <div className="col-md-5 col-lg-4 mx-auto m-3" key={index}>
                  <FontAwesomeIcon icon={faUserMagnifyingGlass} />
                  <div className="border border-2 border-black">
                    <p className="bg-primary text-black font-bold p-2 rounded col-12">Nom: {user.nom}</p>
                    <p className="bg-primary text-black font-bold p-2 rounded col-12">Prénom: {user.prenom}</p>
                    <p className="bg-primary text-black font-bold p-2 rounded col-12">Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>

                    <p className="bg-primary text-black font-bold p-2 rounded col-12">Téléphone: <a href={`tel:${user.numero_telephone
                      }`}>{user.numero_telephone
                      }</a></p>

                    {user.rqth && (
                      <button onClick={() => handleDownloadRqth(user.id)} className="btn btn-primary m-1" type="button">
                        RQTH
                      </button>
                    )}

                    {shownComponent === 'readProfileWait' && <button onClick={(e) => { handleButtonClick(e, user.id); }} className="btn btn-info m-1" type="submit">Valider</button>}

                    <button className="btn btn-success m-1" type="submit">Contact</button>
                    {shownComponent === 'readProfileWait' && <button className="btn btn-primary m-1" type="submit">Rejeter</button>}
                    <Link to="/delete"> <button className="btn btn-danger m-1" type="submit" /* onClick={(e) => { handleDeleteButtonClick(e, user.id); }} */>Supprimer</button></Link>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
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
              className="btn btn-info text-black font-bold  col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfile')}
            >
              Liste des Candidats
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-success text-black font-bold  col-12 m-2"
              type="button"
              onClick={() => setShownComponent('updateProfile')}
            >
              Chercher un Candidat
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary text-black font-bold   col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfileWait')}
            >
              Candidats en Attente
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
          <div className="m-t" role="form">
            <div className="col-md-12 text-center">
              {shownComponent === 'readProfile' && renderUserData('Liste des candidats')}
              {shownComponent === 'readProfileWait' && renderUserData('Candidats en attente')}
              {shownComponent === 'updateProfile' && <AdminChercherCandidat />}
              {shownComponent === 'deleteProfile' && <SupprimerElementAdmin onDelete={() => setShowSupprimer(false)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCandidat;