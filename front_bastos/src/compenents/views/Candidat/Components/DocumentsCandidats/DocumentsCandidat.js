import React, { useState } from 'react';
import { apiUrl } from '../../../../config/config';

// Le composant DocumentsCandidat
const DocumentsCandidat = () => {

    // Utilisation du Hook useState pour gérer l'état du fichier sélectionné
    const [selectedFile, setSelectedFile] = useState(null);

    // Utilisation du Hook useState pour gérer l'état du nom du fichier
    const [fileName, setFileName] = useState("");

    // Utilisation du Hook useState pour gérer l'état de la progression du téléchargement
    const [uploadProgress, setUploadProgress] = useState(0);

    // Utilisation du Hook useState pour gérer l'état de la soumission du fichier
    const [isFileSubmitted, setIsFileSubmitted] = useState(false);


    // Cette fonction est appelée lorsque l'utilisateur soumet le formulaire
    const handleFileSubmit = async (e) => {

        // Empêche le comportement par défaut du formulaire (rechargement de la page)
        e.preventDefault();

        // Crée un nouvel objet FormData
        const formData = new FormData();

        // Ajoute le fichier sélectionné à formData sous le nom 'rqth'
        formData.append('rqth', selectedFile);

        // Vérifie si un fichier a été sélectionné
        if (selectedFile) {

            // Simule la progression du téléchargement du fichier
            for (let i = 0; i <= 100; i += 10) {
                setTimeout(() => setUploadProgress(i), 1000);
            }

            // Envoie formData au serveur via une requête HTTP (par exemple, une requête POST) pour traiter le fichier côté serveur
            try {

                // Récupère le token de l'utilisateur à partir du localStorage
                const token = localStorage.getItem('token');

                let fetchOptions = {

                    // Méthode de la requête
                    method: 'POST',

                    headers: {

                        // Ajoute le token à l'en-tête de la requête
                        'Authorization': `Bearer ${token}`,
                    },

                    // Corps de la requête
                    body: formData,
                };

                // Envoie la requête
                const response = await fetch(`${apiUrl}/api/uploadFile`, fetchOptions);

                if (!response.ok) {

                    // Si la requête échoue
                    console.error('Erreur lors de la requête :', response.status, response.statusText);
                } else {

                    // Si la requête réussit, définit le statut de soumission du fichier à vrai
                    setIsFileSubmitted(true);
                }

                // Attrape les erreurs éventuelles lors de l'envoi de la requête
            } catch (error) {
                console.log('Erreur Fetch: ', error);
            }
        } else { // Si aucun fichier n'a été sélectionné
            console.log('Aucun fichier sélectionné.');
        }
    };

    // Cette fonction est appelée lorsque l'utilisateur sélectionne un fichier
    const handleFileChange = (e) => {

        // Récupère le fichier à partir de l'événement
        const file = e.target.files[0];

        // Si un fichier a été sélectionné
        if (file) {

            // Met à jour l'état selectedFile avec le fichier sélectionné
            setSelectedFile(file);

            // Met à jour l'état fileName avec le nom du fichier sélectionné
            setFileName(file.name);
        }
    };


    return (
        <div>
            {/* Titre de la section */}
            <h2 className="text-center my-4" style={{ color: "#f28500" }}>Télécharger vos documents :</h2>

            {/* Conteneur pour le formulaire */}
            <div className="m-3">

                {/* Ligne pour le centrage du contenu */}
                <div className="row justify-content-center">

                    {/* Colonne pour la largeur du contenu, ici pour des écrans medium */}
                    <div className="col-md-6">

                        {/* Carte contenant le formulaire */}
                        <div className="card shadow">

                            {/* Corps de la carte */}

                            {/* Sous-titre pour la spécification du document à télécharger */}
                            <h3 className="text-dark mb-3 text-center fw-bold">Attestation RQTH</h3>
                            <div className="card-body text-center">

                                {/* Formulaire pour le téléchargement de fichier */}
                                <form onSubmit={handleFileSubmit} encType="multipart/form-data">

                                    {/* Champ de sélection de fichier, limité aux fichiers PDF */}
                                    <div className="mb-5">
                                        <input className="form-control" type="file" accept=".pdf" name="rqth" onChange={handleFileChange} />

                                        {/* Afficher le nom du fichier sélectionné */}
                                        <p className="mt-4">{fileName}</p>

                                        {/* Barre de progression pour le téléchargement du fichier */}
                                        <div className="progress mt-2">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }} aria-valuenow={uploadProgress} aria-valuemin="0" aria-valuemax="100">{uploadProgress}%</div>
                                        </div>
                                    </div>

                                    {/* Bouton pour soumettre le formulaire */}
                                    <button className="btn btn-primary" type="submit">Envoyer</button>
                                </form>

                                {/* Message de succès après la soumission du fichier */}
                                {isFileSubmitted && <div className="alert alert-success mt-3" role="alert">Fichier envoyé avec succès!</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsCandidat;