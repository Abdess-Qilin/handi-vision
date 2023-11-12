// Fait par Vincent, GitHub : Vyn100 (https://github.com/Vyn100);
// Email : blaize.vincent@hotmail.com

// Import des dépendances nécessaires
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCirclePlus, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons';
import logo from "../../../../images/img/image.png";
import { addFavoriteOffer } from "../../../Table/FavorisTable"; // Import de la fonction pour ajouter une offre aux favoris
import OffresFav from "./OffresFav";
import { Link, useHistory } from 'react-router-dom';

// Définition du composant OffreCandidat
const OffreCandidat = ({ setSelectedOffers }) => {

    // Utilisation de l'état local pour gérer les filtres de recherche
    const [filtres, setFiltres] = useState({
        poste: "",
        type_de_contrat: "",
        lieu_du_poste: "",
        politique_teletravail: ""
    });

    // Permet de savoir si le compte est validé ou pas
    const [userStatut, setUserStatut] = useState(null);

    // État local pour stocker les offres favorites et les identifiants des offres sélectionnées
    const [favoris, setFavoris] = useState([]);
    const [selectedEmploiIDs, setSelectedEmploiIDs] = useState([]);


    // Fonction pour basculer une offre entre les favoris et les non-favoris
    const toggleFavorite = (Emploi) => {
        if (selectedEmploiIDs.includes(Emploi.id)) {

            // Si l'offre est déjà sélectionnée, la supprimer des favoris
            setFavorites(favorites.filter(fav => fav.id !== Emploi.id));

            // Supprimer l'identifiant de l'offre sélectionnée
            setSelectedEmploiIDs(selectedEmploiIDs.filter(id => id !== Emploi.id));
        } else {

            // Si l'offre n'est pas encore sélectionnée, l'ajouter aux favoris
            setFavorites([...favorites, Emploi]);

            // Ajouter l'identifiant de l'offre sélectionnée
            setSelectedEmploiIDs([...selectedEmploiIDs, Emploi.id]);
        }
    };


    // État local pour gérer la visibilité des offres
    const [isVisible, setIsVisible] = useState(true);

    // Fonction pour basculer la visibilité des offres
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // Fonction pour ajouter une offre aux favoris
    const addFavoriteOffer = async (e, offreId) => {

        // Empêche le comportement par défaut de l'événement (par exemple, le rechargement de la page)
        e.preventDefault();

        // Récupère le token et l'ID de l'utilisateur depuis le stockage local
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        // Affiche le token et l'ID de l'utilisateur dans la console (pour le débogage)
        console.log(token);
        console.log(userId);

        // Envoyer les données de l'offre favorite à votre API
        try {

            // Options de la requête fetch
            let fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    code_utilisateur: userId,
                    code_offre_demploi: offreId
                }),
            };

            const response = await fetch('http://localhost:3000/api/candidat/favjoboffer', fetchOptions);
            if (response.ok) {
                // La requête s'est terminée avec succès

                console.log("L'offre a été ajoutée avec succès.");
                // Rediriger l'utilisateur vers la page de succès ou effectuer d'autres actions nécessaires

                // Trouve l'offre correspondante dans la liste des offres
                const findOffre = offres.find(offre => offre.id == offreId)

                if (findOffre) {

                    // Ajoute l'offre aux favoris localement
                    setFavoris([...favoris, findOffre]);
                }
            } else {

                // Gérer les erreurs de requête ici, par exemple :
                console.error("Erreur lors de la validation :", response.statusText);
            }
        } catch (error) {
            console.log('Fetch error: ', error);
        }
    };


    // Fonction pour retirer une offre des favoris
    const removefavoffre = async (e, offreId) => {

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

            const response = await fetch('http://localhost:3000/api/candidat/removefavjoboffer', fetchOptions);
            if (response.ok) {
                // La requête s'est terminée avec succès

                console.log("L'offre a été retirée des favoris.");
                // Rediriger l'utilisateur vers la page de succès ou effectuer d'autres actions nécessaires

                // Crée une nouvelle liste de favoris en excluant l'offre retirée
                const newFavoris = favoris.filter(favori => favori.id != offreId)

                // Met à jour la liste des favoris localement
                setFavoris(newFavoris);
            } else {

                // Gérer les erreurs de requête ici, par exemple :
                console.error("Erreur lors de la suppression :", response.statusText);
            }
        } catch (error) {
            console.log('Fetch error: ', error);
        }
    };



    // État local pour gérer les offres sélectionnées
    const [selectedIds, setSelectedIds] = useState(new Set());

    // Fonction pour basculer la sélection d'une offre
    const toggleSelectOffer = (offre) => {

        // Crée une nouvelle copie de l'ensemble des identifiants sélectionnés
        const newSelectedIds = new Set(selectedIds);

        if (newSelectedIds.has(offre.id)) {

            // Si l'offre est déjà sélectionnée, la retire de la sélection
            newSelectedIds.delete(offre.id);

            // Met à jour la liste des offres sélectionnées en excluant celle retirée
            setSelectedOffers(prevSelectedOffers => prevSelectedOffers.filter(o => o.id !== offre.id));
        } else {

            // Si l'offre n'est pas encore sélectionnée, l'ajoute à la sélection
            newSelectedIds.add(offre.id);

            // Met à jour la liste des offres sélectionnées en ajoutant celle sélectionnée
            setSelectedOffers(prevSelectedOffers => [...prevSelectedOffers, offre]);
        }

        // Met à jour la liste des identifiants sélectionnés avec la nouvelle copie
        setSelectedIds(newSelectedIds);
    };

    // État local pour stocker les offres
    const [offres, setOffres] = useState([]);

    // Fonction asynchrone pour récupérer les offres depuis l'API
    const fetchOffres = async () => {
        try {

            // Récupère le token d'authentification depuis le stockage local
            const token = localStorage.getItem('token');

            // Envoie une requête GET pour récupérer les offres
            const response = await fetch('http://localhost:3000/api/joboffers', {
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

            // Affiche les données récupérées dans la console
            console.log("Après l'attente de la réponse JSON", data);

            // Deuxième appel à /api/me pour récupérer d'autres données si nécessaire
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

            // Met à jour l'état local 'offres' avec les données récupérées
            setOffres(data);

            /* setUserStatut(data2.statut) */ // Vous pouvez utiliser ces données si nécessaire
        } catch (error) {
            console.error(error);
        }
    };


    // Fonction asynchrone pour récupérer le statut depuis l'API
    const fetchStatut = async () => {
        try {

            // Récupère le token d'authentification depuis le stockage local
            const token = localStorage.getItem('token');

            // Envoie une requête GET pour récupérer les offres (est-ce une erreur ?)
            const response = await fetch('http://localhost:3000/api/joboffers', {
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

            // Affiche les données récupérées dans la console
            console.log("Après l'attente de la réponse JSON", data);

            // Deuxième appel à /api/me pour récupérer le statut
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

            // Met à jour l'état local 'offres' avec les données récupérées
            setOffres(data);

            // Met à jour l'état local 'userStatut' avec le statut récupéré
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



    // État local pour stocker les postes uniques et les lieux de poste uniques
    const [uniquePostes, setUniquePostes] = useState([]);
    const [uniqueLieuDuPoste, setUniqueLieuDuPoste] = useState([]);

    // Utilisation de useEffect pour extraire les postes et les lieux de poste uniques
    useEffect(() => {

        // Crée un nouvel ensemble de postes uniques en utilisant la méthode map sur les offres
        const newUniquePostes = [...new Set(offres.map(offre => offre.poste))];

        // Crée un nouvel ensemble de lieux de poste uniques en utilisant la méthode map sur les offres
        const newUniqueLieuDuPoste = [...new Set(offres.map(offre => offre.lieu_du_poste))];

        // Met à jour l'état local 'uniquePostes' avec les postes uniques
        setUniquePostes(newUniquePostes);

        // Met à jour l'état local 'uniqueLieuDuPoste' avec les lieux de poste uniques
        setUniqueLieuDuPoste(newUniqueLieuDuPoste);
    }, [offres]);


    // Filtrage des offres en fonction des filtres de recherche
    const filteredOffres = offres.filter(offre =>

        // Vérifie si le filtre "Poste" est vide ou si l'offre contient la valeur du filtre "Poste"
        (filtres.poste === "" || offre.poste.includes(filtres.poste)) &&

        // Vérifie si le filtre "Type_de_contrat" est vide ou si l'offre contient la valeur du filtre "Type_de_contrat"
        (filtres.type_de_contrat === "" || offre.type_de_contrat.includes(filtres.type_de_contrat)) &&

        // Vérifie si le filtre "Ville" est vide ou si l'offre contient la valeur du filtre "Ville"
        (filtres.lieu_du_poste === "" || offre.lieu_du_poste.includes(filtres.lieu_du_poste)) &&

        // Vérifie si le filtre "Politique_teletravail" est vide ou si l'offre contient la valeur du filtre "Politique_teletravail"
        (filtres.politique_teletravail === "" || offre.politique_teletravail.includes(filtres.politique_teletravail))
    );

    // Fonction pour vérifier si une offre est sélectionnée parmi les favoris
    function isOfferSelected(offreId) {
        let i = 0;
        while (i < favoris.length) {

            // Parcourt la liste des offres favorites
            if (favoris[i].id == offreId) {

                // Si l'offre avec l'identifiant correspondant est trouvée, retourne vrai
                return true;
            }
            i++;
        }

        // Si l'offre n'est pas trouvée parmi les favoris, retourne faux
        return false;
    }
    console.log("ok favoris")


    return (
        <>
            {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
            {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
            {userStatut == 3 && (

                <>
                    <div className="con-a col-10">
                        <p align="center">
                            <img
                                src={logo}
                                alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
                                width="80"
                            />
                        </p>
                        <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Offres d'emplois</h1>
                        <hr className='border border-2 opacity-100' />

                        {/* Composant OffresFav pour afficher les offres favorites */}
                        <OffresFav favoris={favoris} setFavoris={setFavoris} />

                        <div className="filter-container mb-4">
                            <div className="mb-5">
                                {/* Formulaire de filtrage des offres */}
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

                                    {/* <select className="form-select me-2" onChange={(e) => setFiltres({ ...filtres, politique_teletravail: e.target.value })}>
                                        <option value="">Politique de télétravail</option>
                                        <option value="Oui">Oui</option>
                                        <option value="Non">Non</option>
                                    </select> */}
                                </form>
                            </div>
                        </div>

                        <div className="row col-12 m-1 p-4">
                            {/* Affichage des offres filtrées */}
                            {filteredOffres.map((offre, index) => (
                                <div key={index} className={filteredOffres.length > 1 ? "row col-md-4 col-12 m-2 mx-auto" : "mb-4"}>
                                    <div className="card col-12 h-100 shadow-sm flex-grow-0">
                                        <div className="card-body flex-grow-1">
                                            <h5 className="card-title fw-bold" >{offre.poste}</h5>
                                            <p className="card-text">Type de contrat : <span className="fw-bold">{offre.type_de_contrat}</span></p>
                                            <p className="card-text">Ville : <span className="fw-bold">{offre.lieu_du_poste}</span></p>
                                            <p className="card-text">Télétravail : <span className="fw-bold">{offre.politique_teletravail}</span></p>
                                        </div>
                                        <div className="card-footer row col-12 mx-auto">
                                            <Link to={`/details-offre/${offre.id}`} className="btn btn-primary fw-bold mx-auto">Plus d'infos</Link>
                                            {/* Bouton pour ajouter ou retirer une offre des favoris */}
                                            <button className="btn mx-auto "
                                                onClick={(e) => {
                                                    /* toggleSelectOffer(offre); */
                                                    isOfferSelected(offre.id) ? removefavoffre(e, offre.id) : addFavoriteOffer(e, offre.id);
                                                    /* toggleFavorite(offre); */
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={isOfferSelected(offre.id) ? faHeartCircleMinus : faHeartCirclePlus}
                                                    style={{ color: isOfferSelected(offre.id) ? "#0ccb20" : "#000000" }}
                                                />

                                            </button>
                                            {/* Bouton pour envoyer un e-mail de candidature */}
                                            <button className="btn btn-success fw-bold mx-auto" onClick={() => {
                                                window.location.href = `mailto:${offre.email_candidature}?subject=Intérêt pour le poste ${offre.poste}&body=Bonjour, je suis intéressé par le poste ${offre.Poste}. Voici mon CV en pièce jointe.`
                                            }}>
                                                Postuler ✉
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default OffreCandidat;