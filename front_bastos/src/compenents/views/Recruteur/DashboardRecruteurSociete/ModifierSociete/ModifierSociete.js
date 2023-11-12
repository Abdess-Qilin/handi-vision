{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState } from 'react';


function ModifierSociete({ userStatut }) {
  const [societeAModifier, setSocieteAModifier] = useState({
    nom_de_lentreprise: '',
    secteur_activite: '',
    raison_sociale: '',
    statut_juridique: '',
    telephone: '',
    adresse: '',
    effectif: '',
    mail: '',
    site_web: '',
    reseaux_sociaux: '',
    code_NAF_principal: '',
    politique_teletravail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocieteAModifier({ ...societeAModifier, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les modifications de la société à votre API ou effectuer une autre action ici
  };

  return (

    <>
      {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
      {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
      {userStatut == 3 && (
        <>
          <div >
            <h2 className="h2 text-center">Modifier une Société</h2>
            <form className='text-center mx-auto col-12 ' onSubmit={handleSubmit}>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Nom de l'entreprise</label>
                <input className="form-control" type="text" name="nom_de_lentreprise" value={societeAModifier.nom_de_lentreprise} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Secteur d'activité</label>
                <input className=" form-control" type="text" name="secteur_activite" value={societeAModifier.secteur_activite} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Raison sociale</label>
                <input className=" form-control" type="text" name="raison_sociale" value={societeAModifier.raison_sociale} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Statut juridique</label>
                <input className=" form-control" type="text" name="statut_juridique" value={societeAModifier.statut_juridique} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Téléphone</label>
                <input className=" form-control" type="tel" name="telephone" value={societeAModifier.telephone} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Adresse</label>
                <input className=" form-control" type="text" name="adresse" value={societeAModifier.adresse} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Effectif</label>
                <input className=" form-control" type="text" name="effectif" value={societeAModifier.effectif} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Adresse e-mail</label>
                <input className=" form-control" type="email" name="mail" value={societeAModifier.mail} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Site web</label>
                <input className=" form-control" type="url" name="site_web" value={societeAModifier.site_web} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Réseaux sociaux</label>
                <input className=" form-control" type="text" name="reseaux_sociaux" value={societeAModifier.reseaux_sociaux} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Code NAF principal</label>
                <input className=" form-control" type="text" name="code_NAF_principal" value={societeAModifier.code_NAF_principal} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Politique télétravail</label>
                <input className=" form-control" type="text" name="politique_teletravail" value={societeAModifier.politique_teletravail} onChange={handleChange} />
              </div>
              <button className="btn btn-success col-md-4 col-6 mx-auto text-center" type="submit">Enregistrer les Modifications</button>
            </form>
          </div>
        </>
      )}


    </>

  );
}

export default ModifierSociete;
