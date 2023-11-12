import { DataTypes } from "sequelize";
import sequelize from '../database/database.js';
import User from "./user.js";
import Competence from "./competence.js";



const User_competence = sequelize.define('User_competence', {
    code_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    code_competence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Competence,
            key: 'id'
        }
    },
}, {
    tableName: 'Utilisateur_competence',
    timestamps: false,
    createdAt: false,
    updatedAt: false,

});
// User.belongsToMany(Competence, {        // Version Abdess
//     through: User_competence,
//     foreignKey: 'code_utilisateur', // Clé étrangère dans la table de liaison
//     /* as: 'Competences' */
// });
// Competence.belongsToMany(User, {
//     through: User_competence,
//     foreignKey: 'code_competence', // Clé étrangère dans la table de liaison
//     /* as: 'Users' */
// });

User.belongsToMany(Competence, { through: User_competence, as: 'Competences', foreignKey: 'code_utilisateur' });
Competence.belongsToMany(User, { through: User_competence, as: 'Users', foreignKey: 'code_competence' });

export default User_competence;