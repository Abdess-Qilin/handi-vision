{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }

import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import logo from "../../../images/img/image.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const AdminProfil = () => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/me', {
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
        setUserData(
          {
            name: data.nom,
            username: data.prenom,
            email: data.email,
            phone: data.numero_telephone,
          });
        console.log(userData)

      }
      catch (error) {
        console.error(error.message);
      }
    }
    fetchData()
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setErrorData(null);

    try {

      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      const data = {
        id: id,
        email: userData.email,
        numero_telephone: userData.phone,
      }

      const fetchOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      }

      const response = await fetch('http://localhost:3000/api/admin/updateuser', fetchOptions);

      if (response.ok) {

        const updateProfile = await response.json();

        setErrorData(updateProfile);
        //console.log(errorData)
        // Une fois que les données ont été enregistrées ,
        // désactiver le mode d'édition

        if (updateProfile && updateProfile.champs === 'succes') setIsEditing(false)
      }

      if (response.status === 409) {
        const updateProfile = await response.json();
        //console.log(updateProfile);
        setErrorData(updateProfile);
        //console.log(errorData);
      }

    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données : ", error);

    }
  };

  // const handleCreate = async () => {
  //   try {
  //     // gérer la création d'un nouveau profil ici
  //     // utiliser fetch pour créer un nouveau profil
  //     const response = await fetch("URL_DE_VOTRE_API", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (response.status === 201) {
  //       // Création réussie, redirigez l'utilisateur vers une autre page
  //       setRedirectTo("/DashboardAdmin");
  //     } else {
  //       console.error("Erreur lors de la création du profil.");
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la création du profil : ", error);
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     // gérer la suppression du profil ici
  //     // utiliser fetch pour supprimer le profil
  //     await fetch("URL_DE_VOTRE_API", {
  //       method: "DELETE",
  //     });

  //     // Suppression réussie, redirigez l'utilisateur vers une autre page
  //     setRedirectTo("/DashboardAdmin");
  //   } catch (error) {
  //     console.error("Erreur lors de la suppression du profil : ", error);
  //   }
  // };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <>
      <div className="con-a col-9">
        <p align="center">
          <img
            src={logo}
            alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
            width="80"
          />
        </p>

        <div className=" row col-12  text-center mx-auto">
          <h2 className="h2">Mon Profil</h2>
          {isEditing ? (
            <div className="row ">
              {/* Formulaire d'édition */}
              <div className="col-md-12 mb-2 ">
                <input className="col-6 mb-2 "
                  type="text"
                  value={userData.name}
                  /*onChange={(e) => setUserData({ ...userData, name: e.target.value })}*/
                  disabled="disabled"
                  placeholder="Nom"
                />
              </div>
              <div className="col-md-12 mb-2">
                <input className="col-6 mb-2 "
                  type="text"
                  value={userData.username}
                  /*onChange={(e) => setUserData({ ...userData, username: e.target.value })}*/
                  disabled="disabled"
                  placeholder="Prénom"
                />
              </div>
              <div className="col-md-12 mb-2">
                <input className="col-6 mb-2 "
                  type="text"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="Email"
                />
                {errorData && errorData.champs === 'email' && <p id="erreurEmailMessage" className="erreur-message text-danger font-bold">L'email {errorData.error}</p>}
              </div>
              <div className="col-md-12 mb-2">
                <input className="col-6 mb-2 "
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  placeholder="Téléphone"
                />
                {errorData && errorData.champs === 'numero_telephone' && <p id="erreurEmailMessage" className="erreur-message text-danger font-bold">Le numéro de téléphone {errorData.error}</p>}
                {errorData && errorData.champs === 'unchanged' && <p id="erreurEmailMessage" className="erreur-message text-danger font-bold">{errorData.message}</p>}
              </div>

              <button className="btn btn-success col-6 mx-auto" onClick={handleSave}>
                Enregistrer
              </button>
            </div>
          ) : (
            <div className="con-a col-9">
              <p align="center">
                <FontAwesomeIcon icon={faUser} className="text-primary fa-5x mb-3" />
              </p>

              <div className="row col-12 text-center mx-auto">

                {/* Affichage des données du profil */}
                <div className="col-md-6 mb-2">
                  <p className="btn btn-primary form-label col-md-12 col-12">
                    Nom: {userData.name}
                  </p>
                </div>
                <div className="col-md-6 mb-2">
                  <p className="btn btn-primary form-label col-md-12 col-12">
                    Prénom: {userData.username}
                  </p>
                </div>
                <div className="col-md-6 mb-2">
                  <p className="btn btn-primary form-label col-md-12 col-12">
                    Email: {userData.email}
                  </p>
                </div>
                <div className="col-md-6 mb-2">
                  <p className="btn btn-primary form-label col-md-12 col-12">
                    Téléphone: {userData.phone}
                  </p>
                </div>
                <div className="mt-2 col-md-12 col-12 mx-auto">
                  <button className="btn btn-success me-2 col-5" onClick={handleEdit}>
                    Modifier
                  </button>
                  {/* <button className="btn btn-danger col-5" onClick={handleDelete}>
                  Supprimer
                </button> */}
                </div>
              </div>
            </div>
          )}
          {/* <div className="mt-2">
            <button className="btn btn-success me-2 col-3" onClick={handleCreate}>
              Créer
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminProfil;