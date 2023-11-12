{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
*/ }

import React, { useState } from "react";

const ChercherSociete = () => {
  const [searchData, setSearchData] = useState({
    searchnom_de_lentreprise: '',
    searchsecteur_activite: '',
    searchraison_sociale: '',
    searchstatut_juridique: '',
    searchtelephone: '',
    searchadresse: '',
    searcheffectif: '',
    searchmail: '',
    searchsite_web: '',
    searchreseaux_sociaux: '',
    searchcode_NAF_principal: '',
    searchpolitique_teletravail: '',
  });

  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
    console.log(searchData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/admin/getcompanies', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Vous pouvez spécifier le type de contenu si nécessaire
        },
      });
      if (response.status !== 200) {
        throw new Error('Erreur lors de la récupération des données');
      }
      0
      const societes = await response.json();

      // Filtrer les sociétés en fonction des critères de recherche
      const filteredSocietes = societes.filter(societe => searchData.searchnom_de_lentreprise && societe.nom_de_lentreprise.toLowerCase().includes(searchData.searchnom_de_lentreprise.toLowerCase()) || searchData.searchtelephone && societe.telephone.toLowerCase().includes(searchData.searchtelephone.toLowerCase()));
      setResults(filteredSocietes);
      setShowForm(false);
    }
    catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="row col-12 mx-auto">
      <h2 className="h2">Effectuer une Recherche par ...</h2>
      <form className="row col-12 mx-auto" onSubmit={handleSubmit}>
        <div className="row mb-3 col-md-12 col-12 mx-auto border border-2 border-black rounded rounded-20">
          {/* Champ de recherche par Nom */}
          <div className="mb-3 col-md-12 col-12">
            <label htmlFor="searchnom_de_lentreprise" className="bg-primary p-2 text-black font-bold rounded m-1 mx-auto col-md-3 col-12">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              id="searchnom_de_lentreprise"
              name="searchnom_de_lentreprise"
              placeholder="Rechercher par Nom de l'entreprise"
              value={searchData.searchnom_de_lentreprise}
              onChange={handleChange}
              className="btn btn-default m-1 mx-auto col-md-3 col-12"
            />
          </div>

          <div className="mb-3 col-md-12 col-12">
            <label htmlFor="searchtelephone" className="bg-primary p-2 text-black font-bold rounded m-1 mx-auto col-md-3 col-12">
              Téléphone
            </label>
            <input
              type="number"
              id="searchtelephone"
              name="searchtelephone"
              placeholder="Rechercher par Téléphone"
              value={searchData.searchtelephone}
              onChange={handleChange}
              className="btn btn-default m-1 mx-auto col-md-3 col-12"
            />
          </div>

          {/* Ajoutez d'autres champs de recherche ici, en suivant le modèle ci-dessus. */}

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
                  <th scope="col">Nom de l'entreprise</th>
                  <th scope="col">Secteur d'activité</th>
                  <th scope="col">Raison sociale</th>
                  <th scope="col">Statut juridique</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Effectif</th>
                  <th scope="col">Adresse e-mail</th>
                  <th scope="col">Site web</th>
                  <th scope="col">Réseaux sociaux</th>
                  <th scope="col">Code NAF principal</th>
                  <th scope="col">Politique télétravail</th>
                </tr>
              </thead>
              <tbody>
                {results.map((societe, index) => (
                  <tr key={index}>
                    <th scope="row" aria-label={`Nom de l'entreprise ${societe.nom_de_lentreprise}`}>{societe.nom_de_lentreprise}</th>
                    <td aria-label={`Secteur d'activité ${societe.secteur_activite}`}>{societe.secteur_activite}</td>
                    <td aria-label={`Raison sociale ${societe.raison_sociale}`}>{societe.raison_sociale}</td>
                    <td aria-label={`Statut juridique ${societe.statut_juridique}`}>{societe.statut_juridique}</td>
                    <td aria-label={`Téléphone ${societe.telephone}`}>{societe.telephone}</td>
                    <td aria-label={`Adresse ${societe.adresse}`}>{societe.adresse}</td>
                    <td aria-label={`Effectif ${societe.effectif}`}>{societe.effectif}</td>
                    <td aria-label={`Adresse e-mail ${societe.mail}`}>{societe.mail}</td>
                    <td aria-label={`Site web ${societe.site_web}`}>{societe.site_web}</td>
                    <td aria-label={`Réseaux sociaux ${societe.reseaux_sociaux}`}>{societe.reseaux_sociaux}</td>
                    <td aria-label={`Code NAF principal ${societe.code_NAF_principal}`}>{societe.code_NAF_principal}</td>
                    <td aria-label={`Politique télétravail ${societe.politique_teletravail}`}>{societe.politique_teletravail}</td>
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

export default ChercherSociete;