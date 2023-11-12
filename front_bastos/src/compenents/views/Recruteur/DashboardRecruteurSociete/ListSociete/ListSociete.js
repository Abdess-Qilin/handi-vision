import React, { useState, useEffect } from "react";
import Societe from "../../../Table/Societe";


const ListSociete = ({ societes, setSocietes, userStatut }) => {
  /*  const [societes, setSocietes] = useState([]); */
  useEffect(() => {
    const fetchSocietes = async () => {

      try {
        const token = localStorage.getItem('token');

        // console.log("Avant l'appel à fetch");
        const response = await fetch('http://localhost:3000/api/companies/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // console.log("Après l'appel à fetch");
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        console.log("Après l'attente de la réponse JSON", data);

        setSocietes(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchSocietes(); // Appelez la fonction pour récupérer les données lorsque le composant est monté

  }, []);



  return (
    <>
      {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
      {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
      {userStatut == 3 && (
        <>
          <div className="row col-12 text-center">
            <h2 className="h2">Liste de Mes Sociétés</h2>
            <div className="container text-center">
              <div className="row">
                {societes.map((data, index) => (
                  <div className="col-md-5 col-lg-4 mx-auto m-3" key={index}>
                    <div className="border border-2 border-black">
                      <p className="btn btn-primary col-12">Nom de l'entreprise : {data.nom_de_lentreprise}</p>
                      <p className="btn btn-primary col-12">Secteur d'activité : {data.secteur_activite}</p>
                      <p className="btn btn-primary col-12">Raison sociale : {data.raison_sociale}</p>
                      <p className="btn btn-primary col-12">Statut juridique : {data.statut_juridique}</p>
                      <p className="btn btn-primary col-12">Téléphone : {data.telephone}</p>
                      <p className="btn btn-primary col-12">Adresse : {data.adresse}</p>
                      <p className="btn btn-primary col-12">Effectif : {data.effectif}</p>
                      <p className="btn btn-primary col-12">Adresse e-mail : {data.mail}</p>
                      <p className="btn btn-primary col-12">Site web : {data.site_web}</p>
                      <p className="btn btn-primary col-12">Réseaux sociaux : {data.reseaux_sociaux}</p>
                      <p className="btn btn-primary col-12">Code NAF principal : {data.code_NAF_principal}</p>
                      <p className="btn btn-primary col-12">Politique télétravail : {data.politique_teletravail}</p>
                      {/* Affichez d'autres données de la société si nécessaire */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

    </>

  );
};

export default ListSociete;
