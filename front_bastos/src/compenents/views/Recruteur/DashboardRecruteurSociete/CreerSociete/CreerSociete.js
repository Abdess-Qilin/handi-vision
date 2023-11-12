{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState } from 'react';


function CreerSociete({ userStatut }) {
  const id = localStorage.getItem('id');
  const [nouvelleSociete, setNouvelleSociete] = useState({
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
    code_utilisateur: id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNouvelleSociete({ ...nouvelleSociete, [name]: value });
    console.log(value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Envoyer les données de la nouvelle société à votre API ou effectuer une autre action ici
    try {

      let fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(nouvelleSociete),
      };
      const response = await fetch('http://localhost:3000/api/company/register', fetchOptions);
      if (response.ok) {
        // La requête s'est terminée avec succès
        console.log("Votre entreprise a été enregistrée avec succès.");
        // Rediriger l'utilisateur vers la page de succès ou faire d'autres actions nécessaires
        window.location.href = '/DashboardRecruteur';
      } else {
        // Gérer les erreurs de requête ici, par exemple :
        console.error("Erreur lors de l'inscription :", response.statusText);
      }
    } catch (error) {
      console.log('Fetch error: ', error);
    }

  };

  return (
    <>
      {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
      {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
      {userStatut == 3 && (
        <>
          <div className='row col-12 text-center'>
            <h2 className="h2">Créer une Société</h2>
            <form className="col-md-12" onSubmit={handleSubmit}>
              <div className="btn-primary m-1 p-2">
                <label className="form-label ">Nom de l'entreprise</label>
                <input className=" form-control" type="text" name="nom_de_lentreprise" value={nouvelleSociete.nom_de_lentreprise} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Secteur d'activité</label>
                <input className="form-control" type="text" name="secteur_activite" value={nouvelleSociete.secteur_activite} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Raison sociale</label>
                <input className=" form-control" type="text" name="raison_sociale" value={nouvelleSociete.raison_sociale} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Statut juridique</label>
                <input className=" form-control" type="text" name="statut_juridique" value={nouvelleSociete.statut_juridique} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Téléphone</label>
                <input className=" form-control" type="tel" name="telephone" value={nouvelleSociete.telephone} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Adresse</label>
                <input className=" form-control" type="text" name="adresse" value={nouvelleSociete.adresse} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Effectif</label>
                <input className=" form-control" type="text" name="effectif" value={nouvelleSociete.effectif} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Adresse e-mail</label>
                <input className=" form-control" type="email" name="mail" value={nouvelleSociete.mail} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Site web</label>
                <input className=" form-control" type="url" name="site_web" value={nouvelleSociete.site_web} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Réseaux sociaux</label>
                <input className=" form-control" type="text" name="reseaux_sociaux" value={nouvelleSociete.reseaux_sociaux} onChange={handleChange} />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Code NAF principal</label>
                <input className=" form-control" type="text" name="code_NAF_principal" value={nouvelleSociete.code_NAF_principal} onChange={handleChange} required />
              </div>
              <div className="btn-primary m-1 p-2">
                <label className="form-label">Politique télétravail</label>
                <input className=" form-control" type="text" name="politique_teletravail" value={nouvelleSociete.politique_teletravail} onChange={handleChange} />
              </div>
              <div >
                <button className="btn btn-info col-4 mx-2 mb-4" type="submit">Créer la Société</button>
              </div>
            </form>
          </div>
        </>

      )}


    </>


  );
}

export default CreerSociete;
