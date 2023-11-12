import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import logo from "../../images/img/image.png";

function FormCompetenceCandidat() {
    // Importation des hooks nécessaires depuis une bibliothèque
    const { control, handleSubmit } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'competences',
    });

    // Initialisation de l'état local pour les données du candidat
    const [nouveauCandidat, setNouveauCandidat] = useState({
        competences: [{ competence: '', typeDeCompetence: '' }],
    });

    // Extraction des compétences du formulaire dans un tableau
    const competences = fields.map((item, index) => item);

    // Fonction pour gérer le changement de valeur dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Met à jour l'état local avec la nouvelle valeur
        setNouveauCandidat({ ...nouveauCandidat, [name]: value });
    };

    // Fonction pour ajouter une nouvelle compétence au formulaire
    const ajouterCompetence = () => {
        // Utilise le hook 'append' pour ajouter une nouvelle compétence avec des valeurs par défaut
        append({ competence: '', typeDeCompetence: '' });
    };

    // Fonction pour supprimer une compétence du formulaire
    const supprimerCompetence = (index) => {
        // Utilise le hook 'remove' pour supprimer la compétence à l'index donné
        remove(index);
    };

    // Fonction de soumission du formulaire
    const onFormSubmit = (data) => {
        console.log(data);
        // Vous pouvez envoyer les données du candidat à l'API ici
    };

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

    useEffect(() => {
        fetchStatut();
    }, [])



    return (

        <>
            {userStatut === 1 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>En attente de validation</h1>}
            {userStatut === 2 && <h1 className='fw-bold d-flex justify-content-center align-items-center' style={{ color: "#f28500" }}>Inscription refusé</h1>}
            {userStatut == 3 && (
                <div className='con-b row col-12 text-center mx-auto'>
                    <p align="center">
                        <img
                            src={logo}
                            alt="Handi-Vision.fr, un portail pour favoriser l'insertion"
                            width="80"
                        />
                    </p>
                    <div className='con-c col-9'>
                        <h2 className='h2 font-bold'>Ajouter des Compétences</h2>
                        <p className="text-center font-bold">Cliquez autant de fois que nécessaire sur Ajouter Compétence pour ajouter vos Compétences et vos Types de Compétences</p>
                    </div>
                    <form className="con-c row col-9 m-t mx-auto" method="POST" onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="con-c create-account form-control">
                            <div className="row">
                                {competences.map((competence) => (
                                    <div className="col-md-4 mx-auto" key={competence.id}>
                                        <label htmlFor={`competence${competence.id}`} className="form-label btn btn-primary col-12 mb-2">
                                            Compétence
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            id={`competence${competence.id}`}
                                            name={`competences[${competence.id}].competence`}
                                            required
                                            aria-label="Saisissez la compétence"
                                        />
                                        <label htmlFor={`typeDeCompetence${competence.id}`} className="form-label btn btn-primary col-12 mb-2">
                                            Type de Compétence
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            id={`typeDeCompetence${competence.id}`}
                                            name={`competences[${competence.id}].typeDeCompetence`}
                                            required
                                            aria-label="Saisissez le type de compétence"
                                        />
                                        <button className="btn btn-danger" onClick={() => supprimerCompetence(competence.id)}>
                                            Supprimer compétence
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-4 mx-auto mb-3">
                                <button className="btn btn-primary " onClick={ajouterCompetence}>
                                    Ajouter compétence
                                </button>
                            </div>
                            <button type="button" className="btn btn-primary ">
                                Soumettre
                            </button>
                        </div>
                    </form>
                </div>

            )}

        </>

    );

}

export default FormCompetenceCandidat;
