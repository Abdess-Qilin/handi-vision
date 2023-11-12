{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
*/ }

import React, { useState } from "react";
import logo from "../../images/img/image.png";
import Header from "../../Partials/Header/Header";

import FormCompteRecruteur from "./FormCompteRecruteur.js";
import FormCompteCandidat from "./FormCompteCandidat.js";
import HeadBienvennue from "../../Partials/HeadBienvennue/HeadBienvennue";

const Inscription = () => {
  const [formData, setFormData] = useState({
    civilite: "",
    nom: "",
    prenom: "",
    email: "",
    confirmerEmail: "",
    mot_de_passe: "",
    confirmerMotDePasse: "",
    code_role: "candidat",
    checked: false,
    rqth: "",
    numero_telephone: "",
    rue: "",
    ville: "",
    codePostal: "",
    poste_recherche: "",
    experience: "",
    mobilite_geographique: "0",
  });

  const [errorData, setErrorData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,

    });
    console.log(value)
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setErrorData(null);

    // Vérifier si les mots de passe correspondent
    if (formData.mot_de_passe !== formData.confirmerMotDePasse) {
      // Les mots de passe ne correspondent pas, affichez une erreur ou empêchez la soumission du formulaire.
      alert('Les mots de passe ne correspondent pas.');
      return; // Empêche l'envoi du formulaire si les mots de passe ne correspondent pas
    }

    // Vérifier si les mots de passe correspondent
    if (formData.email !== formData.confirmerEmail) {
      // Les mots de passe ne correspondent pas, affichez une erreur ou empêchez la soumission du formulaire.
      alert('Les adresses email ne correspondent pas.');
      return; // Empêche l'envoi du formulaire si les mots de passe ne correspondent pas
    }

    try {
      let fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch('http://localhost:3000/api/user/register', fetchOptions);
      if (response.ok) {
        // La requête s'est terminée avec succès
        console.log("Inscription réussie");
        // Rediriger l'utilisateur vers la page de succès ou faire d'autres actions nécessaires
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setErrorData(errorData);
        // Gérer les erreurs de requête ici, par exemple :
        console.error("Erreur lors de l'inscription :", response.statusText);
      }
    } catch (error) {
      console.log('Fetch error: ', error);
    }
  }

  return (
    <>
      <Header />
      <div className="conexion col-md-12">
        <HeadBienvennue />

        <div className="col-md-8 ibox-content column con-b">
          <p align="center">
            <img
              src={logo}
              alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
              width="80"
            />
          </p>
          <form
            method="POST"
            className="m-t"
            role="form"
            onSubmit={handleSubmit}
            aria-labelledby="inscription-form"
          >
            <fieldset className="form-control row g-3 m-2">
              <legend id="inscription-form" tabIndex="0">
                Formulaire d'Inscription
              </legend>
              <div className="row">
                <div className="col-md-3">
                  <label
                    htmlFor="inputStateCivilite"
                    className="form-label btn btn-primary mb-3 col-12"
                  >
                    Civilité
                  </label>
                  <select
                    id="inputStateCivilite"
                    className="form-select mb-3"
                    name="civilite"
                    value={formData.civilite}
                    onChange={handleInputChange}
                  >
                    <option
                      value=""
                      disabled
                      hidden
                      className="btn btn-primary mb-3"
                    >
                      Sélectionnez ...
                    </option>
                    <option value="Monsieur" className="btn btn-primary mb-3">
                      Mr.
                    </option>
                    <option value="Madame" className="btn btn-primary mb-3">
                      Mme.
                    </option>
                    <option value="Autre" className="btn btn-primary mb-3">
                      Autre.
                    </option>
                  </select>
                </div>

                <div className="col-md-5">
                  <label
                    htmlFor="inputNom"
                    className="form-label btn btn-primary mb-3 col-12"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="inputNom"
                    placeholder="Nom de Famille"
                    aria-label="Nom de Famille"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="inputPrenom"
                    className="form-label btn btn-primary mb-3 col-12"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="inputPrenom"
                    placeholder="Prénom"
                    aria-label="Prénom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* ... Ajoutez les autres champs de formulaire ici avec des étiquettes <label> appropriées */}
              <div className="row">
                <div className="col-md-6" id="form">
                  <label
                    htmlFor="email"
                    className="form-label btn btn-primary  mb-3 col-12"
                    tabIndex="0"
                  >
                    Votre email
                  </label><br />
                  <input
                    type="email"
                    autoComplete="email"
                    className="form-control col-md-6 mb-3"
                    id="email"
                    aria-label="Saisir ici votre email"
                    required=""
                    placeholder="votremail@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errorData && errorData.champs === 'email' && <p id="erreurEmailMessage" className="erreur-message text-danger font-bold">L'email {errorData.error}</p>}
                </div>
                <div className="col-md-6" id="form">
                  <label
                    htmlFor="Confirmeremail"
                    className="form-label btn btn-primary col-md- mb-3 col-12"
                    tabIndex="0"
                  >
                    Confirmer Votre email
                  </label>
                  <input
                    type="email"
                    autoComplete="username"
                    className="form-control col-md-4 mb-3"
                    id="Confirmeremail"
                    aria-label="Saisir ici votre email"
                    required=""
                    placeholder="Confirmer-votremail@gmail.com"
                    name="confirmerEmail"
                    value={formData.confirmerEmail}
                    onChange={handleInputChange}
                  />
                </div>

              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="inputPassword"
                    className="form-label btn btn-primary mb-3 col-12"
                    tabIndex="0"
                  >
                    Votre mot de passe
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="form-control mb-3 col-12"
                    id="inputPassword"
                    aria-label="Saisir ici votre mot de passe"
                    required=""
                    placeholder="Mot de passe"
                    name="mot_de_passe"
                    value={formData.mot_de_passe}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="inputConfirmerPassword"
                    className="form-label btn btn-primary mb-3 col-12"
                    tabIndex="0"
                  >
                    Confirmer Votre mot de passe
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="form-control mb-3"
                    id="inputConfirmerPassword"
                    aria-label="Saisir ici votre mot de passe"
                    required=""
                    placeholder="Confirmer votre mot de passe"
                    name="confirmerMotDePasse"
                    value={formData.confirmerMotDePasse}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* ... Continuez avec les autres champs de formulaire */}
            </fieldset>
            <fieldset className="form-control m-2">
              <div className="col-md-4">
                <label
                  htmlFor="inputRole"
                  className="form-label btn btn-primary col-12"
                >
                  Rôle
                </label>
                <select
                  id="inputRole"
                  className="form-select mb-3"
                  name="code_role"
                  value={formData.code_role}
                  onChange={handleInputChange}
                >
                  <option
                    value=""
                    disabled
                    hidden
                    className="btn btn-primary"
                  >
                    Sélectionnez un Rôle...
                  </option>
                  <option value="recruteur" className="btn btn-primary">
                    Recruteur
                  </option>
                  <option value="candidat" className="btn btn-primary">
                    Candidat
                  </option>
                </select>
              </div>
              {formData.code_role === "recruteur" ? (
                <FormCompteRecruteur
                  handleInputChange={handleInputChange}
                  formData={formData} errorData={errorData}
                />
              ) : (
                <FormCompteCandidat
                  handleInputChange={handleInputChange}
                  formData={formData} errorData={errorData}
                />
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Inscription;
