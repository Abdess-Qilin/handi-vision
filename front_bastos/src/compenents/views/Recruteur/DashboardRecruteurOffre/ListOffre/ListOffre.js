import React, { useState, useEffect } from "react";


const ListOffre = ({ userStatut }) => {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const token = localStorage.getItem('token');

        // console.log("Avant l'appel à fetch");
        const response = await fetch('http://localhost:3000/api/joboffers/me', {
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

        setOffres(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchOffres(); // Appelez la fonction pour récupérer les données lorsque le composant est monté
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
                {offres.map((data, index) => (
                  <div className="col-md-5 col-lg-4 mx-auto m-3" key={index}>
                    <div className="border border-2 border-black">
                      <p className="btn btn-primary col-12">Poste : {data.poste}</p>
                      <p className="btn btn-primary col-12">Ville : {data.lieu_du_poste}</p>
                      <p className="btn btn-primary col-12">Type_de_contrat : {data.type_de_contrat}</p>
                      <p className="btn btn-primary col-12">Duree_de_contrat : {data.duree_de_contra}</p>
                      <p className="btn btn-primary col-12">Déscription : {data.description}</p>
                      <p className="btn btn-primary col-12">Horaires : {data.horaires}</p>
                      <p className="btn btn-primary col-12">Experience : {data.experience}</p>
                      <p className="btn btn-primary col-12">Salaire : {data.salaire}</p>
                      <p className="btn btn-primary col-12">Politique de teletravail : {data.politique_teletravail}</p>
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

export default ListOffre;

