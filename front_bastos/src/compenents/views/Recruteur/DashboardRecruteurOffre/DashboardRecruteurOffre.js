{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */ }

import React, { useState, useEffect } from 'react';
import logo from "../../../images/img/image.png";

// Importez les nouveaux composants
// import SupprimerOffre from '../asauvegarde/SupprimerOffre/SupprimerOffre.js';
import ModifierOffre from './ModifierOffre/ModifierOffre.js';
import CreerOffre from './CreerOffre/CreerOffre.js';
import MatchCandidates from '../../MatchCandidat/MatchCandidat.js';
// import ListOffre from '../asauvegarde/ListOffre/ListOffre.js';


const DashboardRecruteurOffre = (/*{ societes }*/) => {
    // Utilisez un état pour suivre quelle action doit être affichée
    const [action, setAction] = useState(''); // Initialiser avec 'creer', 'modifier' ou 'supprimer' pour l'instant reste vide.
    const [userStatut, setUserStatut] = useState(null)

    useEffect(() => {

        const fetchOffres = async () => {

            try {
                const token = localStorage.getItem('token');

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

                setUserStatut(data2.statut)
            } catch (error) {
                console.error(error);
            }

        };
        fetchOffres(); // Appelez la fonction pour récupérer les données lorsque le composant est monté

    }, []);


    // Fonction pour changer l'action en fonction du bouton cliqué
    const handleActionChange = (nouvelleAction) => {
        setAction(nouvelleAction);
    };

    // Affichez le composant en fonction de l'action
    let composantAffiche;
    if (action === 'list') {
        composantAffiche = <MatchCandidates    /*userStatut={userStatut}*/ />
    }
    else if (action === 'creer') {
        composantAffiche = <CreerOffre /*societes={societes}*/ userStatut={userStatut} />;
    } else if (action === 'modifier') {
        composantAffiche = <ModifierOffre userStatut={userStatut} />;
    }

    return (
        <>
            {/* Boutons pour changer l'action */}
            <div className="container">
                <div className="row col-12">
                    <div className="col-md-4">
                        <button className="btn btn-info col-12 m-2 " type="button" aria-expanded="false" onClick={() => handleActionChange('list')}>
                            Match de mes Offres
                        </button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-info col-12 m-2 " type="button" aria-expanded="false" onClick={() => handleActionChange('creer')}>
                            Créer une Offre
                        </button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-success col-12 m-2 " type="button" aria-expanded="false" onClick={() => handleActionChange('modifier')}>
                            Modifier une Offre
                        </button>
                    </div>
                </div>
            </div>
            <div className="conexion">
                <div className="col-md-9 ibox-content column con-b">
                    <p align="center">
                        <img
                            src={logo}
                            alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
                            width="80"
                        />
                    </p>

                    {/* Affichez le composant en fonction de l'action */}
                    {composantAffiche}
                </div>
            </div>
        </>
    );
}

export default DashboardRecruteurOffre;

