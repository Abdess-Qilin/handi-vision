// Import des dépendances nécessaires
import { faV } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../../config/config';

// Définition du composant OffresFav
function OffresFav({ favoris, setFavoris }) {
    // Utilisation de l'état local pour gérer la visibilité des offres favorites
    const [isVisible, setIsVisible] = useState(true);


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
            setFavoris(data)


        } catch (error) {
            // Gestion des erreurs, par exemple une erreur réseau ou une réponse non-OK.
            console.error(error);
        }

    };

    useEffect(() => {
        fetchOffres()
    }, [])






    // Fonction pour basculer la visibilité des offres favorites
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // Compter le nombre de favoris
    const favoriteCount = favoris.length;

    return (
        <div className='border border-info rounded p-2 row col-12 col-sm-12 mx-auto'>
            <h3>
                Mes Favoris ({favoriteCount}) {/* Afficher le nombre de favoris */}
                <button
                    className="btn btn-primary ml-2"
                    onClick={toggleVisibility}
                >
                    {isVisible ? 'Réduire' : 'Voir mes Offres Favorites'} {/* Modifier le libellé du bouton en fonction de la visibilité */}
                </button>
            </h3>
            {isVisible && (
                <div className="row">
                    {favoris.map((favoris) => (
                        <div className="col-sm-12 col-md-6 col-lg-4 mx-auto" key={favoris && favoris.email}>
                            <div className="card-body border-5 bg-gradient row col-sm-12 col-md-12 col-12 con-c text-start">
                                <h5 className="card-title text-dark font-weight-bold bg-info rounded p-1 m-1">Poste :
                                    {favoris && favoris.poste}
                                </h5>
                                <p className="card-text text-dark font-weight-bold bg-info rounded p-1 m-1">Ville :
                                    {favoris && favoris.lieu_du_poste}
                                </p>
                                <p className="card-text text-dark font-weight-bold bg-info rounded p-1 m-1">Type de Contrat :
                                    {favoris && favoris.type_de_contrat}
                                </p>
                                <p className="card-text text-dark font-weight-bold bg-info rounded p-1 m-1">Politique de Télétravail :
                                    {favoris && favoris.politique_teletravail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OffresFav;
