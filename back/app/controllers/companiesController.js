import Company from "../models/company.js";

const companiesController = {

    setCompany: async function (req, res) {

        const data = req.body;
        console.log(data)
        try {
            const newCompany = await Company.create({
                nom_de_lentreprise: data.nom_de_lentreprise,
                secteur_activite: data.secteur_activite,
                raison_sociale: data.raison_sociale,
                statut_juridique: data.statut_juridique,
                telephone: data.telephone,
                adresse: data.adresse,
                effectif: data.effectif,
                mail: data.mail,
                site_web: data.site_web,
                reseaux_sociaux: data.reseaux_sociaux,
                code_NAF_principal: data.code_NAF_principal,
                politique_teletravail: data.politique_teletravail,
                code_utilisateur: data.code_utilisateur
            });
            console.log("Données correctement envoyées");
            res.json(newCompany);

        } catch (error) {
            console.error("Erreur lors de la création de l'entreprise :", error.message);
            res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement des données' });
        }
    },

    getCompanies: async function (req, res) {
        try {
            const companies = await Company.findAll();
            res.json(companies);
        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    getUserCompanies: async function (req, res) {
        try {
            console.log('voici le contenue de la requete:')
            const companies = await Company.findAll({
                where: {
                    code_utilisateur: req.user.id
                }
            });
            res.json(companies);
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

}

export default companiesController;