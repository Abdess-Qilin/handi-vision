{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importer useNavigate
import logo from "../../../images/img/image.png";
import ChercherOffre from './ChercherOffre.js';
//import SupprimerOffre from './SupprimerOffre.js';
import SupprimerElementAdmin from '../../SupprimerElement/SupprimerElementAdmin.js';
import { apiUrl } from '../../../config/config.js';

const AdminOffre = () => {
  const [offerData, setOfferData] = useState({});
  const [loading, setLoading] = useState(false);
  const [shownComponent, setShownComponent] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false); // /!\ Revenir dessus
  //const [selectedCompanyEmail, setSelectedCompanyEmail] = useState('');
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

        if (shownComponent === 'readProfile') roadAPI = `${apiUrl}/api/admin/joboffers/3`;           // Rubrique 'Liste des offres d'emploi'
        else if (shownComponent === 'readProfileWait') roadAPI = `${apiUrl}/api/admin/joboffers/1`;  // Rubrique 'Offres d'emploi en attente'

        const response = await fetch(roadAPI, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Vous pouvez spécifier le type de contenu si nécessaire
          },
        });
        console.log(response)
        if (response.status !== 200) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        console.log(data)
        setOfferData(data);

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchDataFromAPI();
  }, [shownComponent, isPressButton]);

  const handleValiderOffre = async (e, id) => {

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

      const response = await fetch(`${apiUrl}/api/admin/updatejoboffer`, fetchOptions);

      if (!response.ok) {
        throw new Error('Erreur lors de la validation de l\'offre d\'emploi');
      }

      // La société a été validée avec succès

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOffre = async () => {
    try {
      const response = await fetch('URL_DE_L_API_POUR_SUPPRIMER', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'offre d\'emploi');
      }

      // Marquer la suppression comme effectuée
      setIsDeleted(true);

      // Utiliser la fonction de navigation pour rediriger
      navigate('/dashboardAdmin');
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactOffre = async (code_entreprise) => {
    // Ici, tu peux utiliser l'adresse e-mail de la société stockée dans selectedCompanyEmail
    // pour envoyer un e-mail à cette adresse.
    // Tu peux utiliser une bibliothèque pour envoyer des e-mails depuis ton application, par exemple nodemailer (si tu utilises Node.js côté serveur).
    // Voici un exemple simplifié, mais tu devras adapter cette logique à ton application.
    try {
      const token = localStorage.getItem('token');

      const roadAPI = `${apiUrl}/api/admin/getcompanybyjoboffer/${code_entreprise}`;

      const response = await fetch(roadAPI, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Vous pouvez spécifier le type de contenu si nécessaire
        },
      });

      console.log(response)

      if (response.status !== 200) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      console.log(data)
      //setOfferData(data);
      const mail = data.Company.mail;
      if (mail) {
        const mailtoLink = `mailto:${mail}`;
        window.location.href = mailtoLink;
      } else {
        // Gérer le cas où l'adresse e-mail n'est pas définie
        console.error("L'adresse e-mail de la société n'est pas définie.");
        // Vous pouvez afficher un message d'erreur à l'utilisateur ou prendre d'autres mesures appropriées.
      }

    } catch (error) {
      console.error(error);
    }

  };

  const renderOfferData = (title) => {

    const handleButtonClick = (e, id) => {
      e.preventDefault();
      //console.log("L.129 -->  ID cliqué : " + id);
      setId(id);
      //console.log("ID cliqué : " + id);
      handleValiderOffre(e, id);
      setIsPressButton(true);

    };

    if (loading) {
      return <p>Chargement en cours...</p>;
    } else if (offerData && Object.keys(offerData).length > 0) {
      return (
        <>
          <h2 className="h2">{title}</h2>
          <div className="container text-center">
            <div className="row">
              {offerData.map((offer, index) => (
                <div className="col-md-5 col-lg-4 mx-auto " key={index}>
                  <div className="border border-2 border-black p-1">
                    <button className="btn btn-primary mx-auto col-12">Poste: {offer.poste}</button>
                    <button className="btn btn-primary mx-auto  m-1 col-12">Lieu du poste: {offer.lieu_du_poste}</button>
                    <button className="btn btn-primary mx-auto  m-1 col-12">Type de contrat: {offer.type_de_contrat}</button>
                    <button className="btn btn-primary mx-auto  m-1 col-12">Durée de contrat: {offer.duree_de_contrat}</button>
                    <button className="btn btn-primary mx-auto  m-1 col-12">Horaires: {offer.horaires}</button>
                    <button className="btn btn-primary mx-auto  m-1 col-12">Expérience: {offer.experience}</button>
                    <button className="btn btn-primary mx-auto  m-1 col-12">Salaire: {offer.salaire}</button>
                    <button className="btn btn-primary mx-auto  m-1 col-12">Politique de télétravail: {offer.politique_teletravail}</button>
                    {shownComponent === 'readProfileWait' && <button onClick={(e) => { handleButtonClick(e, offer.id); }} className="btn btn-info m-1" type="submit">Valider</button>}
                    <button className="btn btn-success m-1" type="submit" onClick={() => handleContactOffre(offer.code_entreprise)}>Contact</button>
                    {shownComponent === 'readProfileWait' && <button className="btn btn-primary m-1" type="submit" onClick={handleDeleteOffre}>Refuser</button>}
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
              Liste des Offres d'emploi
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-success text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('updateProfile')}
            >
              Chercher une offre d'emploi
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfileWait')}
            >
              Offres d'emploi en Attente
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
              {shownComponent === 'readProfile' && renderOfferData('Liste des offres d\'emploi')}
              {shownComponent === 'readProfileWait' && renderOfferData('Offres d\'emploi en attente')}
              {shownComponent === 'updateProfile' && <ChercherOffre /*offre={offerData}*/ />}
              {shownComponent === 'deleteProfile' && <SupprimerElementAdmin onDelete={() => setShowSupprimer(false)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOffre;
