{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importer useNavigate
import logo from "../../../images/img/image.png";
import ChercherSociete from './ChercherSociete.js';
import { Card, Button } from 'react-bootstrap';
//import SupprimerSociete from './SupprimerSociete';
import SupprimerElementAdmin from '../../SupprimerElement/SupprimerElementAdmin.js';

const AdminSocietes = () => {
  const [companyData, setcompanyData] = useState({});
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

        if (shownComponent === 'readProfile') roadAPI = 'http://localhost:3000/api/admin/getcompanies/3';           // Rubrique 'Liste des societes'
        else if (shownComponent === 'readProfileWait') roadAPI = 'http://localhost:3000/api/admin/getcompanies/1';  // Rubrique 'Societes en attente'

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
        console.log(data)
        setcompanyData(data);

      } catch (error) {
        console.error(error.message);
      }

      setLoading(false);
    };

    fetchDataFromAPI();
  }, [shownComponent, isPressButton]);

  const handleValiderSociete = async (e, id) => {

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

      const response = await fetch('http://localhost:3000/api/admin/updatecompany', fetchOptions);

      if (!response.ok) {
        throw new Error('Erreur lors de la validation de la société');
      }

      // La société a été validée avec succès
      // Tu peux également mettre à jour l'état local pour refléter cette modification si nécessaire.
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSociete = async () => {
    try {
      const response = await fetch('URL_DE_L_API_POUR_SUPPRIMER', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la société');
      }

      // Marquer la suppression comme effectuée
      setIsDeleted(true);

      // Utiliser la fonction de navigation pour rediriger
      navigate('/dashboardAdmin');
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactSociete = (mail) => {
    // Ici, tu peux utiliser l'adresse e-mail de la société stockée dans selectedCompanyEmail
    // pour envoyer un e-mail à cette adresse.
    // Tu peux utiliser une bibliothèque pour envoyer des e-mails depuis ton application, par exemple nodemailer (si tu utilises Node.js côté serveur).
    // Voici un exemple simplifié, mais tu devras adapter cette logique à ton application.

    const mailtoLink = `mailto:${mail}`;
    window.location.href = mailtoLink;
  };

  const rendercompanyData = (title) => {

    const handleButtonClick = (e, id) => {
      e.preventDefault();
      //console.log("L.129 -->  ID cliqué : " + id);
      setId(id);
      //console.log("ID cliqué : " + id);
      handleValiderSociete(e, id);
      setIsPressButton(true);

    };

    //debut test
    function CompanyCard({ company, shownComponent, handleButtonClick, handleContactSociete, handleDeleteSociete }) {
      const [showDetails, setShowDetails] = useState(false);

      return (
        <div className="col-md-5 col-lg-4 mx-auto m-3">
          <Card>
            <Card.Body>
              <Card.Title className="bg-primary p-2 text-black font-bold rounded col-12">
                Nom de l'entreprise: {company.nom_de_lentreprise}
              </Card.Title>

              {showDetails && (
                <>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Secteur d'activité: {company.secteur_activite}
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Raison sociale: {company.raison_sociale}
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Statut juridique: {company.statut_juridique}
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Téléphone: {company.telephone}
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Adresse: {company.adresse}
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Effectif: {company.effectif}
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Email: <a href={`mailto:${company.mail}`}>{company.mail}</a>
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Site web:  <a href={company.site_web} target="_blank">{company.site_web}</a>
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Réseaux sociaux:  {company.telephone}
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Code NAF principal: {company.code_NAF_principal}
                  </Card.Text>
                  <Card.Text className="bg-primary p-2 text-black font-bold rounded col-12">
                    Politique télétravail: {company.politique_teletravail}
                  </Card.Text>


                </>
              )}

              <Button
                variant="primary"
                className="m-1"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Réduire' : 'Afficher plus d\'informations'}
              </Button>

              {shownComponent === 'readProfileWait' && (
                <Button variant="info" className="m-1" onClick={(e) => { handleButtonClick(e, company.id); }}>
                  Valider
                </Button>
              )}
              <Button variant="success" className="m-1" onClick={() => handleContactSociete(company.mail)}>
                Contact
              </Button>
              {shownComponent === 'readProfileWait' && (
                <Button variant="primary" className="m-1" onClick={handleDeleteSociete}>
                  Rejeter
                </Button>
              )}
              <Link to="/delete">
                <Button variant="danger" className="m-1">
                  Supprimer
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      );
    }

    //fin test

    if (loading) {
      return <p>Chargement en cours...</p>;
    } else if (companyData && Object.keys(companyData).length > 0) {
      return (
        <>
          <h2 className="h2">{title}</h2>
          <div className="container text-center">
            <div className="row">
              {companyData.map((company, index) => (
                <CompanyCard
                  key={index}
                  company={company}
                  shownComponent={shownComponent}
                  handleButtonClick={handleButtonClick}
                  handleContactSociete={handleContactSociete}
                  handleDeleteSociete={handleDeleteSociete}
                />
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
              Liste des Sociétés
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-success text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('updateProfile')}
            >
              Chercher une Société
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfileWait')}
            >
              Société en Attente
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
              {shownComponent === 'readProfile' && rendercompanyData('Liste des sociétés')}
              {shownComponent === 'readProfileWait' && rendercompanyData('Sociétés en attente')}
              {shownComponent === 'updateProfile' && <ChercherSociete /*companyData={companyData}*/ />}
              {shownComponent === 'deleteProfile' && <SupprimerSociete onDelete={() => setShowSupprimer(false)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSocietes;