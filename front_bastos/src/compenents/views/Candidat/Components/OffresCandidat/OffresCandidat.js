// Fait par Vincent, GitHub : Vyn100 (https://github.com/Vyn100);
// Email : blaize.vincent@hotmail.com

import CarousselCandidat from "../AccueilCandidat/DashboardCandidat";
import { useState, useEffect } from "react";

const OffreCandidat = () => {

    const [offres, setOffres] = useState([]);
    const [userStatut, setUserStatut] = useState(null)
    const [filtres, setFiltres] = useState({
        poste: "",
        type_de_contrat: "",
        lieu_du_poste: "",
        politique_teletravail: ""
    });

    /*  useEffect(() => {
         const findStatut = localStorage.getItem('statut');
         if (findStatut) {
             setStatut(findStatut)
         } else {
             console.error('finStatut non trouve')
         }
     }, []) */

    /* const [offres, setOffres] = useState([
         { id: 0, poste: "Développeur", typeContrat: "CDI", lieu_du_poste: "Paris", teletravail: "Oui" },
     ]);*/

    const [uniquePostes, setUniquePostes] = useState([]);
    const [uniqueLieuDuPoste, setUniqueLieuDuPoste] = useState([]);

    useEffect(() => {
        const newUniquePostes = [...new Set(offres.map(offre => offre.poste))];
        const newUniqueLieuDuPoste = [...new Set(offres.map(offre => offre.lieu_du_poste))];

        setUniquePostes(newUniquePostes);
        setUniqueLieuDuPoste(newUniqueLieuDuPoste);
    }, [offres]);

    /* useEffect(() => {
         const timer = setTimeout(() => {
             setOffres([...offres,
             { id: 1, poste: "Développeur", typeContrat: "CDI", lieu_du_poste: "Paris", teletravail: "Oui" },
             { id: 2, poste: "Designer", typeContrat: "CDD", lieu_du_poste: "Marseille", teletravail: "Oui" },
             { id: 3, poste: "Data Analyst", typeContrat: "CDI", lieu_du_poste: "Lyon", teletravail: "Oui" },
             { id: 4, poste: "Dentiste", typeContrat: "CDI", lieu_du_poste: "Poitiers", teletravail: "Non" },
             { id: 5, poste: "Musicien", typeContrat: "CDD", lieu_du_poste: "Versailles", teletravail: "Non" },
             { id: 6, poste: "Jardinier", typeContrat: "CDI", lieu_du_poste: "Dijon", teletravail: "Non" },
             { id: 7, poste: "Plombier", typeContrat: "CDD", lieu_du_poste: "Bordeau", teletravail: "Non" },
             { id: 8, poste: "Jongleur", typeContrat: "CDD", lieu_du_poste: "Toulouse", teletravail: "Non" },
             { id: 9, poste: "Paysagiste", typeContrat: "CDI", lieu_du_poste: "Lyon", teletravail: "Non" }
             ]);
         }, 5000); //! Ajoute ces nouvelles offres après 5 secondes (C'est juste une simulation, il faudra le retirer)
 
         return () => clearTimeout(timer);
     }, [offres]); */



    useEffect(() => {

        const fetchStatut = async () => {

            try {
                const token = localStorage.getItem('token');

                // console.log("Avant l'appel à fetch");
                const response = await fetch('http://localhost:3000/api/joboffers', {
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

                // Deuxième appel à /api/me
                const response2 = await fetch('http://localhost:3000/api/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response2.ok) {
                    throw new Error('Erreur lors de la récupération des données de /api/me');
                }

                const data2 = await response2.json();


                setOffres(data)
                setUserStatut(data2.statut)
            } catch (error) {
                console.error(error);
            }

        };
        fetchStatut; // Appelez la fonction pour récupérer les données lorsque le composant est monté

    }, []);

    const filteredOffres = offres.filter(offre =>
        (filtres.poste === "" || offre.poste.includes(filtres.poste)) &&
        (filtres.type_de_contrat === "" || offre.type_de_contrat.includes(filtres.type_de_contrat)) &&
        (filtres.lieu_du_poste === "" || offre.lieu_du_poste.includes(filtres.lieu_du_poste)) &&
        (filtres.politique_teletravail === "" || offre.politique_teletravail.includes(filtres.politique_teletravail))
    );


    return (
        <>
            {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
            {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
            {userStatut == 3 && (
                <>
                    <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Offres d'emplois</h1>
                    <hr className='border border-2 opacity-100' />

                    <div className="filter-container mb-4">
                        <div className="mb-5">
                            <form className="d-flex flex-row justify-content-between container">
                                <select className="form-select me-2" onChange={(e) => setFiltres({ ...filtres, poste: e.target.value })}>
                                    <option value="">Tout les Postes</option>
                                    {uniquePostes.map((poste, index) => (
                                        <option key={index} value={poste}>{poste}</option>
                                    ))}
                                </select>

                                <select className="form-select me-2" onChange={(e) => setFiltres({ ...filtres, type_de_contrat: e.target.value })}>
                                    <option value="">Tout les Contrats</option>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                </select>

                                <select className="form-select me-2" onChange={(e) => setFiltres({ ...filtres, lieu_du_poste: e.target.value })}>
                                    <option value="">Toutes les Villes</option>
                                    {uniqueLieuDuPoste.map((lieuDuPoste, index) => (
                                        <option key={index} value={lieuDuPoste}>{lieuDuPoste}</option>
                                    ))}
                                </select>

                                <select className="form-select me-2" onChange={(e) => setFiltres({ ...filtres, politique_teletravail: e.target.value })}>
                                    <option value="">Politique de télétravail</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    <div className="row m-3">
                        {filteredOffres.map((offre, index) => (
                            <div key={index} className={filteredOffres.length > 1 ? "col-md-4 mb-4" : "col mb-4"}>
                                <div className="card h-100 shadow-sm flex-grow-0">
                                    <div className="card-body flex-grow-1">
                                        <h5 className="card-title fw-bold">{offre.poste}</h5>
                                        <p className="card-text">Type de contrat : <span className="fw-bold">{offre.type_de_contrat}</span></p>
                                        <p className="card-text">Ville : <span className="fw-bold">{offre.lieu_du_poste}</span></p>
                                        <p className="card-text">Télétravail : <span className="fw-bold">{offre.politique_teletravail}</span></p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <button className="btn btn-primary fw-bold">Plus d'infos</button>
                                        <button className="btn btn-success fw-bold" onClick={() => window.location.href = `mailto:?subject=Intérêt pour le poste ${offre.poste}&body=Bonjour, je suis intéressé par le poste ${offre.poste}. Voici mon CV en pièce jointe.`}>
                                            Contacter par email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </>
    )
}

export default OffreCandidat;
