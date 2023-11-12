import User from "../models/user.js";

const updateController = {

    updateUser: async function (req, res) {
        console.log('voici: ' + req.body.nom)
        try {
            // Vous pouvez accéder aux propriétés de l'utilisateur depuis req.user
            const userId = req.user.id; // ID de l'utilisateur
            const updatedUserData = req.body;
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
    }
}

export default updateController;