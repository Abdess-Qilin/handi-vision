import User from "../models/user.js";
import Company from "../models/company.js";
import JobOffer from "../models/jobOffer.js";

const adminController = {
    getUsers: async function (req, res) {

        try {
            const users = await User.findAll();
            res.json(users);
        } catch (e) {
            res.status(500).json(e.message)
        }

    },

    updateUser: async function (req, res) {
        console.log(req.body)
        try {
            const userId = req.body.id; // Récupérez l'ID depuis les données JSON de la requête
            const updatedUserData = req.body;

            // Vérifiez d'abord si l'utilisateur existe
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            } else {
                // L'utilisateur existe, vous pouvez effectuer la mise à jour
                const [rowsUpdated] = await User.update(updatedUserData, {
                    where: { id: userId }
                });

                if (rowsUpdated === 0) {
                    res.status(204).json({ message: 'Données non modifiées' });
                } else {
                    res.status(200).json({ message: 'Informations utilisateur mises à jour avec succès' });
                }
            }
        } catch (e) {
            //console.error(e.errors[0]);

            if (e.message === 'Validation error') {
                const ValidationErrorItem = e.errors[0];
                res.status(409).json({ error: `${ValidationErrorItem.path} '${ValidationErrorItem.value}' existe déjà` });
            }
            else
                res.status(500).json({ error: e.message });

        }
    },


    deleteUser: async function (req, res) {
        try {
            // Vous pouvez accéder aux propriétés de l'utilisateur depuis req.user
            const userId = req.body.id; // ID de l'utilisateur

            // Supprimez l'utilisateur en fonction de son ID
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(404).send('Utilisateur non trouvé');
            } else {
                await user.destroy();
                res.send('Utilisateur supprimé avec succès');
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    getcompanies: async function (req, res) {
        try {
            const companies = await Company.findAll({
            });
            res.json(companies);
        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    updatecompany: async function (req, res) {
        console.log('test')
        try {
            const userId = req.body.id; // Récupérez l'ID depuis les données JSON de la requête
            const updatedCompanyData = req.body;

            // Vérifiez d'abord si l'entreprise existe
            const company = await Company.findOne({ where: { id: userId } });

            if (!company) {
                res.status(404).json({ message: 'Entreprise non trouvé' });
            } else {
                // L'entreprise existe, vous pouvez effectuer la mise à jour
                const [rowsUpdated] = await Company.update(updatedCompanyData, {
                    where: { id: userId }
                });

                if (rowsUpdated === 0) {
                    res.status(204).json({ message: 'Données non modifiées' });
                } else {
                    res.status(200).json({ message: 'Informations entreprise mises à jour avec succès' });
                }
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    deletecompany: async function (req, res) {
        try {
            // Vous pouvez accéder aux propriétés de l'entreprise depuis req.user
            const userId = req.body.id; // ID de l'utilisateur

            // Supprimez l'entreprise en fonction de son ID
            const company = await Company.findByPk(userId);
            if (!company) {
                res.status(404).send('entreprise non trouvé');
            } else {
                await company.destroy();
                res.send('entreprise supprimé avec succès');
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    },
    getJobOffers: async function (req, res) {
        console.log(req.user)
        try {
            const offers = await JobOffer.findAll();
            res.json(offers);
        } catch (e) {
            res.status(500).json(e.message)
        }
    },
    getUsersByRole: async function (req, res) {

        try {
            const code_role = req.params.coderole;
            const users = await User.findAll({ where: { code_role: code_role } });
            res.json(users);
        } catch (e) {
            res.status(500).json(e.message)
        }

    },

    getUsersByRoleAndStatut: async function (req, res) {

        try {
            const code_role = req.params.coderole;
            const statut = req.params.statut;
            const users = await User.findAll({
                where: {
                    code_role: code_role,
                    statut: statut
                }
            });
            res.json(users);
        } catch (e) {
            res.status(500).json(e.message)
        }

    },

    getJobOffersByStatut: async function (req, res) {
        try {
            const statut = req.params.statut;
            const joboffers = await JobOffer.findAll({ where: { statut: statut } });
            res.json(joboffers);
        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    updateJobOffer: async function (req, res) {
        console.log(req.body)
        try {
            const jobOfferId = req.body.id; // Récupérez l'ID depuis les données JSON de la requête
            const updatedJobOfferData = req.body;

            // Vérifiez d'abord si l'offre d'emploi existe
            const user = await JobOffer.findOne({ where: { id: jobOfferId } });

            if (!user) {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            } else {
                // L'offre d'emploi existe, vous pouvez effectuer la mise à jour
                const [rowsUpdated] = await JobOffer.update(updatedJobOfferData, {
                    where: { id: jobOfferId }
                });

                if (rowsUpdated === 0) {
                    res.status(204).json({ message: 'Données non modifiées' });
                } else {
                    res.status(200).json({ message: 'Informations offre d\'emploi mises à jour avec succès' });
                }
            }
        } catch (e) {
            //console.error(e.errors[0]);

            if (e.message === 'Validation error') {
                const ValidationErrorItem = e.errors[0];
                res.status(409).json({ error: `${ValidationErrorItem.path} '${ValidationErrorItem.value}' existe déjà` });
            }
            else
                res.status(500).json({ error: e.message });

        }
    },
    getCompaniesByStatut: async function (req, res) {
        try {
            const statut = req.params.statut;
            const companies = await Company.findAll({ where: { statut: statut } });
            res.json(companies);
        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    getCompanyByJobOffer: async function (req, res) {
        try {
            const companyId = req.params.codecompany;
            const jobOffer_company = await JobOffer.findOne({
                include: { model: Company, required: true },
                where: { code_entreprise: companyId }
            });
            res.json(jobOffer_company);
        } catch (e) {
            res.status(500).json(e.message)
        }
    },
}

export default adminController;