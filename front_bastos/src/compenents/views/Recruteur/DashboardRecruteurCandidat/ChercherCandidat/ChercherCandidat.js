{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  
    <p> IFZAL Zohab Ahmed: ahmed.ifzal89@gmail.com</p>  
    <p> BELHACHEMI Soumaya: belhachemi.soumaya.dev@gmail.com</p>
    <p> BIMKHIOUAD Abdesselam: Abimkhiouad@gmail.com</p>
    <p> BLAIZE Vincent: blaize.vincent@hotmail.com</p>
*/ }
import React, { useState } from "react";
import users from "../../../Table/Users";

const ChercherCandidat = () => {
  const [searchData, setSearchData] = useState({
    searchCivilite: "",
    searchNom: "",
    searchPrenom: "",
    searchNumero_telephone: "",
    searchEmail: "",
    searchRole: "candidat", // Par défaut, recherche les "candidats"
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filtrer les candidats en fonction des critères de recherche
    const filteredUsers = users.filter((user) => {
      // Liste de champs de recherche
      return (
        user.role.toLowerCase() === searchData.searchRole.toLowerCase() &&
        user.nom.toLowerCase().includes(searchData.searchNom.toLowerCase()) &&
        user.numero_telephone
          .toLowerCase()
          .includes(searchData.searchNumero_telephone.toLowerCase())
      );
    });

    setResults(filteredUsers);
  };

  return (
    <div className="row col-12 mx-auto">
      <h2 className="h2">Effectuer une Recherche par ...</h2>
      <form className="row col-12 mx-auto" onSubmit={handleSubmit}>
        <div className="row m col-12 mx-auto border border-2 border-black rounded rounded-20">
          {/* Champ de recherche par Nom */}
          <div className="mb-3 col-md-6 mx-auto col-12">
            <label htmlFor="searchNom" className="form-label label label-primary col-md-6 col-12 m-1 p-2">
              Nom
            </label>
            <input
              type="text"
              id="searchNom"
              name="searchNom"
              placeholder="Rechercher par Nom"
              value={searchData.searchNom}
              onChange={handleChange}
              className="form-control col-md-6 col-9 m-1 p-2"
            />
          </div>

          {/* Champ de recherche par Téléphone */}
          <div className="mb-3 col-md-6 mx-auto col-12">
            <label htmlFor="searchNumero_telephone" className="form-label label label-primary col-md-6 col-12 m-1 p-2">
              Téléphone
            </label>
            <input
              type="text"
              id="searchNumero_telephone"
              name="searchNumero_telephone"
              placeholder="Rechercher par Téléphone"
              value={searchData.searchNumero_telephone}
              onChange={handleChange}
              className="form-control col-md-6 col-9 m-1 p-2"
            />
          </div>
        </div>

        {/* Bouton de recherche */}
        <button type="submit" className="btn btn-primary mb-3 mx-auto col-md-6 col-12">
          Rechercher
        </button>
      </form>

      {/* Affichage des résultats de la recherche */}
      {results.length > 0 && (
        <div className="border border-2 border-black rounded rounded-20">
          <h3 className="h3">Résultats de la recherche :</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Civilité</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rôle</th>
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
                    <td aria-label={`Rôle de ${user.role}`}>{user.role}</td>
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

export default ChercherCandidat;
