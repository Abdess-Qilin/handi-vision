{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }

import React, { useState } from "react";
//import Offre from "../../Table/Offre";

const ChercherOffre = () => {
  const [searchData, setSearchData] = useState({
    searchPoste: '',
    searchVille: '',
    searchType_de_contrat: '',
    searchDuree_de_contrat: '',
    searchHoraires: '',
    searchExperience: '',
    searchSalaire: '',
    searchPolitique_teletravail: '',
    searchType_de_competence: '',
    searchCompetence: '',
    searchmail: '',
  });

  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/admin/getjoboffers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Vous pouvez spécifier le type de contenu si nécessaire
        },
      });
      console.log(response)
      if (response.status !== 200) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      console.log(data)
      //setResults(data);
      console.log(results);
      // Filtrer les offres en fonction des critères de recherche
      const filteredOffres = data.filter((offre) => {

        const isPosteEmpty = searchData.searchPoste === '';
        const isPosteFound = offre.poste.toLowerCase().includes(searchData.searchPoste.toLowerCase());
        const isVilleFound = offre.lieu_du_poste.toLowerCase().includes(searchData.searchVille.toLowerCase());

        return !isPosteEmpty && (isPosteFound && isVilleFound)
      }

      );
      setResults(filteredOffres);
      console.log(results)

    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
    }


    //console.log(searchData);
    // console.log(filteredOffres);

    // console.log(results)
    //setResults(filteredOffres);
    setShowForm(false);
  };

  return (
    <div className="row col-12 mx-auto">
      <h2 className="h2">Effectuer une Recherche par ...</h2>
      <form className="row col-12 mx-auto" onSubmit={handleSubmit}>
        <div className="row mb-3 col-md-12 col-12 mx-auto border border-2 border-black rounded rounded-20">
          <div className="mb-3 col-md-12 col-12">
            <label htmlFor="searchPoste" className="btn btn-primary m-1 mx-auto col-md-3 col-12">
              Poste
            </label>
            <input
              type="text"
              id="searchPoste"
              name="searchPoste"
              placeholder="Rechercher par Poste"
              value={searchData.searchPoste}
              onChange={handleChange}
              className="btn btn-default m-1 mx-auto col-md-3 col-12"
            />
          </div>

          <div className="mb-3 col-md-12 col-12">
            <label htmlFor="searchVille" className="btn btn-primary m-1 mx-auto col-md-3 col-12">
              Ville
            </label>
            <input
              type="text"
              id="searchVille"
              name="searchVille"
              placeholder="Rechercher par Ville"
              value={searchData.searchVille}
              onChange={handleChange}
              className="btn btn-default m-1 mx-auto col-md-3 col-12"
            />
          </div>



          <button type="submit" className="btn btn-primary mb-3 mx-auto col-md-6 col-12">
            Rechercher
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div>
          <h3 className="h3">Résultats de la recherche :</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Poste</th>
                  <th scope="col">Ville</th>
                  <th scope="col">Type de contrat</th>
                  <th scope="col">Durée de contrat</th>
                  <th scope="col">Horaires</th>
                  <th scope="col">Expérience</th>
                  <th scope="col">Salaire</th>
                  <th scope="col">Politique télétravail</th>
                  <th scope="col">Type de compétence</th>
                  <th scope="col">Compétence</th>
                  <th scope="col">Adresse e-mail</th>
                </tr>
              </thead>
              <tbody>
                {results.map((offre, index) => (
                  <tr key={index}>
                    <th scope="row" aria-label={`Poste ${offre.poste}`}>{offre.poste}</th>
                    <td aria-label={`Ville ${offre.lieu_du_poste}`}>{offre.lieu_du_poste}</td>
                    <td aria-label={`Type de contrat ${offre.type_de_contrat}`}>{offre.type_de_contrat}</td>
                    <td aria-label={`Durée de contrat ${offre.duree_de_contrat}`}>{offre.duree_de_contrat}</td>
                    <td aria-label={`Horaires ${offre.horaires}`}>{offre.horaires}</td>
                    <td aria-label={`Expérience ${offre.experience}`}>{offre.experience}</td>
                    <td aria-label={`Salaire ${offre.salaire}`}>{offre.salaire}</td>
                    <td aria-label={`Politique télétravail ${offre.politique_teletravail}`}>{offre.politique_teletravail}</td>
                    <td aria-label={`Type de compétence ${offre.type_de_competence}`}>{offre.type_de_competence}</td>
                    <td aria-label={`Compétence ${offre.competence}`}>{offre.competence}</td>
                    <td aria-label={`Adresse e-mail ${offre.mail}`}>{offre.mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChercherOffre;
