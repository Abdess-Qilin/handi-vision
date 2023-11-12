import User from "../models/user.js";
import JobOffer from "../models/jobOffer.js";
import User_jobOffer from "../models/user_jobOffer.js";
import Competence from "../models/competence.js";
import JobOffer_Competence from "../models/jobOffer_competence.js";
import TypeCompetence from "../models/typeCompetence.js";
import User_competence from "../models/user_competence.js";
import Company from "../models/company.js";

const matchController = {

    // Récupérer la liste des offres d'emploi VALIDEES du recruteur connecté

    getJobOffer: async function (req, res) {
        try {

            const data = req.body;

            const user_joboffers = await User_jobOffer.findAll({
                where: {
                    code_utilisateur: req.user.id
                },
            });

            const jobOfferIds = user_joboffers.map(user_joboffer => user_joboffer.code_offre_demploi);

            const jobOffers = await JobOffer.findAll({
                where: {
                    id: jobOfferIds
                },
                include:
                {
                    model: Competence,
                    as: 'Competences',
                    attributes: ["nom"],
                    required: true,

                    include: {
                        model: TypeCompetence,
                        as: 'Type',
                        attributes: ["aptitude"],
                        required: true
                    }
                },
            })

            const jobOfferComplete = jobOffers.map((joboffer => {
                const typeCompetence = joboffer.Competences[0].Type.aptitude;

                const listCompetence = [];

                joboffer.Competences.map((element) => listCompetence.push(element.nom))

                const jobofferbis = {
                    id: joboffer.id,
                    Poste: joboffer.poste,
                    Ville: joboffer.lieu_du_poste,
                    Type_de_contrat: joboffer.type_de_contrat,
                    Duree_de_contrat: joboffer.duree_de_contrat,
                    Horaires: joboffer.horaires,
                    Experience: joboffer.experience,
                    Salaire: joboffer.salaire,
                    Politique_teletravail: joboffer.politique_teletravail,
                    code_entreprise: joboffer.code_entreprise,
                    statut: joboffer.statut,
                    Type_de_competence: typeCompetence,
                    Competence: listCompetence.toString()
                }

                return jobofferbis;

            }))


            //res.json(competence);
            res.json(jobOfferComplete);

        } catch (e) {
            res.status(500).json(e.message)
        }

    },

    // Récupérer la liste des utilisateurs VALIDEE dont le rôle vaut 2 (candidat)

    getCandidate: async function (req, res) {
        try {
            const users = await User.findAll({
                where: {
                    code_role: 2,
                    statut: 3
                },
                //attributes:['id']

            });

            const userIds = users.map(user => user.id)

            const user_competences = await User_competence.findAll({
                where: {
                    code_utilisateur: userIds
                }
            });

            const competenceIds = user_competences.map(user_competence => user_competence.code_competence);

            const candidates = await User.findAll({
                where: {
                    id: userIds
                },
                include:
                {
                    model: Competence,
                    as: 'Competences',
                    attributes: ["nom"],
                    required: true,

                    include: {
                        model: TypeCompetence,
                        as: 'Type',
                        attributes: ["aptitude"],
                        required: true
                    }
                },
            })

            const candidateComplete = candidates.map((candidate => {
                const typeCompetence = candidate.Competences[0].Type.aptitude;

                const listCompetence = [];

                candidate.Competences.map((element) => listCompetence.push(element.nom))

                const candidatebis = {
                    id: candidate.id,
                    civilite: candidate.civilite,
                    nom: candidate.nom,
                    prenom: candidate.prenom,
                    numero_telephone: candidate.numero_telephone,
                    email: candidate.email,
                    //mot_de_passe: candidate.,
                    poste_recherche: candidate.poste_recherche,
                    experience: candidate.experience,
                    mobilite_geographique: candidate.mobilite_geographique,
                    role: candidate.code_role,
                    competence: listCompetence.toString(),
                    type_de_competence: typeCompetence,

                }

                return candidatebis;

            }))

            res.json(candidateComplete);

        } catch (e) {
            res.status(500).json(e.message)
        }
    }

}

export default matchController;

