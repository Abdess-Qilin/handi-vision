import path from 'path'
import fs from 'fs';
import User from '../models/user.js';

const uploadController = {

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

    getFile: async function (req, res) {
        const candidatId = req.params.candidatId;

        const user = await User.findByPk(candidatId);



        const completpath = "C:/Users/home/Desktop/projet tutore/Handivision/back/app/uploads"
        const filePath = path.join(completpath, user.rqth); // Chemin du fichier sur le serveur

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
    }
}

export default uploadController;