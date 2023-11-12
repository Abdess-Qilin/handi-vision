import React, { useState } from 'react';

function ModifierOffre() {
  const [societeAModifier, setSocieteAModifier] = useState({
    Poste: '',
    Ville: '',
    Type_de_contrat: '',
    Duree_de_contrat: '',
    Description: '',
    Horaires: '',
    Experience: '',
    Type_de_competence: '',
    Competence: '',
    Horaires: '',
    Experience: '',
    Type_de_competence: '',
    Competence: '',
    Salaire: '',
    Politique_teletravail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocieteAModifier({ ...societeAModifier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construire l'objet à envoyer à l'API
    const offreModifiee = {
      Poste: societeAModifier.Poste,
      Ville: societeAModifier.Ville,
      Type_de_contrat: societeAModifier.Type_de_contrat,
      Duree_de_contrat: societeAModifier.Duree_de_contrat,
      Description: societeAModifier.Description,
      Horaires: societeAModifier.Horaires,
      Experience: societeAModifier.Experience,
      Type_de_competence: societeAModifier.Type_de_competence,
      Competence: societeAModifier.Competence,
      Salaire: societeAModifier.Salaire,
      Politique_teletravail: societeAModifier.Politique_teletravail,
    };

    try {
      // Envoyer la requête POST à l'API (remplacez l'URL de l'API par la vôtre)
      const response = await fetch('https://exemple-api.com/offres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offreModifiee),
      });

      if (response.ok) {
        // La requête a réussi, vous pouvez gérer la réponse ici
        console.log('Offre modifiée avec succès !');
      } else {
        // La requête a échoué, gérer les erreurs ici
        console.error('Erreur lors de la modification de l\'offre.');
      }
    } catch (error) {
      // Gérer les erreurs liées à la requête ici
      console.error('Une erreur s\'est produite :', error);
    }
  };

  return (
    <div className='row col-12 text-center'>
      <h2 className="h2">Modifier une Offre</h2>
      <form onSubmit={handleSubmit}>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Poste</label>
          <input className="form-control" type="text" name="Poste" value={societeAModifier.Poste} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Ville</label>
          <input className="form-control" type="text" name="Ville" value={societeAModifier.Ville} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Type de Contrat</label>
          <input className="form-control" type="text" name="Type_de_contrat" value={societeAModifier.Type_de_contrat} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Durée du Contrat</label>
          <input className="form-control" type="text" name="Duree_de_contrat" value={societeAModifier.Duree_de_contrat} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Déscription</label>
          <input className="form-control" type="text" name="Déscription de l'offre" value={societeAModifier.Description} onChange={handleChange} />
        </div>

        <div className="btn-primary m-1 p-2">
          <label className="form-label">Horaires</label>
          <input className="form-control" type="text" name="Horaires" value={societeAModifier.Horaires} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Expérience</label>
          <input className="form-control" type="text" name="Experience" value={societeAModifier.Experience} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Competence</label>
          <input className="form-control" type="text" name="Competence" value={societeAModifier.Competence} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Type de competence</label>
          <input className="form-control" type="text" name="Type_de_competence" value={societeAModifier.Type_de_competence} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Salaire</label>
          <input className="form-control" type="text" name="Salaire" value={societeAModifier.Salaire} onChange={handleChange} />
        </div>
        <div className="btn-primary m-1 p-2">
          <label className="form-label">Politique de Teletravail</label>
          <input className="form-control" type="text" name="Politique_teletravail" value={societeAModifier.Politique_teletravail} onChange={handleChange} />
        </div>
        <div>
          <button className="btn btn-success" type="submit">Enregistrer les Modifications</button>
        </div>
      </form>
    </div>
  );
}

export default ModifierOffre;