{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }

import React, { useState, useEffect } from 'react';
//import jwt_decode from 'jwt-decode';
//import Societe from '../../../Table/Societe.js';
import { apiUrl } from '../../../../config/config';

function CreerOffre({ /*societes,*/ userStatut }) {
  const id = localStorage.getItem('id');
  const [nouvelleOffre, setnouvelleOffre] = useState({
    poste: '',
    lieu_du_poste: '',
    type_de_contrat: '',
    duree_de_contrat: '',
    description: '',
    horaires: '',
    experience: '',
    type_de_competence: '',
    competence: '',
    salaire: '',
    politique_teletravail: '',
    code_utilisateur: id,
    code_entreprise: "",
    description: "",
    email_candidature: "",

  });

  console.log("id de l'utilisateur connecté : ", id)
  const [societes, setSocietes] = useState(null);
  useEffect(() => {

    const fetchSocietes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/api/companies/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          //body: JSON.stringify({id})
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setSocietes(data)
        console.log("Ligne 55")
        console.log(societes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSocietes(); // Appelez la fonction pour récupérer les données lorsque le composant est monté

  }, []);

  const [competences, setCompetences] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnouvelleOffre({ ...nouvelleOffre, [name]: value });

    console.log(value)
  };
  const handleChangeCompetence = (e, index) => {
    e.preventDefault();
    const { name } = e.target;
    console.log("je suis dans le handleChangeCompetence")
    const newCompetences = [...competences];
    newCompetences[index] = e.target.value;
    console.log('nouvelles competences : ', newCompetences);
    setCompetences(newCompetences);
    //console.log('nouvelles competences à jour : ',competences);
    //setnouvelleOffre({ ...nouvelleOffre, [name]: competences })
    setnouvelleOffre({ ...nouvelleOffre, [name]: newCompetences })
  };
  const ajouterCompetence = (e) => {
    e.preventDefault();
    setCompetences([...competences, '']);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("nouvelles competence après soumission : ", competences);
    console.log('nouvelles offre à jour : ', JSON.stringify(nouvelleOffre));
    try {
      const token = localStorage.getItem('token');
      let fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(nouvelleOffre),
      };
      const response = await fetch(`${apiUrl}/api/recruteur/formjoboffer`, fetchOptions);
      if (response.ok) {
        // La requête s'est terminée avec succès
        console.log("Inscription réussie");
        alert("L'offre d'emploi a bien été crée. \n Une fois validée, elle apparaitra dans vos listes.")
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
            <h2 className="h2">Créer une Offre</h2>
            <form className="m-t" method="POST" onSubmit={handleSubmit}>
              <div className="create-account form-control ">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="poste" className="form-label btn btn-primary col-12 mb-2">
                      Poste
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="poste"
                      name="poste"
                      value={nouvelleOffre.poste}
                      onChange={handleChange}
                      required
                      aria-label="Saisissez le poste"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="lieu_du_poste" className="form-label btn btn-primary col-12">
                      Lieu du poste
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="lieu_du_poste"
                      name="lieu_du_poste"
                      value={nouvelleOffre.lieu_du_poste}
                      onChange={handleChange}
                      required
                      aria-label="Saisissez le lieu du poste"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="type_de_contrat" className="form-label btn btn-primary col-12">
                      Type de contrat
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="type_de_contrat"
                      name="type_de_contrat"
                      value={nouvelleOffre.type_de_contrat}
                      onChange={handleChange}
                      required
                      aria-label="Saisissez le type de contrat"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="duree_de_contrat" className="form-label btn btn-primary col-12">
                      Durée de contrat
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="duree_de_contrat"
                      name="duree_de_contrat"
                      value={nouvelleOffre.duree_de_contrat}
                      onChange={handleChange}
                      required
                      aria-label="Saisissez la durée du contrat"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="description" className="form-label btn btn-primary col-12">
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control mb-2"
                      id="description"
                      name="description"
                      value={nouvelleOffre.description}
                      onChange={handleChange}
                      required
                      aria-label="Déscription de l'offre d'emploi"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="email" className="form-label btn btn-primary col-12">
                      Email de Contact
                    </label>
                    <input
                      type="email"
                      className="form-control mb-2"
                      id="email"
                      name="email_candidature"
                      value={nouvelleOffre.email_candidature}
                      onChange={handleChange}
                      required
                      aria-label="email de Contact"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="horaires" className="form-label btn btn-primary col-12">
                      Horaires
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="horaires"
                      name="horaires"
                      value={nouvelleOffre.horaires}
                      onChange={handleChange}
                      required
                      aria-label="Saisissez les horaires"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="experience" className="form-label btn btn-primary col-12">
                      Expérience requise (années)
                    </label>
                    <input
                      type="number"
                      className="form-control mb-2"
                      id="experience"
                      name="experience"
                      value={nouvelleOffre.experience}
                      onChange={handleChange}
                      required
                      aria-label="Saisissez l'expérience requise en années"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    {competences.map((competence, index) => {
                      console.log(competence)
                      return (
                        <div className="col-md-4" key={index}>
                          <label htmlFor={`competence${index}`} className="form-label btn btn-primary col-12 mb-2">
                            Compétence
                          </label>
                          <input
                            type="text"
                            className="form-control mb-2"
                            id={`competence${index}`}
                            name={`competence`}
                            // value={nouvelleOffre.competence[index]}
                            onChange={(e) => handleChangeCompetence(e, index)}
                            aria-label="Saisissez la compétence"
                          />
                        </div>
                      )
                    })}
                    <div className="col-md-4">
                      <button
                        type="button"
                        className="btn btn-primary" onClick={ajouterCompetence}>
                        Ajouter compétence
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="type_de_competence" className="form-label btn btn-primary col-12 mb-2">
                      Type de Competence
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="type_de_competence"
                      name="type_de_competence"
                      value={nouvelleOffre.type_de_competence}
                      onChange={handleChange}
                      required
                      aria-label="Saisissez le type_de_competence"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="salaire" className="form-label btn btn-primary col-12">
                      Salaire annuel (€)
                    </label>
                    <input
                      type="number"
                      className="form-control mb-2"
                      id="salaire"
                      name="salaire"
                      value={nouvelleOffre.salaire}
                      onChange={handleChange}
                      required
                      aria-label="Saisissez le salaire annuel en euros"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="code_entreprise" className="form-label btn btn-primary col-12">
                      Sélectionnez l'entreprise
                    </label>
                    <select
                      name='code_entreprise'
                      value={nouvelleOffre.code_entreprise}
                      onChange={handleChange}
                    >
                      <option value="">-- Entreprise --</option>
                      {societes?.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.nom_de_lentreprise}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
export default CreerOffre;
