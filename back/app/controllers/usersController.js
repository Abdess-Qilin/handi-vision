import User from "../models/user.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'


const usersController = {

    uploadFile: async function (req, res) {
        if (req.file) {
            console.log('Fichier téléchargé :', req.file);
            const fileName = req.file.filename;

            // Récupérez l'ID de l'utilisateur ou tout autre moyen d'identifier l'utilisateur que vous souhaitez mettre à jour
            const userId = req.user.id; // Utilisez votre propre méthode d'authentification pour obtenir l'ID de l'utilisateur

            try {
                // Mettez à jour le champ rqth pour l'utilisateur spécifié
                const updatedUser = await User.update(
                    { rqth: fileName },
                    {
                        where: { id: userId },
                    }
                );

                console.log('Champ "rqth" mis à jour pour l\'utilisateur.');
            } catch (error) {
                console.error('Erreur lors de la mise à jour du champ "rqth" :', error);
            }
        } else {
            console.log('Aucun fichier téléchargé.');
        }
    },



    setUser: function (req, res) {


        console.log(req.body.email)
        const options = { minLength: 5, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

        if (!validator.isStrongPassword(req.body.mot_de_passe, options)) {
            throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
        }

        bcrypt.hash(req.body.mot_de_passe, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            req.body.mot_de_passe = hash;
            const data = req.body;


            /*
            // Récupère le rôle (dans la table 'role') s'il exite sinon Ajout d'un nouveau rôle  
            const [role, created] = await Role.findOrCreate({ where: { nom: data.code_role } });

            const code_role = role.dataValues.id;
            */



            if (data.code_role === 'candidat') {
                data.code_role = 2;
            }
            if (data.code_role === 'recruteur') {
                data.code_role = 3;
            }
            if (data.code_role === 'administrateur') {
                data.code_role = 4;
            }

            console.log(data.code_role)

            try {
                const users = await User.create({
                    civilite: data.civilite,
                    nom: data.nom,
                    prenom: data.prenom,
                    numero_telephone: data.numero_telephone,
                    email: data.email,
                    mot_de_passe: data.mot_de_passe,
                    poste_recherche: data.poste_recherche,
                    experience: data.experience,
                    mobilite_geographique: data.mobilite_geographique,
                    code_role: data.code_role,
                    rue: data.rue,
                    ville: data.ville,
                    codePostal: data.codePostal
                });

                console.log("Données correctement envoyées");
                res.json(users);
            } catch (error) {
                /*console.error("Erreur lors de la création de l'utilisateur :", error.message);
                res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement des données' });*/
                displayError(error, res);
            }
        });
    },

    getUsers: async function (req, res) {

        try {
            const users = await User.findAll();
            res.json(users);
        } catch (e) {
            res.status(500).json(e.message)
        }

    },

    /*  api_userprofle: async function (req, res) {
 
         let userId = req.params.id;
 
         try {
             const users = await User.findByPk(userId);
             res.json(users);
         } catch (e) {
             res.status(500).json(e.message) 
         }
     } */
}

function displayError(err, res) {

    if (err.message === 'Validation error') {
        const ValidationErrorItem = err.errors[0];

        res.status(409).json({
            error: `'${ValidationErrorItem.value}' existe déjà`,
            champs: ValidationErrorItem.path
        });
    }
    else
        res.status(500).json({ error: err.message });

}



export default usersController;