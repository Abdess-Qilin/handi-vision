{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importer useNavigate
import logo from "../../../images/img/image.png";
import ChercherRecruteur from './ChercherRecruteur';
//import SupprimerRecruteur from './SupprimerRecruteur';
import SupprimerElementAdmin from '../../SupprimerElement/SupprimerElementAdmin.js';
import { apiUrl } from '../../../config/config.js';

const AdminRecruteurs = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [shownComponent, setShownComponent] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedCompanyEmail, setSelectedCompanyEmail] = useState('');
  const [id, setId] = useState(null);
  const [isPressButton, setIsPressButton] = useState(false);

  const navigate = useNavigate(); // Obtenir la fonction de navigation

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);
      setIsPressButton(false);

      try {
        const token = localStorage.getItem('token');

        let roadAPI;

        if (shownComponent === 'readProfile') roadAPI = `${apiUrl}/api/admin/getusers/3/3`;           // Rubrique 'Liste des recruteurs'
        else if (shownComponent === 'readProfileWait') roadAPI = `${apiUrl}/api/admin/getusers/3/1`;  // Rubrique 'Recruteurs en attente'

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
        setUserData(data);

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchDataFromAPI();
  }, [shownComponent, isPressButton]);

  const handleValiderRecruteur = async (e, id) => {

    e.preventDefault();
    const token = localStorage.getItem('token');

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

      const response = await fetch('http://localhost:3000/api/admin/updateuser', fetchOptions);

      if (!response.ok) {
        throw new Error('Erreur lors de la validation du recruteur');
      }
      // Le recruteur a été validée avec succès

    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteRecruteur = async () => {
    try {
      const response = await fetch('URL_DE_L_API_POUR_SUPPRIMER', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du recruteur');
      }

      // Marquer la suppression comme effectuée
      setIsDeleted(true);

      // Utiliser la fonction de navigation pour rediriger
      navigate('/dashboardAdmin');
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactRecruteur = (mail) => {
    // Ici, tu peux utiliser l'adresse e-mail de la société stockée dans selectedCompanyEmail
    // pour envoyer un e-mail à cette adresse.
    // Tu peux utiliser une bibliothèque pour envoyer des e-mails depuis ton application, par exemple nodemailer (si tu utilises Node.js côté serveur).
    // Voici un exemple simplifié, mais tu devras adapter cette logique à ton application.

    const mailtoLink = `mailto:${mail}`;
    window.location.href = mailtoLink;
  };

  const renderUserData = (title) => {

    const handleButtonClick = (e, id) => {
      e.preventDefault();
      //console.log("L.129 -->  ID cliqué : " + id);
      setId(id);
      //console.log("ID cliqué : " + id);
      handleValiderRecruteur(e, id);
      setIsPressButton(true);

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
                <div className="col-md-6  col-lg-4 mx-auto m-3" key={index}>
                  <div className="border border-2 border-black">
                    <p className="bg-primary p-2 text-black font-bold rounded col-12">Civilite: {user.civilite}</p>
                    <p className="bg-primary p-2 text-black font-bold rounded col-12">Nom: {user.nom}</p>
                    <p className="bg-primary p-2 text-black font-bold rounded col-12">Prénom: {user.prenom}</p>
                    <p className="bg-primary p-2 text-black font-bold rounded col-12">Téléphone: <a href={`tel:${user.numero_telephone
                      }`}>{user.numero_telephone
                      }</a></p>
                    <p className="bg-primary p-2 text-black font-bold rounded col-12">Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
                    {/* <p className="bg-primary p-2 text-black font-bold rounded col-12">Role: {user.code_role}</p> */}
                    {shownComponent === 'readProfileWait' && <button onClick={(e) => { handleButtonClick(e, user.id); }} className="btn btn-info m-1" type="submit">Valider</button>}
                    <button className="btn btn-success m-1" type="submit" onClick={() => handleContactRecruteur(userData.mail)}>Contact</button>
                    {shownComponent === 'readProfileWait' && <button className="btn btn-primary m-1" type="submit" onClick={handleDeleteRecruteur}>Rejeter</button>}
                    <Link to="/delete"> <button className="btn btn-danger m-1" type="submit" >Supprimer</button></Link>
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
              className="btn btn-info text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfile')}
            >
              Liste des Recruteurs
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-success text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('updateProfile')}
            >
              Chercher un Recruteur
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfileWait')}
            >
              Recruteur en Attente
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
              {shownComponent === 'readProfile' && renderUserData('Liste des Recruteurs')}
              {shownComponent === 'readProfileWait' && renderUserData('Recruteurs en attente')}
              {shownComponent === 'updateProfile' && <ChercherRecruteur /*userData={userData}*/ />}
              {shownComponent === 'deleteProfile' && <SupprimerElementAdmin onDelete={() => setShowSupprimer(false)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRecruteurs;