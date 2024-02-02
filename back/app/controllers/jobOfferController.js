import JobOffer from "../models/jobOffer.js";
import User_jobOffer from "../models/user_jobOffer.js";
import User from "../models/user.js";


const jobOfferController = {
    setJobOffer: async function (req, res) {
        const data = req.body;
        try {
            const newJobOffer = await JobOffer.create({
                poste: data.poste,
                lieu_du_poste: data.lieu_du_poste,
                type_de_contrat: data.type_de_contrat,
                duree_de_contrat: data.duree_de_contrat,
                horaires: data.horaires,
                experience: data.experience,
                salaire: data.salaire,
                politique_teletravail: data.politique_teletravail,
                code_utilisateur: data.code_utilisateur,
                code_entreprise: data.code_entreprise
            });
            console.log("Données correctement envoyées");
            res.json(newJobOffer);

        } catch (error) {
            console.error("Erreur lors de la création de l'entreprise :", error.message);
            res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement des données' });
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

    getUserJobOffers: async function (req, res) {
        try {
            console.log('voici le contenu de la requete:')
            console.log(req.user)
            // const offers = await JobOffer.findAll({
            //     where: {
            //         code_utilisateur: req.user.id
            //     }
            // });

            const user = await User.findOne(
                {
                    where: {
                        id: req.user.id
                    },
                    include: {
                        model: JobOffer,
                        as: 'Offers'
                    }
                }
            )

            //res.json(offers);
            res.json(user.Offers)
        } catch (e) {
            res.status(500).json(e.message)
        }


    },

    updateFavJobOffer: async function (req, res) {
        console.log(req.body)
        try {
            const userId = req.body.id; // Récupérez l'ID depuis les données JSON de la requête
            const updatedUserData = req.body;

            // Vérifiez d'abord si l'utilisateur existe
            const user = await JobOffer.findOne({ where: { id: userId } });

            if (!user) {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            } else {
                // L'utilisateur existe, vous pouvez effectuer la mise à jour
                const [rowsUpdated] = await JobOffer.update(updatedUserData, {
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

    addFavJobOffer: async function (req, res) {
        console.log(req.body)
        const data = req.body;
        try {
            const users = await User_jobOffer.create({
                code_utilisateur: data.code_utilisateur,
                code_offre_demploi: data.code_offre_demploi,

            });

            console.log("Données correctement envoyées");
            res.json(users);
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error.message);
            res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement des données' });

        }

    },

    getFavJobOffer: async function (req, res) {
        try {
            // Supposons que vous avez le code_utilisateur en tant que paramètre dans la requête.
            const userId = req.user.id;
            console.log("voici" + userId)
            // Utilisez la méthode "findAll" pour récupérer tous les code_offre_demploi de la table de liaison pour l'utilisateur donné.
            const userOfferLinks = await User_jobOffer.findAll({
                where: { code_utilisateur: userId },
                attributes: ['code_offre_demploi'] // Sélectionnez uniquement le champ code_offre_demploi.
            });

            if (!userOfferLinks || userOfferLinks.length === 0) {
                return res.status(404).json({ error: "Aucune offre d'emploi trouvée pour cet utilisateur." });
            }

            const offerIds = userOfferLinks.map(link => link.code_offre_demploi);

            // Utilisez ces code_offre_demploi pour récupérer les détails des offres d'emploi correspondantes dans la table "Offre_demploi".
            const favJobOffers = await JobOffer.findAll({
                where: { id: offerIds }
            });

            console.log(favJobOffers)
            res.json(favJobOffers);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    removeFavJobOffer: async function (req, res) {
        try {

            const userId = req.user.id;
            const offreId = req.body.offreId; // Assurez-vous de passer l'offreId dans le corps de la requête.

            // Utilisez la méthode "destroy" pour supprimer l'entrée de la table "User_jobOffer".
            const deletedRows = await User_jobOffer.destroy({
                where: {
                    code_utilisateur: userId,
                    code_offre_demploi: offreId
                }
            });

            if (deletedRows === 0) {
                return res.status(404).json({ error: "Aucune offre d'emploi trouvée pour cet utilisateur." });
            }

            res.json({ message: "L'offre d'emploi a été supprimée avec succès." });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    getDetailsJobboffer: async function (req, res) {
        const offerId = req.params.offerId; // Utilisez req.params au lieu de req.body pour récupérer l'ID de l'offre depuis les paramètres de l'URL

        try {
            // Utilisez la méthode findOne de Sequelize pour récupérer l'offre en fonction de son ID
            const offer = await JobOffer.findOne({ where: { id: offerId } });

            if (!offer) {
                // Gérez le cas où l'offre n'est pas trouvée (par exemple, renvoyez une réponse 404 Not Found)
                res.status(404).json({ message: "Offre non trouvée" });
                return;
            }

            // Envoyez l'offre récupérée en réponse
            res.json(offer);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }


}

export default jobOfferController; 