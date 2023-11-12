{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }

import React, { useState, useEffect } from "react";
import logo from "../../../images/img/image.png";
import ChercherCandidat from "./ChercherCandidat/ChercherCandidat";
import { Link } from "react-router-dom";
import users from "../../Table/Users";

const FormCandidat = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [shownComponent, setShownComponent] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);

      try {
        console.log("Avant l'appel à fetch");
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        console.log("Après l'appel à fetch");
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
    const handleValiderSociete = async (entrepriseId) => {
      try {
        const response = await fetch(`URL_DE_L_API_POUR_VALIDER/${entrepriseId}`, {
          method: 'POST', // Ou 'PUT' selon l'API
          headers: {
            'Content-Type': 'application/json',
          },
          // Tu dois envoyer les données requises au serveur dans le corps de la requête.
          body: JSON.stringify({/* tes données à envoyer */ }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la validation de la société');
        }

        // La société a été validée avec succès
        // Tu peux également mettre à jour l'état local pour refléter cette modification si nécessaire.
      } catch (error) {
        console.error(error);
      }
    };
    if (loading) {
      return <p>Chargement en cours...</p>;
    } else if (userData && Object.keys(userData).length > 0) {
      return (
        <>
          <h2 className="h2">Ma liste de Candidat</h2>
          <div className="container text-center">
            <div className="row ">
              {users
                .filter(userData => userData.role === "candidat")
                .map((userData, index) => (
                  <div className="col-sm-12  col-md- col-lg-6 col-xl-4 mx-auto m-3" key={index}>
                    <div className="border border-2 border-black ">
                      <p className="btn btn-primary col-12">Nom: {userData.nom}</p>
                      <p className="btn btn-primary col-12">Prénom: {userData.prenom}</p>
                      <p className="btn btn-primary col-12">Email: <a href={`mailto:${userData.email}`}>{userData.email}</a></p>
                      <p className="btn btn-primary col-12">Téléphone: <a href={`tel:${userData.numero_telephone
                        }`}>{userData.numero_telephone}</a></p>


                      <button className="btn btn-info m-1" type="submit" onClick={() => handleValiderSociete(userData.id)}>Contact</button>
                      <Link to="/deleteREcruteur"> <button className="btn btn-danger m-1" type="submit" >Supprimer</button></Link>
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
          <div className="col-md-4 mx-auto">
            <button
              className="btn btn-info text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('readProfile')}
            >
              Listes des Candidats
            </button>
          </div>

          <div className="col-md-4 mx-auto">
            <button
              className="btn btn-success text-black font-bold col-12 m-2"
              type="button"
              onClick={() => setShownComponent('updateProfile')}
            >
              Chercher un Candidat
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

          <div className="m-t" role="form">        {/* form modifier en div */}

            <div className="col-md-12 text-center">

              {shownComponent === 'readProfile' && renderUserData()}
              {shownComponent === 'updateProfile' && <ChercherCandidat userData={userData} />}

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default FormCandidat;
{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }