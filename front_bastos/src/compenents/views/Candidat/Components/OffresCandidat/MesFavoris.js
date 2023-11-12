// Import des dépendances et des ressources nécessaires
import { favoritedOffersList, removeFromFavorites } from '../../../Table/FavorisTable'; // Import des fonctions de gestion des favoris
import logo from "../../../../images/img/image.png"; // Import de l'image du logo
import { useState, useEffect } from 'react'; // Import de useState et useEffect depuis React
import { Link, useHistory } from 'react-router-dom';
import { apiUrl } from '../../../../config/config';

// Définition du composant MesFavoris
const MesFavoris = () => {

    // Utilisation de l'état local pour suivre les favoris
    const [favorites, setFavorites] = useState([]);
    const [userStatut, setUserStatut] = useState(null)

    // Fonction pour gérer le retrait d'une offre des favoris
    const handleRemoveFromFavorites = async (e, offreId) => {

        // Empêche le comportement par défaut de l'événement (par exemple, le rechargement de la page)
        e.preventDefault();

        // Récupère le token et l'ID de l'utilisateur depuis le stockage local
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        // Affiche le token et l'ID de l'utilisateur dans la console (pour le débogage)
        console.log(token);
        console.log(userId);

        // Envoyer les données de suppression de l'offre favorite à votre API
        try {

            // Options de la requête fetch pour la suppression
            let fetchOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    offreId: offreId
                }),
            };

            const response = await fetch(`${apiUrl}/api/candidat/removefavjoboffer`, fetchOptions);
            if (response.ok) {
                // La requête s'est terminée avec succès

                console.log("L'offre a été retirée des favoris.");
                // Rediriger l'utilisateur vers la page de succès ou effectuer d'autres actions nécessaires

                // Crée une nouvelle liste de favoris en excluant l'offre retirée
                const newFavoris = favorites.filter(favori => favori.id != offreId)

                // Met à jour la liste des favoris localement
                setFavorites(newFavoris);
            } else {
                // Gérer les erreurs de requête ici, par exemple :
                console.error("Erreur lors de la suppression :", response.statusText);
            }
        } catch (error) {
            console.log('Fetch error: ', error);
        }
    };

    //recuperation des offres favorites
    const fetchOffres = async () => {

        try {

            // Récupération du token stocké localement, qui est nécessaire pour l'authentification.
            const token = localStorage.getItem('token');

            // console.log("Avant l'appel à fetch");
            // Lancement de la requête fetch pour obtenir les offres favorites.
            const response = await fetch(`${apiUrl}/api/candidat/getfavjoboffer`, {
                method: 'GET', // Méthode HTTP utilisée pour la requête.
                headers: {
                    // Ajout du token dans les en-têtes pour l'authentification.
                    'Authorization': `Bearer ${token}`,
                },
            });

            // console.log("Après l'appel à fetch");
            // Vérification de la réponse. Si le status n'est pas OK, déclenche une erreur.
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            // Si la réponse est OK, convertit la réponse en JSON.
            const data = await response.json();
            console.log("Après l'attente de la réponse JSON", data);

            // Mise à jour de l'état local avec les données reçues.
            setFavorites(data)


        } catch (error) {
            // Gestion des erreurs, par exemple une erreur réseau ou une réponse non-OK.
            console.error(error);
        }

    };

    // Fonction asynchrone pour récupérer le statut depuis l'API
    const fetchStatut = async () => {
        try {

            // Récupère le token d'authentification depuis le stockage local
            const token = localStorage.getItem('token');

            // Envoie une requête GET à l'API pour récupérer les données de l'utilisateur
            const response2 = await fetch(`${apiUrl}/api/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Vérifie si la réponse de la requête est réussie
            if (!response2.ok) {
                throw new Error('Erreur lors de la récupération des données de /api/me');
            }

            // Attend la réponse JSON de la requête
            const data2 = await response2.json();

            // Met à jour l'état local 'userStatut' avec le statut récupéré depuis les données
            setUserStatut(data2.statut);
        } catch (error) {
            console.error(error);
        }
    };

    // Utilisation de useEffect pour effectuer des opérations après le rendu du composant
    useEffect(() => {

        // Appelle la fonction fetchOffres pour récupérer les offres depuis l'API
        fetchOffres();

        // Appelle la fonction fetchStatut pour récupérer le statut depuis l'API
        fetchStatut();
    }, []);

    return (
        <>

            {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
            {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
            {userStatut == 3 && (

                <>
                    <div>
                        <div className="con-a col-10">
                            <p align="center">
                                <img
                                    src={logo}
                                    alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
                                    width="80"
                                />
                            </p>
                            <h1 className='h1 fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Mes favoris</h1>

                            <div className="con-d row m-3">
                                {favorites.length === 0 ? (
                                    <p className='h1 fw-bold d-flex justify-content-center align-items-center'>Aucune offre favorite pour le moment.</p>
                                ) : (
                                    favorites.map((offre, index) => (
                                        <div key={index} className="row col-md-4 col-12 m-2 mx-auto">
                                            <div className="card col-12 h-100 shadow-sm flex-grow-0">
                                                <div className="card-body flex-grow-1">
                                                    <h5 className="card-title fw-bold">{offre.poste}</h5>
                                                    <p className="card-text">Type de contrat : <span className="fw-bold">{offre.type_de_contrat}</span></p>
                                                    <p className="card-text">Ville : <span className="fw-bold">{offre.ville}</span></p>
                                                    <p className="card-text">Télétravail : <span className="fw-bold">{offre.politique_teletravail}</span></p>
                                                </div>
                                                <div className="card-footer row col-12 mx-auto">
                                                    <Link to={`/details-offre/${offre.id}`} className="btn btn-primary fw-bold mx-auto mb-2">Plus d'infos</Link>
                                                    <button
                                                        className="btn btn-danger fw-bold mx-auto mb-2"
                                                        onClick={(e) => handleRemoveFromFavorites(e, offre.id)}
                                                    >
                                                        Retirer des favoris
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>

    );
};

export default MesFavoris;
