{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
*/ }

import React from 'react';

const FormCompteRecruteur = ({ handleInputChange, formData, errorData }) => {
  return (
    <>
      <fieldset className="form-control row g-3">
        <div className="col-md-6">
          <label htmlFor="inputTelephoneP" className="form-label btn btn-primary col-12 m-1">
            Téléphone
          </label>
          <input
            type="tel"
            className="form-control mb-3 m-1"
            id="inputTelephoneP"
            placeholder="06-12-34-56-78"
            aria-label="Téléphone"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorData && errorData.champs === 'numero_telephone' && <p id="erreurTelMessage" className="erreur-message text-danger font-bold">Le numéro de téléphone {errorData.error}</p>}

        <div className="row col-md-12">
          <div className="col-md-6">
            <label htmlFor="inputAddress" className="form-label btn btn-primary col-12 m-1">
              Rue
            </label>
            <input
              type="text"
              className="form-control mb-3 m-1"
              id="inputAddress"
              placeholder="12 boulevard duliondor"
              name="rue"
              value={formData.rue}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div className="col-md-6">
            <label htmlFor="inputAddress2" className="form-label btn btn-primary col-12 m-1">
              Adresse 2
            </label>
            <input
              type="text"
              className="form-control mb-3 m-1"
              id="inputAddress2"
              placeholder="Apartment, studio, étage"
              name="adresse2"
              value={formData.adresse2}
              onChange={handleInputChange}
            />
          </div> */}
        </div>

        <div className="row co-md-12">
          {/*  <div className="col-md-5">
            <label htmlFor="inputStateRecruteur" className="form-label btn btn-primary col-12 m-1">
              Pays
            </label>
            <select
              id="inputStateRecruteur"
              className="form-select mb-3 m-1"
              name="pays"
              value={formData.pays}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden className="btn btn-primary mb-3 m-1">
                Sélectionnez un pays...
              </option>
              <option value="France" className="btn btn-primary mb-3 m-1">
                France
              </option>
            </select>
          </div> */}

          <div className="col-md-4">
            <label htmlFor="inputCity" className="form-label btn btn-primary col-12 m-1">
              Ville
            </label>
            <input
              type="text"
              className="form-control mb-3 m-1"
              id="inputCity"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputZip" className="form-label btn btn-primary col-12 m-1">
              Code-Postal
            </label>
            <input
              type="text"
              className="form-control mb-3 col-12 m-1"
              id="inputZip"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div
          className="btn-group col-md-6 m-1"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          <input type="checkbox" className="btn-check m-1" id="btncheck1" autoComplete="off" />
          <label className="btn btn-primary col-md-6 m-1" htmlFor="btncheck1">
            Cliquer pour Accepter les CGU
          </label>
        </div>

        <div className="col-md-6">
          <button
            type="submit"
            className="btn btn-primary btn-block maxwidth col-12 m-1"
            aria-label="Créer un compte"
          >
            Créer un compte
          </button>
        </div>
      </fieldset>
    </>
  );
};

export default FormCompteRecruteur;
