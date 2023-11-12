{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }
import React, { useState } from "react";
import users from "../../Table/Users";
import { apiUrl } from "../../../config/config";

const AdminChercherCandidat = () => {
  const [searchData, setSearchData] = useState({
    searchCivilite: "",
    searchNom: "",
    searchPrenom: "",
    searchNumero_telephone: "",
    searchEmail: "",
    searchRole: "Candidat", // Par défaut, recherche les "Recruteurs"
  });

  const [results, setResults] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    ///
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/api/admin/getusers/2`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Vous pouvez spécifier le type de contenu si nécessaire
        },
      });
      if (response.status !== 200) {
        throw new Error('Erreur lors de la récupération des données');
      }
      ///
      const users = await response.json();
      console.log(users)
      // Filtrer les Recruteur en fonction des critères de recherche

      const filteredUsers = users.filter(user =>
        searchData.searchNom && user.nom.toLowerCase().includes(searchData.searchNom.toLowerCase()) ||
        searchData.searchNumero_telephone && user.numero_telephone
          .toLowerCase()
          .includes(searchData.searchNumero_telephone.toLowerCase())

      );

      setResults(filteredUsers);
      console.log(filteredUsers);
    }
    catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="row col-12 mx-auto">
      <h2 className="h2">Effectuer une Recherche par ...</h2>
      <form className="row col-12 mx-auto" onSubmit={handleSubmit}>
        <div className="row mb-3 col-md-12 col-12 mx-auto border border-2 border-black rounded rounded-20">
          {/* Champ de recherche par Nom */}
          <div className="mb-3 col-md-12 col-12">
            <label htmlFor="searchNom" className="btn btn-primary m-1 mx-auto col-md-3 col-12">
              Nom
            </label>
            <input
              type="text"
              id="searchNom"
              name="searchNom"
              placeholder="Rechercher par Nom"
              value={searchData.searchNom}
              onChange={handleChange}
              className="btn btn-default m-1 mx-auto col-md-3 col-12" // Classe Bootstrap pour un champ de formulaire
            />
          </div>

          {/* Champ de recherche par Téléphone */}
          <div className="mb-3 col-md-12 col-12">
            <label htmlFor="searchNumero_telephone" className="btn btn-primary m-1 mx-auto col-md-3 col-12">
              Téléphone
            </label>
            <input
              type="text"
              id="searchNumero_telephone"
              name="searchNumero_telephone"
              placeholder="Rechercher par Téléphone"
              value={searchData.searchNumero_telephone}
              onChange={handleChange}
              className="btn btn-default m-1 mx-auto col-md-3 col-12" // Classe Bootstrap pour un champ de formulaire
            />
          </div>


          {/* Bouton de recherche */}
          <button type="submit" className="btn btn-primary mb-3 mx-auto col-md-6 col-12">
            Rechercher
          </button>
        </div>
      </form>

      {/* Affichage des résultats de la recherche */}
      {results.length > 0 && (
        <div className="border border-2 border-black rounded rounded-20  ">
          <h3 className="h3">Résultats de la recherche :</h3>
          <div className="table-responsive">
            {/* Tableau des résultats */}
            <table className="table table-bordered table-striped ">
              <thead>
                <tr>
                  <th scope="col">Civilité</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {results.map((user, index) => (
                  <tr key={index}>
                    <td aria-label={`Civilité de ${user.civilite}`}>{user.civilite}</td>
                    <td aria-label={`Nom de ${user.nom}`}>{user.nom}</td>
                    <td aria-label={`Prénom de ${user.prenom}`}>{user.prenom}</td>
                    <td aria-label={`Téléphone de ${user.numero_telephone}`}>{user.numero_telephone}</td>
                    <td aria-label={`Email de ${user.email}`}>{user.email}</td>
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

export default AdminChercherCandidat;