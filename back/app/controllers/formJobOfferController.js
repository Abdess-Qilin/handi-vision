import JobOffer from "../models/jobOffer.js";
import Competence from "../models/competence.js";
import TypeCompetence from "../models/typeCompetence.js";
import JobOffer_competence from "../models/jobOffer_competence.js";
import User_jobOffer from "../models/user_jobOffer.js";
import JobOffer_Competence from "../models/jobOffer_competence.js";

const formJobOfferController = {

    //////// test /////
    createTypeCompetenceBis: async function (req, res) {
        try {
            const data = req.body;
            const typeCompetence = await TypeCompetence.create({
                aptitude: data.type_de_competence,
            });
            return typeCompetence.dataValues;
            //res.json(typeCompetence)
        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    createCompetenceBis: async function (req, res/*, typeCompetenceId*/) {
        try {
            const data = req.body;
            const listCompetence = data.competence;
            const competenceData = [];

            for (const competence of listCompetence) {
                competenceData.push({
                    nom: competence,
                    code_type_competence: data.typeCompetenceId
                })
            }
            const competences = await Competence.bulkCreate(competenceData);

            //return competences; // retourne un tableau de compétences
            res.json(competences)
        } catch (e) {
            res.status(500).json({ message: e.message, code: "2" })
        }
    },


    createJobOfferBis: async function (req, res/*res, data*/) {
        try {
            const data = req.body;
            const jobOffer = await JobOffer.create({
                poste: data.poste,
                lieu_du_poste: data.lieu_du_poste,
                type_de_contrat: data.type_de_contrat,
                duree_de_contrat: data.duree_de_contrat,
                horaires: data.horaires,
                experience: data.experience,
                salaire: data.salaire,
                politique_teletravail: data.politique_teletravail,
                code_entreprise: data.code_entreprise,
                statut: 1, // facultatif
            });
            //return jobOffer.dataValues;
            res.json(jobOffer.dataValues)
        } catch (e) {
            res.status(500).json({ message: e.message, code: "3" })
        }
    },

    ////////////

    createTypeCompetence: async function (res, data) {
        try {
            const typeCompetence = await TypeCompetence.create({
                aptitude: data.type_de_competence,
            });
            return typeCompetence.dataValues;
            //res.json(typeCompetence)
        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    createCompetence: async function (res, data, typeCompetenceId) {
        try {
            const listCompetence = data.competence;
            const competenceData = [];

            for (const competence of listCompetence) {
                competenceData.push({
                    nom: competence,
                    code_type_competence: typeCompetenceId
                })
            }
            const competences = await Competence.bulkCreate(competenceData);

            return competences; // retourne un tableau de compétences

        } catch (e) {
            res.status(500).json({ message: e.message, code: "2" })
        }
    },

    createJobOffer: async function (res, data) {
        try {

            const jobOffer = await JobOffer.create({
                poste: data.poste,
                lieu_du_poste: data.lieu_du_poste,
                type_de_contrat: data.type_de_contrat,
                duree_de_contrat: data.duree_de_contrat,
                horaires: data.horaires,
                experience: data.experience,
                salaire: data.salaire,
                politique_teletravail: data.politique_teletravail,
                code_entreprise: data.code_entreprise,
                statut: 1, // facultatif
                description: data.description,
                email_candidature: data.email_candidature,

            });
            return jobOffer.dataValues;
        } catch (e) {
            res.status(500).json({ message: e.message, code: "3" })
        }
    },

    createUserJobOffer: async function (req, res, jobOfferId) {
        try {

            const data = req.body;

            const userjobOffer = await User_jobOffer.create({
                code_utilisateur: data.code_utilisateur,
                code_offre_demploi: jobOfferId
            });
            return userjobOffer.dataValues;
        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    createJobOfferCompetence: async function (res, jobOfferId, competence) {
        try {
            const listCompetence = competence;
            const competenceData = [];

            for (const competence of listCompetence) {
                competenceData.push({
                    code_offre_demploi: jobOfferId,
                    code_competence: competence.id
                })
            }
            const jobOffer_competences = await JobOffer_Competence.bulkCreate(competenceData);

            return jobOffer_competences;

        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    formJobOffer: async function (req, res) {
        try {
            const data = req.body;

            const typeCompetence = await formJobOfferController.createTypeCompetence(res, data);

            const competence = await formJobOfferController.createCompetence(res, data, typeCompetence.id);
            const jobOffer = await formJobOfferController.createJobOffer(res, data);

            const jobOffer_competences = await formJobOfferController.createJobOfferCompetence(res, jobOffer.id, competence)
            const userJobOffer = await formJobOfferController.createUserJobOffer(req, res, jobOffer.id);

            //res.json(userJobOffer)
            res.json(typeCompetence)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    },
}

export default formJobOfferController;