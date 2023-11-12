{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
*/ }

import React, { useState } from 'react';

const FormCompteCandidat = ({ handleInputChange, formData, errorData }) => {
  const [fileError, setFileError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFileError('');
        handleInputChange({ target: { name: 'file', value: file } });
      } else {
        setFileError('Veuillez sélectionner un fichier PDF.');
      }
    }
  };

  const handleDownloadButtonClick = () => {
    if (formData.file) {
      // Gérez ici le téléchargement du document vers votre serveur ou autre action requise.
      // Pour cet exemple, nous affichons simplement le nom du fichier.
      alert(`Téléchargement du fichier : ${formData.file.name}`);
    } else {
      alert("Veuillez sélectionner un fichier à télécharger.");
    }
  };

  return (
    <>
      <fieldset className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputTelephoneP" className="form-label btn btn-primary col-12 m-1">
            Téléphone
          </label>
          <input
            type="tel"
            className="form-control m-1"
            id="inputTelephoneP"
            placeholder="06-12-34-56-78"
            aria-label="Téléphone"
            name="numero_telephone"
            value={formData.numero_telephone}
            onChange={handleInputChange}
            required
          />
          {errorData && errorData.champs === 'numero_telephone' && <p id="erreurTelMessage" className="erreur-message text-danger font-bold">Le numéro de téléphone {errorData.error}</p>}
        </div>

        <div className="row col-md-12">
          <div className="col-md-4">
            <label htmlFor="inputPosteRechercher" className="form-label btn btn-primary col-12 m-1">
              Poste recherché
            </label>
            <input
              type="text"
              className="form-control m-1"
              id="inputPosteRechercher"
              placeholder="Poste recherché"
              aria-label="Poste recherché"
              name="poste_recherche"
              value={formData.poste_recherche}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="inputExperience" className="form-label btn btn-primary col-12 m-1">
              Expérience
            </label>
            <input
              type="text"
              className="form-control m-1"
              id="inputExperience"
              placeholder="Expérience"
              aria-label="Expérience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="inputMobilteGeographique" className="form-label btn btn-primary col-12 m-1">
              Mobilité Géographique en kilomètres
            </label>
            <input
              type="number"
              className="form-control m-1"
              id="inputMobilteGeographique"
              placeholder="Mobilité Géographique"
              aria-label="Mobilité Géographique"
              name="mobilite_geographique"
              value={formData.mobilite_geographique}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="inputAddress" className="form-label btn btn-primary col-12 m-1">
              Rue
            </label>
            <input
              type="text"
              className="form-control m-1"
              id="inputAddress"
              placeholder="12 boulevard duliondor"
              name="rue"
              value={formData.rue}
              onChange={handleInputChange}
            />
          </div>

          {/* <div className="col-md-6">
            <label htmlFor="inputAddress2" className="form-label btn btn-primary col-12 m-1">
              Adresse 2
            </label>
            <input
              type="text"
              className="form-control m-1"
              id="inputAddress2"
              placeholder="Apartment, studio, étage"
              name="adresse2"
              value={formData.adresse2}
              onChange={handleInputChange}
            />
          </div> */}
        </div>

        <div className="row">
          <div className="col-md-5">
            <label htmlFor="inputStateCandidat" className="form-label btn btn-primary col-12 m-1">
              Pays
            </label>
            <select
              id="inputStateCandidat"
              className="form-select m-1"
              name="pays"
              value={formData.pays}
              onChange={handleInputChange}
            >
              <option value="" disabled hidden className="btn btn-primary m-1">
                Sélectionnez un pays...
              </option>
              <option value="France" className="btn btn-primary m-1">France</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="inputCity" className="form-label btn btn-primary col-12 m-1">
              Ville
            </label>
            <input
              type="text"
              className="form-control m-1"
              id="inputCity"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputZip" className="form-label btn btn-primary col-12 m-1">
              Code-Postal
            </label>
            <input
              type="text"
              className="form-control m-1"
              id="inputZip"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="btn-group col-md-6 m-1" role="group" aria-label="Basic checkbox toggle button group">
          <input type="checkbox" className="btn-check m-1" id="btncheck1" autoComplete="off" />
          <label className="btn btn-primary col-md-6 m-1" htmlFor="btncheck1">Cliquer pour Accepter les CGU</label>
        </div>

        <div className="col-md-6">
          <button type="submit" className="btn btn-primary btn-block maxwidth col-12 m-1">
            Créer un compte
          </button>
        </div>
      </fieldset>
    </>
  );
};

export default FormCompteCandidat;
