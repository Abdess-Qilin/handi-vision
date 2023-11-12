import User from "../models/user.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'


// Le reste de votre code
dotenv.config()

const mainController = {

    signin_action: async function (req, res) {

        const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

        if (!validator.isStrongPassword(req.body.mot_de_passe, options)) {
            throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
        }

        bcrypt.hash(req.body.mot_de_passe, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            req.body.mot_de_passe = hash;
            const data = req.body;
            if (data.code_role === 'Candidat') {
                data.code_role = 1;
            } else {
                data.code_role = 2;
            }

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
                });

                console.log("Données correctement envoyées");
                res.json(users);
            } catch (error) {
                console.error("Erreur lors de la création de l'utilisateur :", error.message);
                res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement des données' });
            }
        });

    },

    login: async function (req, res) {
        const { email, mot_de_passe } = req.body;
        const secretKey = process.env.SECRET_KEY

        try {
            const user = await User.authenticate(email, mot_de_passe);

            if (user) {
                console.log('Connexion réussie');

                const token = jwt.sign(
                    {
                        userId: user.id, // Utilisez un identifiant unique de l'utilisateur ici
                        role: user.code_role, // Incluez le rôle de l'utilisateur

                        // Autres données pertinentes que vous souhaitez inclure
                    },
                    secretKey, // Remplacez par votre propre clé secrète
                    {
                        expiresIn: '10h', // Durée de validité du token (1 heure dans cet exemple)
                    }
                );

                const decodedToken = jwt.verify(token, secretKey);

                console.log(decodedToken.userId);
                console.log(decodedToken.role);

                res.status(200).json({ message: 'Connexion réussie', token });
            } else {
                console.log('Identifiants incorrects');
                res.status(401).json({ message: 'Identifiants incorrects' }); // Réponse JSON en cas d'échec
            }
        } catch (error) {
            console.error('Erreur lors de l\'authentification :', error);
            res.status(500).json({ message: 'Erreur de serveur' }); // Réponse JSON en cas d'erreur serveur
        }
    },


    api_users: async function (req, res) {

        try {
            const users = await User.findAll();
            res.json(users);
        } catch (e) {
            res.status(500).json(e.message)
        }

    },

    api_userprofle: async function (req, res) {

        let userId = req.params.id;

        try {
            const users = await User.findByPk(userId);
            res.json(users);
        } catch (e) {
            res.status(500).json(e.message)
        }

    },

    updateUser: async function (req, res) {
        try {
            const userId = req.params.id;
            const updatedUserData = req.body;

            // Utilisez la méthode `update` de Sequelize pour mettre à jour l'utilisateur
            const [rowsUpdated] = await User.update(updatedUserData, {
                where: { id: userId }
            });

            if (rowsUpdated === 0) {
                res.status(404).send('Utilisateur non trouvé');
            } else {
                res.send('Informations utilisateur mises à jour avec succès !');
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    me: async function (req, res) {
        console.log(req.user);
        res.json(req.user)
    }
}
export default mainController