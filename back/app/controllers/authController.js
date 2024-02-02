import User from "../models/user.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'

const authController = {

    login: async function (req, res) {
        const { email, mot_de_passe } = req.body;
        const secretKey = process.env.SECRET_KEY

        try {
            const user = await User.authenticate(email, mot_de_passe);

            if (user) {
                console.log('Connexion réussie');

                const token = jwt.sign(
                    {
                        userId: user.id,

                    },
                    secretKey,
                    {
                        expiresIn: '10h',
                    }
                );
                const { id, code_role, statut } = user

                //avant de transmettre le user au front lui retire des information
                res.status(200).json({ message: 'Connexion réussie', token, id, code_role, statut });
            }
        } catch (error) {
            console.log('Identifiants incorrects');
            res.status(401).json({ message: 'Identifiants incorrects' });
        }
    },

    me: function (req, res) {
        /* console.log(req.user); */

        res.json(req.user)
    }
}



export default authController