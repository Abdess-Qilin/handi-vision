{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from "../../images/img/image.png";
import Emploi from '../Table/Emploi.js'; // Ok
import users from '../Table/Users.js'; // Ok
import FavoritListOffre from "./FavoritListOffre.js"; // Ok
import { apiUrl } from "../../config/config.js";



function calculateMatchPercentage(emploi, user) {

    // Convertit les compétences requises pour l'emploi en un tableau de chaînes nettoyées
    const requiredSkills = emploi.Competence.split(',').map(skill => skill.trim());

    // Convertit les compétences de l'utilisateur en un tableau de chaînes nettoyées
    const userSkills = user && user.competence.split(',').map(skill => skill.trim());

    // Convertit les types de compétences requis pour l'emploi en un tableau de chaînes nettoyées
    const requiredSkillTypes = emploi.Type_de_competence.split(',').map(skill => skill.trim());

    // Convertit les types de compétences de l'utilisateur en un tableau de chaînes nettoyées
    const userSkillTypes = user && user.type_de_competence.split(',').map(skill => skill.trim());

    // Définit les poids pour la correspondance des compétences et des types de compétences
    const skillMatchWeight = 5;
    const skillTypeMatchWeight = 3;

    // Initialise les totaux pour les correspondances de compétences et de types de compétences
    let totalSkillMatch = 0;
    let totalSkillTypeMatch = 0;

    // Parcourt les compétences de l'utilisateur et les compare aux compétences requises
    if (userSkills) {

        // Boucle sur chaque compétence de l'utilisateur
        userSkills.forEach(skill => {

            // Vérifie si la compétence de l'utilisateur est incluse dans les compétences requises
            if (requiredSkills.includes(skill)) {

                // Si oui, augmente le total des correspondances de compétences en ajoutant le poids défini
                totalSkillMatch += skillMatchWeight;
            }
        });
    }

    // Parcourt les types de compétences de l'utilisateur et les compare aux types de compétences requis
    if (userSkillTypes) {
        userSkillTypes.forEach(type => {

            // Vérifie si le type de compétence de l'utilisateur est inclus dans les types de compétences requis
            if (requiredSkillTypes.includes(type)) {

                // Si oui, ajoute un poids de correspondance de type de compétence au total
                totalSkillTypeMatch += skillTypeMatchWeight;
            }
        });
    }


    // Calcule les scores maximums possibles pour les correspondances
    const maxSkillMatch = requiredSkills.length * skillMatchWeight;
    const maxSkillTypeMatch = requiredSkillTypes.length * skillTypeMatchWeight;

    // Calcule les pourcentages de correspondance des compétences et des types de compétences
    const skillMatchPercentage = (totalSkillMatch / maxSkillMatch) * 100;
    const skillTypeMatchPercentage = (totalSkillTypeMatch / maxSkillTypeMatch) * 100;

    // Retourne les pourcentages de correspondance
    return {
        skillMatchPercentage,
        skillTypeMatchPercentage,
    };
}






// Définition de la fonction MatchOffres
function MatchOffres() {

    // Déclaration de l'état pour stocker la liste des compétences disponibles
    const [listCompetences, setListCompetences] = useState(null)

    // Déclaration de l'état pour stocker les compétences de l'utilisateur
    const [userCompetences, setUserCompetences] = useState(null)


    // Fonction asynchrone pour récupérer les compétences liées aux offres d'emploi
    async function fecthOffreCompetences() {
        try {

            // Récupération du token stocké dans le localStorage
            const token = localStorage.getItem('token');

            // Requête fetch pour obtenir les compétences des offres d'emploi
            const response = await fetch(`${apiUrl}/api/getJobbCompetences`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Vérification si la réponse est correcte
            if (response.ok) {

                // Conversion de la réponse en JSON et mise à jour de l'état
                const data = await response.json();
                console.log(data)
                setListCompetences(data);

            } else {

                // Gestion des erreurs de réponse
                throw new Error('Erreur lors de la récupération des données de /api/getJobbCompetences')
            }
        } catch (error) {

            // Gestion des erreurs de fetch
            console.log('Fetch error: ', error);
        }
    }

    // Fonction asynchrone pour récupérer les compétences de l'utilisateur
    async function fecthUserCompetences() {
        try {

            // Récupération du token stocké dans le localStorage
            const token = localStorage.getItem('token');

            // Requête fetch pour obtenir les compétences de l'utilisateur
            const response = await fetch(`${apiUrl}/api/getCompetences/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Vérification si la réponse est correcte
            if (response.ok) {

                // Conversion de la réponse en JSON et mise à jour de l'état
                const data = await response.json();
                console.log(data)

                // Extraction des noms de compétences
                const userCompetences = data.Competences.map(competence => competence.nom);

                // Mise à jour de l'état avec le tableau de noms de compétences
                setUserCompetences(userCompetences);


            } else {

                // Gestion des erreurs de réponse
                throw new Error('Erreur lors de la récupération des données de /api/getJobbCompetences')
            }
        } catch (error) {

            // Gestion des erreurs de fetch
            console.log('Fetch error: ', error);
        }
    }

    // Permet de savoir si le compte est validé ou pas
    const [userStatut, setUserStatut] = useState(null);


    // Fonction asynchrone pour récupérer le statut depuis l'API
    const fetchStatut = async () => {
        try {

            // Récupère le token d'authentification depuis le stockage local
            const token = localStorage.getItem('token');

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



            // Met à jour l'état local 'userStatut' avec le statut récupéré
            setUserStatut(data2.statut);
        } catch (error) {
            console.error(error);
        }
    };



    // Utilisation de useEffect pour appeler les fonctions de récupération des données lors du montage du composant
    useEffect(() => {
        fecthOffreCompetences();
        fecthUserCompetences();
        fetchStatut();


    }, []); // Le tableau vide indique que cet effet ne dépend d'aucune valeur et ne s'exécutera qu'une fois

    console.log("voici le statut: " + userStatut)


    // Copie des offres d'emploi dans un nouvel array pour éviter la mutation directe
    const recruteurOffres = [...Emploi];

    // État local pour stocker l'email du candidat connecté
    const [candidatEmail, setCandidatEmail] = useState('');

    // État pour stocker les informations du candidat connecté
    const [candidatConnecte, setCandidatConnecte] = useState(null);




    // Utilisation de useEffect pour effectuer une opération après le rendu du composant
    useEffect(() => {

        // Sélection d'un candidat aléatoire parmi ceux ayant le rôle "candidat"
        const candidats = users.filter(user => user.role === 'candidat');

        // Génère un index aléatoire pour sélectionner un candidat parmi la liste
        const randomIndex = Math.floor(Math.random() * candidats.length);

        // Sélectionne le candidat aléatoire
        const candidatAleatoire = candidats[randomIndex];

        // Mise à jour des états avec les informations du candidat sélectionné
        setCandidatEmail(candidatAleatoire.email);
        setCandidatConnecte(candidatAleatoire);
    }, []);


    // const candidatConnecte = users.find(user => user.email === candidatEmail);

    // Arrays pour stocker les offres avec et sans correspondance de compétences
    const offresAvecCorrespondance = [];
    const offresSansCorrespondance = [];

    // Traitement de chaque offre d'emploi pour déterminer la correspondance
    recruteurOffres.forEach(Emploi => {

        // Récupération des compétences et types de compétences du candidat connecté (le cas échéant)
        const correspondances = candidatConnecte ? candidatConnecte.competence.split(',') : [];
        const correspondancesType = candidatConnecte ? candidatConnecte.type_de_competence.split(',') : [];

        // Calcul du pourcentage de correspondance entre l'offre et les compétences du candidat
        const matchPercentage = calculateMatchPercentage(Emploi, candidatConnecte);

        // Classification de l'offre en fonction du pourcentage de correspondance
        if (matchPercentage.skillMatchPercentage > 0 || matchPercentage.skillTypeMatchPercentage > 0) {

            // Si la correspondance existe, ajoutez l'offre à la liste des offres avec correspondance
            offresAvecCorrespondance.push({
                Emploi,
                matchPercentage,
            });
        } else {

            // Sinon, ajoutez l'offre à la liste des offres sans correspondance
            offresSansCorrespondance.push(Emploi);
        }
    });


    // État local pour stocker les offres favorites
    const [favorites, setFavorites] = useState([]);
    const [selectedEmploiIDs, setSelectedEmploiIDs] = useState([]);

    // Fonction pour gérer l'ajout ou le retrait des offres favorites
    const toggleFavorite = (Emploi) => {
        if (selectedEmploiIDs.includes(Emploi.id)) {

            // Supprime l'offre des favoris si elle est déjà sélectionnée
            setFavorites(favorites.filter(fav => fav.id !== Emploi.id));
            setSelectedEmploiIDs(selectedEmploiIDs.filter(id => id !== Emploi.id));
        } else {

            // Ajoute l'offre aux favoris si elle n'est pas déjà sélectionnée
            setFavorites([...favorites, Emploi]);
            setSelectedEmploiIDs([...selectedEmploiIDs, Emploi.id]);
        }
    };

    // Fonction asynchrone pour valider une offre d'emploi
    const handleValiderOffre = async (EmploiId) => {
        try {

            // Envoie une requête POST pour valider l'offre d'emploi
            const response = await fetch(`URL_DE_L_API_POUR_VALIDER/${EmploiId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({/* données à envoyer */ }),
            });

            if (!response.ok) {

                // Gestion des erreurs de la requête
                throw Error('Erreur lors de la validation de l\'offre');
            }

            // Traitement à effectuer après la validation réussie de l'offre
        } catch (error) {

            // Gestion des erreurs
            console.error(error);
        }
    };


    // Fonction pour basculer la visibilité d'un élément
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>

            {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
            {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
            {userStatut == 3 && (

                <>
                    <div className="con-a col-9">
                        <p align="center">
                            <img
                                src={logo}
                                alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
                                width="80"
                            />
                        </p>
                        <div className="row col-12 con-b mx-auto text-center">
                            <h2 className="h2">Liste de Mes Annonces</h2>

                            {/* Afficher les informations du candidat */}
                            {/*  {candidatConnecte && (
                        <div className="bg-dark rounded text-start p-3" style={{ position: 'fixed', top: '0', right: '0', width: '300px', zIndex: 10 }}>
                            <button
                                className="btn btn-primary ml-2"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? 'Reduire' : 'Voir mon Profil'}
                            </button>
                            {isVisible && (
                                <div className="bg-dark rounded text-start p-1">

                                    <h5 className="bg-info text-black font-bold p-2 m-1 rounded text-center">Profil du Candidat</h5>
                                    <p className="bg-info text-black font-bold p-2 m-1 rounded">Nom: {candidatConnecte.nom}</p>
                                    <p className="bg-info text-black font-bold p-2 m-1 rounded">Prénom: {candidatConnecte.prenom}</p>
                                    <p className="bg-info text-black font-bold p-2 m-1 rounded">Poste Recherché: {candidatConnecte.poste_recherche}</p>
                                    <p className="bg-info text-black font-bold p-2 m-1 rounded">Email: {candidatConnecte.email}</p>

                                </div>
                            )}
                        </div>
                    )} */}
                            <FavoritListOffre favorites={favorites} />
                            <div className='con-c'>
                                <h2 className="mb-3 ">Offres avec correspondance</h2>
                                {offresAvecCorrespondance.map(entry => (
                                    <div key={entry.Emploi.id} className=''>
                                        <h3>{entry.Emploi.Poste}</h3>
                                        <div className="card-group con-c">
                                            <div key={entry.Emploi.id} className="con-b col-sm-12 col-md-6 col-lg-4 p-2 mx-auto">
                                                <div className="card-body p-2 con-c col-sm-12 col-md-12 col-lg-12 text-start text-dark font-weight-bold">
                                                    <h5 className="card-title text-dark font-weight-bold bg-primary col-12 p-1 m-1 rounded mt-2">{entry.Emploi.Poste}</h5>
                                                    <p className="card-text text-dark font-weight-bold bg-primary p-1 m-1 rounded mt-1">Ville : {entry.Emploi.Ville}</p>
                                                    <p className="card-text text-dark font-weight-bold bg-primary p-1 m-1 rounded mt-1">Salaire : {entry.Emploi.Salaire}</p>
                                                    <p className="card-text text-dark font-weight-bold bg-primary p-1 m-1 rounded mt-1">Taux de Correspondance pour Compétence : {entry.matchPercentage.skillMatchPercentage.toFixed(2)}%</p>
                                                    <p className="card-text text-dark font-weight-bold bg-primary p-1 m-1 rounded mt-1">Taux de Correspondance pour Type de Compétence : {entry.matchPercentage.skillTypeMatchPercentage.toFixed(2)}%</p>

                                                    <div className='mx-auto p-2'>
                                                        <button className="btn mx-auto text-dark font-weight-bold btn-info" type="submit" onClick={() => handleValiderOffre(entry.Emploi.id)}>Conserver</button>
                                                        <span className="mx-auto" onClick={() => toggleFavorite(entry.Emploi)} style={{
                                                            cursor: 'pointer',
                                                            color: selectedEmploiIDs.includes(entry.Emploi.id) ? 'red' : 'gray',
                                                        }}>
                                                            {selectedEmploiIDs.includes(entry.Emploi.id) ? '💚' : '🤍'}
                                                        </span>
                                                        <Link to="/deleteRecruteur"><button className="btn mx-auto text-dark font-weight-bold btn-danger" type="submit">Supprimer</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='con-b mx-auto col-md-12 col-12'>
                                <h2 className="mb-3 con-c col-md-12 col-6">Offres sans correspondance</h2>
                                <div className='con-c row '>
                                    {offresSansCorrespondance.map(emploi => (
                                        <div key={emploi.id} className='con-b mx-auto col-lg-4 col-md-4 col-6'>
                                            <h3>{emploi.Poste}</h3>
                                            <p className="card-text text-dark font-weight-bold bg-primary p-1 m-1 rounded mt-1">Ville : {Emploi.Ville}</p>
                                            <p className="card-text text-dark font-weight-bold bg-primary p-1 m-1 rounded mt-1">Salaire : {Emploi.Salaire}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}



        </>
    );
}

export default MatchOffres;