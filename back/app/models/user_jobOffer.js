import { DataTypes } from "sequelize";
import sequelize from '../database/database.js';
import User from "./user.js";
import JobOffer from "./jobOffer.js";


const User_jobOffer = sequelize.define('User_jobOffer', {
    code_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    code_offre_demploi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: JobOffer,
            key: 'id'
        }
    },
}, {
    tableName: 'Utilisateur_offre_demploi',
    timestamps: false,
    createdAt: false,
    updatedAt: false,

});
// User.belongsToMany(JobOffer, {     // Version Abdess
//     through: User_jobOffer,
//     foreignKey: 'code_utilisateur', // Nom de la colonne dans la table User_jobOffer
//     otherKey: 'code_offre_demploi'  // Nom de la colonne dans la table User_jobOffer
// });

// JobOffer.belongsToMany(User, {
//     through: User_jobOffer,
//     foreignKey: 'code_offre_demploi', // Nom de la colonne dans la table User_jobOffer
//     otherKey: 'code_utilisateur'    // Nom de la colonne dans la table User_jobOffer
// });

User.belongsToMany(JobOffer, { through: User_jobOffer, as: 'Offers', foreignKey: 'code_utilisateur', });
JobOffer.belongsToMany(User, { through: User_jobOffer, as: 'Users', foreignKey: 'code_offre_demploi', });

export default User_jobOffer;