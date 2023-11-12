import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { apiUrl } from '../../../../config/config';

function DetailsOffre() {

    // Récupérez l'ID de l'offre à partir des paramètres de l'URL
    const { offreId } = useParams();

    // Convertit l'ID de l'offre en un nombre entier pour assurer la cohérence des types de données
    parseInt(offreId, 10)

    // Affiche le type de l'ID de l'offre dans la console pour le débogage
    console.log(typeof (offreId))

    // Initialise l'état "offre" à null
    const [offre, setOffre] = useState(null);

    // Fonction asynchrone pour récupérer les détails de l'offre
    const fetchOffre = async () => {
        try {
            // Récupère le token d'authentification depuis le stockage local
            const token = localStorage.getItem('token');

            // Envoie une requête GET pour récupérer les détails de l'offre
            const response = await fetch(`${apiUrl}/api/detailsjoboffer/${offreId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Vérifie si la réponse de la requête est réussie
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            // Attend la réponse JSON de la requête
            const data = await response.json();
            // Met à jour l'état "offre" avec les données reçues
            setOffre(data)

            // Affiche les données récupérées dans la console pour le débogage
            console.log("Après l'attente de la réponse JSON", data);

        } catch (error) {
            // Affiche l'erreur dans la console en cas d'échec de la requête
            console.error(error);
        }
    };

    // Utilisez useEffect pour exécuter le code une fois après le premier rendu du composant
    useEffect(() => {
        // Appelle la fonction fetchOffre à l'intérieur de useEffect
        fetchOffre()
        // Le tableau de dépendances vide indique que useEffect ne s'exécutera qu'une seule fois,
        // juste après le premier rendu du composant, et ne se réexécutera pas,
        // car il ne dépend d'aucune variable ou état.
    }, []);


    // Maintenant, vous pouvez utiliser la variable 'offre' pour afficher les détails de l'offre
    return (
        <div className="container mt-5" role="main">
            <div className="card shadow w-75">
                <div className="card-header text-center py-3">
                    <h2 className="mb-0">Détails de l'offre</h2>
                </div>
                {offre ? (
                    <div className="card-body">
                        <h3 className="card-title text-primary">{offre.poste}</h3>
                        <p className="card-text"><strong>Type de contrat :</strong> {offre.type_de_contrat}</p>
                        <p className="card-text"><strong>Ville :</strong> {offre.lieu_du_poste}</p>
                        <p className="card-text"><strong>Salaire :</strong> {offre.salaire}</p>
                        <p className="card-text"><strong>Télétravail :</strong> {offre.politique_teletravail}</p>
                        <p className="card-text"><strong>Description :</strong> {offre.description}</p>
                        <div className="d-flex justify-content-between">
                            <Link to="/DashboardCandidat" className="btn btn-danger btn-lg" aria-label="Retour au tableau de bord candidat">Retour en arrière</Link>
                            <button className="btn btn-success btn-lg" onClick={() => {
                                window.location.href = `mailto:${offre.email_candidature}?subject=Intérêt pour le poste ${offre.poste}&body=Bonjour, je suis intéressé par le poste ${offre.poste}. Voici mon CV en pièce jointe.`
                            }}
                                aria-label={`Postuler pour le poste de ${offre.poste}`}>
                                Postuler ✉
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="card-body">
                        <p className="text-center">Chargement...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailsOffre;
