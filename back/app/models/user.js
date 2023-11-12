import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import Role from './role.js';


const User = sequelize.define('User', {
    civilite: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        /*  validate: {
             isMobilePhone: {
                 args: ['fr-FR'], // Utilisez le format français
                 msg: 'Numéro de téléphone invalide'
             }
         } */

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Adresse e-mail invalide'
            }
        }
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    poste_recherche: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobilite_geographique: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    code_role: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statut: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1  // Définissez la valeur par défaut à 1
    },
    rue: {
        type: DataTypes.STRING,

    },
    ville: {
        type: DataTypes.STRING,

    },
    codePostal: {
        type: DataTypes.INTEGER,

    },
    rqth: {
        type: DataTypes.STRING,

    },


}, {
    tableName: 'Utilisateur',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

User.belongsTo(Role, { foreignKey: 'code_role' });
Role.hasMany(User, { foreignKey: 'code_role' });

// Définissions la méthode `authenticate` en dehors de la configuration du modèle
User.authenticate = async (email, motDePasse) => {
    try {
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error("Identifiants incorrects"); // Utilisateur non trouvé
        }

        // Utilisez Bcrypt pour comparer le mot de passe entré avec le mot de passe haché enregistré dans la base de données
        const passwordMatch = await bcrypt.compare(motDePasse, user.mot_de_passe);

        if (!passwordMatch) {
            throw new Error("Identifiants incorrects"); // Mot de passe incorrect
        }

        return user; // Utilisateur trouvé et authentifié
    } catch (error) {
        throw error;
    }
};


// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

export default User;