import path from 'path'
import fs from 'fs';
import User from '../models/user.js';


const uploadController = {

    /*  uploadFile: async function (req, res) {
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
     }, */


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
                res.status(200).send('Fichier téléchargé et utilisateur mis à jour');

            } catch (error) {
                console.error('Erreur lors de la mise à jour du champ "rqth" :', error);
                res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
            }
        } else {
            console.log('Aucun fichier téléchargé.');
            res.status(400).send('Aucun fichier téléchargé');
        }
    },



    getFile: async function (req, res) {
        const candidatId = req.params.candidatId;

        const user = await User.findByPk(candidatId);



        const completpath = "C:/Users/home/Desktop/handi-vision/handi-vision/back/app/uploads/rqth"
        const filePath = path.join(completpath, user.rqth); // Chemin du fichier sur le serveur
        console.log("voici le fichier: ")
        console.log(filePath)

        // Vérifiez si le fichier existe
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('Fichier non trouvé');
        }

        // Renvoyez le fichier en réponse
        res.download(filePath, user.rqth, (err) => {
            if (err) {
                console.error("Erreur lors de l'envoi du fichier :", err);
                return res.status(500).send('Erreur lors de l\'envoi du fichier');
            }
        });
    },


    uploadProfilePicture: async function (req, res) {
        console.log('premiere entree')
        console.log('photo :', req.file);

        if (req.file) {
            console.log('photo :', req.file);
            const fileName = req.file.filename;

            // Récupérez l'ID de l'utilisateur ou tout autre moyen d'identifier l'utilisateur que vous souhaitez mettre à jour
            const userId = req.user.id; // Utilisez votre propre méthode d'authentification pour obtenir l'ID de l'utilisateur

            try {
                // Mettez à jour le champ rqth pour l'utilisateur spécifié
                const updatedUser = await User.update(
                    { photo_profile: fileName },
                    {
                        where: { id: userId },
                    }
                );

                console.log('Champ "photo" mis à jour pour l\'utilisateur.');


            } catch (error) {
                console.error('Erreur lors de la mise à jour du champ "photo" :', error);
            }
        } else {
            console.log('Aucun fichier téléchargé.');
        }
    },

    getprofilePhoto: async function (req, res) {
        const userId = req.params.userId;
        console.log('voici l\'utilisateur:')
        console.log(userId)
        const user = await User.findByPk(userId);
        console.log('test user: ')
        console.log(user)

        // Si l'utilisateur n'a pas de photo de profil ou l'utilisateur n'existe pas, gérer ce cas
        if (!user || !user.photo_profile) {
            // Peut-être renvoyer une image par défaut ou une erreur
            return res.status(404).send('Aucune photo de profil pour cet utilisateur.');
        }

        const completpath = "C:/Users/home/Desktop/handi-vision/handi-vision/back/app/uploads/profile";
        const filePath = path.join(completpath, user.photo_profile); // Chemin du fichier sur le serveur

        // Vérifiez si le fichier existe
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('Fichier non trouvé');
        }
        console.log("voici la photo")
        console.log(filePath)

        // Renvoyez le fichier en réponse
        res.download(filePath, user.photo_profile, (err) => {
            if (err) {
                console.error("Erreur lors de l'envoi du fichier :", err);
                return res.status(500).send('Erreur lors de l\'envoi du fichier');
            }
        });
    },



    uploadcv: async function (req, res) {
        if (req.file) {
            console.log('Fichier téléchargé :', req.file);
            const fileName = req.file.filename;

            // Récupérez l'ID de l'utilisateur ou tout autre moyen d'identifier l'utilisateur que vous souhaitez mettre à jour
            const userId = req.user.id; // Utilisez votre propre méthode d'authentification pour obtenir l'ID de l'utilisateur

            try {
                // Mettez à jour le champ cv pour l'utilisateur spécifié
                const updatedUser = await User.update(
                    { cv: fileName },
                    {
                        where: { id: userId },
                    }
                );

                console.log('Champ cv mis à jour pour l\'utilisateur.');


            } catch (error) {
                console.error('Erreur lors de la mise à jour du champ "rqth" :', error);
            }
        } else {
            console.log('Aucun fichier téléchargé.');
        }
    },

    getUserCv: async function (req, res) {
        const candidatId = req.params.userId;

        const user = await User.findByPk(candidatId);
        console.log('test')
        console.log(user)

        const completpath = "C:/Users/home/Desktop/handi-vision/handi-vision/back/app/uploads/cv"
        const filePath = path.join(completpath, user.cv); // Chemin du fichier sur le serveur


        // Vérifiez si le fichier existe
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('Fichier non trouvé');
        }

        // Renvoyez le fichier en réponse
        res.download(filePath, user.cv, (err) => {
            if (err) {
                console.error("Erreur lors de l'envoi du fichier :", err);
                return res.status(500).send('Erreur lors de l\'envoi du fichier');
            }
        });
    },


}

export default uploadController;