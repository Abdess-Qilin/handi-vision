import { DataTypes } from "sequelize";
import sequelize from '../database/database.js';
import  User  from "./user.js";
import disabilityCriteria from "./disabilityCriteria.js";



const User_disabilityCriteria = sequelize.define('User_disabilityCriteria', {
  code_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'id'
        }
    },
    code_critere_handicap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: disabilityCriteria, 
            key: 'id'
        }
    },
}, {
    tableName: 'Utilisateur_Critere_handicap',
    timestamps: false,
    createdAt: false,
    updatedAt: false,

});
User.belongsToMany(disabilityCriteria, { through: User_disabilityCriteria });
disabilityCriteria.belongsToMany(User, { through: User_disabilityCriteria });

export default User_disabilityCriteria;