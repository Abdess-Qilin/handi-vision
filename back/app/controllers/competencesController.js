// Importation des modèles nécessaires
import Competence from "../models/competence.js";
import JobOffer_competence from "../models/jobOffer_competence.js";
import User from "../models/user.js";
import User_competence from "../models/user_competence.js";

// Création du contrôleur pour les compétences
const competencesController = {

    // Méthode pour obtenir les compétences liées aux offres d'emploi
    getCompetences: async function (req, res) {
        try {
            // Utilisez le modèle JobOffer_competence pour récupérer toutes les compétences liées aux offres d'emploi
            const competences = await JobOffer_competence.findAll({
                include: [
                    {
                        model: Competence, // Inclure le modèle Competence
                        attributes: ['nom'] // Sélectionner uniquement l'attribut 'nom'
                    }
                ]
            });

            // Initialisation d'un objet pour regrouper les compétences par offre d'emploi
            const competencesParOffre = {};

            // Organisation des compétences par offre d'emploi
            competences.forEach((competence) => {

                const offreId = competence.code_offre_demploi; // ID de l'offre d'emploi
                const competenceNom = competence.Competence.nom; // Nom de la compétence

                // Création ou mise à jour de la liste des compétences pour chaque offre
                if (!competencesParOffre[offreId]) {
                    competencesParOffre[offreId] = [competenceNom];
                } else {
                    competencesParOffre[offreId].push(competenceNom);
                }
            });

            // Affichage de confirmation dans la console
            console.log("donnees bien recupere")

            // Envoyez les compétences organisées en tant que réponse JSON
            res.json(competencesParOffre);

        } catch (error) {

            // Gestion des erreurs
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la récupération des compétences.' });
        }
    },

    // Méthode pour obtenir les compétences d'un utilisateur
    getUserCompetence: async function (req, res) {

        // Récupération de l'ID de l'utilisateur depuis la requête
        const userId = req.user.id;

        // Affichage de l'ID utilisateur pour le débogage
        console.log(userId)

        try {

            // Utilisez la méthode findAll avec des options de filtre
            const competences = await User.findByPk(userId, {


                include: [
                    {
                        // Inclusion du modèle Competence
                        model: Competence,

                        // Sélection de l'attribut 'nom' uniquement
                        attributes: ['nom'],

                        /* {
                            exclude: ['id',
                                "code_type_competence",
                            ]

                        } */
                        // attributes: ['nom'],
                    },

                ],
            });

            // Affichage des compétences pour le débogage
            console.log(competences);
            // Envoyez les compétences au client ou effectuez d'autres opérations

            // Envoi des compétences de l'utilisateur en réponse
            res.status(200).json(competences);
        } catch (error) {
            console.error(error);
            // Gérez les erreurs appropriées
            res.status(500).json({ error: 'Une erreur s\'est produite' });
        }
    }


}

export default competencesController