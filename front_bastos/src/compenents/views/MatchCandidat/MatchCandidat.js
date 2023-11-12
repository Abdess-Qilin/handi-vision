{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React from 'react';
import Emploi from '../Table/Emploi.js';
import users from '../Table/Users.js';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import FavoritListCandidat from './FavoriListCandidat.js';
import { apiUrl } from '../../config/config.js';





function calculateMatchPercentage(emploi, user) {
    const requiredSkills = emploi.Competence.split(',').map(skill => skill.trim());
    const userSkills = user.competence.split(',').map(skill => skill.trim());

    const requiredSkillsType = emploi.Type_de_competence.split(',').map(skill => skill.trim());
    const userSkillsType = user.type_de_competence.split(',').map(skill => skill.trim());

    const skillPoints = {
        competence: 5,
    };

    const typePoints = {
        type: 5,
    };

    let totalSkillPoints = 0;
    let totalTypePoints = 0;

    userSkills?.forEach(skill => {
        if (requiredSkills.includes(skill) && skillPoints.competence) {
            totalSkillPoints += skillPoints.competence;
        }
    });

    userSkillsType?.forEach(type => {
        if (requiredSkillsType.includes(type) && typePoints.type) {
            totalTypePoints += typePoints.type;
        }
    });

    // Calcule le nombre total de points possibles en fonction du nombre de compétences requises
    const maxSkillPoints = requiredSkills.length * skillPoints.competence;
    const maxTypePoints = requiredSkillsType.length * typePoints.type;

    // Calcule les ratios de pertinence
    const skillMatchPercentage = (totalSkillPoints / maxSkillPoints) * 100;
    const typeMatchPercentage = (totalTypePoints / maxTypePoints) * 100;

    // les pourcentages ne dépassent pas 100%
    const finalSkillMatchPercentage = Math.min(skillMatchPercentage, 100);
    const finalTypeMatchPercentage = Math.min(typeMatchPercentage, 100);

    return {
        skillMatchPercentage: finalSkillMatchPercentage,
        typeMatchPercentage: finalTypeMatchPercentage,
    };
}

const MatchCandidates = () => {

    const [recruteurOffres, setRecruteurOffres] = useState([]);
    const [candidatEmploiUsers, setCandidatEmploiUsers] = useState([]);

    useEffect(() => {

        const fetchOffres = async () => {

            try {
                const token = localStorage.getItem('token');
                let fetchOptions1 = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    // body: JSON.stringify({
                    //   id: req.user.id,
                    // }),
                };

                const response1 = await fetch(`${apiUrl}/api/recruteur/getjoboffer`, fetchOptions1);

                if (!response1.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const recruteurOffres = await response1.json();
                console.log("L.129 : ", recruteurOffres)
                setRecruteurOffres(recruteurOffres);
                // Récupérer la liste des utilisateurs dont le rôle vaut 2
                // const candidatEmploiUsers = users.filter(user => user.role === "candidat");
                let fetchOptions2 = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const response2 = await fetch(`${apiUrl}/api/recruteur/getcandidate`, fetchOptions2);

                if (!response2.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const candidatEmploiUsers = await response2.json();
                console.log("L.147 : ", candidatEmploiUsers)
                setCandidatEmploiUsers(candidatEmploiUsers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOffres();
    }, []);

    // try{

    // Copie les données des offres d'emploi et des candidats depuis les fichiers en api ce n'est peut-etre pas necessaire

    // Récupérer la liste des offres d'emploi VALIDEES du recruteur connecté

    //const recruteurOffres = [...Emploi];



    ////////////


    /////////////

    // Trier les offres
    const offresAvecCorrespondance = [];
    const offresSansCorrespondance = [];

    recruteurOffres.forEach(emploi => {
        const candidatsCorrespondants = candidatEmploiUsers
            .filter(user => {
                const matchPercentage = calculateMatchPercentage(emploi, user);
                return matchPercentage.skillMatchPercentage > 0 || matchPercentage.typeMatchPercentage > 0;
            })
            .sort((a, b) => {
                const matchPercentageA = calculateMatchPercentage(emploi, a);
                const matchPercentageB = calculateMatchPercentage(emploi, b);
                const totalMatchA = matchPercentageA.skillMatchPercentage + matchPercentageA.typeMatchPercentage;
                const totalMatchB = matchPercentageB.skillMatchPercentage + matchPercentageB.typeMatchPercentage;
                return totalMatchB - totalMatchA;
            });

        if (candidatsCorrespondants.length > 0) {
            offresAvecCorrespondance.push({
                emploi,
                correspondants: candidatsCorrespondants,
            });
        } else {
            offresSansCorrespondance.push(emploi);
        }
    });

    // useEffect(() => {

    //   const token = localStorage.getItem('token');

    //   const fetchOffres = async () => {
    //     let fetchOptions1 = {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //       },
    //       // body: JSON.stringify({
    //       //   id: req.user.id,
    //       // }),
    //     };

    //   const response1 = await fetch('http://localhost:3000/api/recruteur/getjoboffer', fetchOptions1);

    //   if (!response1.ok) {
    //     throw new Error('Erreur lors de la récupération des données');
    //   }

    //   const recruteurOffres = await response1.json();
    //   console.log("L.129 : ",recruteurOffres)
    //   setRecruteurOffres(recruteurOffres);
    // // Récupérer la liste des utilisateurs dont le rôle vaut 2
    // // const candidatEmploiUsers = users.filter(user => user.role === "candidat");
    //   let fetchOptions2 = {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`,
    //     },
    //   };
    //   const response2 = await fetch('http://localhost:3000/api/recruteur/getcandidate', fetchOptions2);

    //   if (!response2.ok) {
    //     throw new Error('Erreur lors de la récupération des données');
    // }

    // const candidatEmploiUsers = await response2.json();
    // console.log("L.147 : ",candidatEmploiUsers)
    // setCandidatEmploiUsers(candidatEmploiUsers);
    //   };

    //   fetchOffres();
    // }, []);


    const handleValiderCandidat = async (candidatId) => {
        try {
            // Effectue une requête HTTP pour valider l'entreprise
            const response = await fetch(`URL_DE_L_API_POUR_VALIDER/${candidatId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({/* données à envoyer */ }),
            });

            if (!response.ok) {
                throw Error('Erreur lors de la validation du candidat');
            }
            // L'entreprise a été validée avec succès
            // Mettre à jour l'état local si nécessaire
        } catch (error) {
            console.error(error);
        }
    };


    const [favorites, setFavorites] = useState([]); // Initialise la liste de favoris
    const [selectedUserIDs, setSelectedUserIDs] = useState([]);
    // Fonction pour ajouter ou supprimer un candidat aux favoris
    const toggleFavorite = (user) => {
        if (selectedUserIDs.includes(user.email)) {
            // Retirer le candidat de la liste des favoris
            setFavorites(favorites.filter((fav) => fav.email !== user.email));
            setSelectedUserIDs(selectedUserIDs.filter((email) => email !== user.email));
        } else {
            // Ajouter le candidat à la liste des favoris
            setFavorites([...favorites, user]);
            setSelectedUserIDs([...selectedUserIDs, user.email]);
        }
    };
    // code pour afficher les candidats et gérer les clics sur le cœur
    //const candidates = [/* liste de vos candidats */];

    return (
        <div className="row col-12 con-b mx-auto text-center">
            <h2 className="h2">Liste de Mes Offres</h2>
            {/* Passage de la liste des favoris au composant FavoritesList */}
            <FavoritListCandidat favorites={favorites} />
            <div className='con-c'>
                <h2 className="mb-3 ">Offres avec correspondance</h2>
                {offresAvecCorrespondance.map(entry => (
                    <div key={entry.emploi.id} className=''>
                        <h3>{entry.emploi.Poste}</h3>
                        <div className="card-group con-c">
                            {entry.correspondants.map((user) => {
                                const matchPercentage = calculateMatchPercentage(entry.emploi, user);
                                if (matchPercentage.skillMatchPercentage > 0 || matchPercentage.typeMatchPercentage > 0) {
                                    return (
                                        <div key={user.email} className="con-b  col-sm-12 col-md-6 col-lg-4 p-2 mx-auto">
                                            <div className="card-body p-2   con-c col-sm-12 col-md-12 col-lg-12 text-start  text-dark font-weight-bold ">
                                                <h5 className="card-title text-dark font-weight-bold  bg-primary col-12 p-1 m-1 rounded mt-2">{user.civilite} {user.nom} {user.prenom}</h5>
                                                <p className="card-text text-dark font-weight-bold  bg-primary  p-1 m-1 rounded mt-1">Taux de Correspondance pour: Compétence : {matchPercentage.skillMatchPercentage.toFixed(2)}%</p>
                                                <p className="card-text text-dark font-weight-bold  bg-primary  p-1 m-1 rounded mt-1">Taux de Correspondance pour: Type de Compétence : {matchPercentage.typeMatchPercentage.toFixed(2)}%</p>
                                                <p className="card-text text-dark font-weight-bold  bg-primary p-1 m-1 rounded mt-1">Rôle : {user.role}</p>
                                                <div className='  mx-auto p-2'>
                                                    <button className="btn mx-auto text-dark font-weight-bold  btn-info " type="submit" onClick={() => handleValiderCandidat(user.email)}>Conserver</button>
                                                    <span className="mx-auto "
                                                        onClick={() => toggleFavorite(user)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: favorites.some((fav) => fav.email === user.email) ? 'red' : 'gray',
                                                        }}
                                                    >
                                                        {favorites.some((fav) => fav.email === user.email) ? '💚' : '🤍'}
                                                    </span>
                                                    <Link to="/deleteRecruteur"><button className="btn mx-auto text-dark font-weight-bold  btn-danger " type="submit">Supprimer</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null; // Ne rien afficher pour une correspondance de 0%
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className='con-c mx-auto col-md-12 col-12'>
                <h2 className="mb-3  col-md-12 col-6">Offres sans correspondance</h2>
                <div className="card-body p-2   con-c col-sm-12 col-md-12 col-lg-12 text-start  text-dark font-weight-bold ">
                    {offresSansCorrespondance.map((emploi) => (
                        <div key={emploi.id} className='con-b mx-auto col-lg-4 col-md-4 col-6'>
                            <h3 className="card-title text-dark font-weight-bold  bg-primary col-12 p-1 m-1 rounded mt-2">{emploi.Poste}</h3>
                            <p className="card-text text-dark font-weight-bold  bg-primary col-12  p-1 m-1 rounded mt-1">Ville : {emploi.Ville}</p>
                            <p className="card-text text-dark font-weight-bold  bg-primary col-12 p-1 m-1 rounded mt-1">Salaire : {emploi.Salaire}</p>
                            <div className='d-flex justify-content-between m-2 p-2'>
                                <button className="btn mx-auto text-dark font-weight-bold  btn-info " type="submit" onClick={() => handleValiderCandidat(emploi.email)}>Conserver</button>
                                <Link to="/deleteRecruteur"><button className="btn mx-auto text-dark font-weight-bold  btn-danger " type="submit">Supprimer</button></Link>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
    //           }
    //  catch(e){
    //   console.error(e.message)
    //   return <p>{e.message}</p>
    //  } 
}

export default MatchCandidates;